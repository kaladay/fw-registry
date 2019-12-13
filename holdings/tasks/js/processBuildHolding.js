var appendNote = function (notes, value, id, staff) {
  if (value) {
    notes.push({
      'note': value,
      'staffOnly': staff ? true : false,
      'holdingsNoteTypeId': id
    });
  }
};

var appendString = function (destination, value) {
  if (value) {
    if (destination) {
      destination += ' ' + value;
    } else {
      destination = value;
    }
  }
  return destination;
};

var buildStatements = function (subFields) {
  var statements = [];
  subFields.forEach(function(subField, subFieldKey) {
    if (subField.code === 'a' || subField.code === 'x' || subField.code === 'z') {
      var obj = {
        notes: []
      };
      if (subField.code === 'a') {
        obj.statement = subField.data;
      } else {
        appendNote(obj.notes, subField.data, 'b160f13a-ddba-4053-b9c4-60ec5ea45d56');
      }
      statements.push(obj);
    }
  });
  return statements;
};

var buildHolding = function (sourceData, data) {
  data.id = sourceData.folioReference;
  data.instanceId = sourceData.reference;

  data.callNumberTypeId = sourceData.CALL_NO_TYPE;

  data.discoverySuppress = sourceData.SUPPRESS_IN_OPAC === 'true' ? true : false;

  if (sourceData.ACQ_METHOD) {
    data.acquisitionMethod = sourceData.ACQ_METHOD;
  }

  if (sourceData.RECORD_TYPE) {
    data.holdingsTypeId = sourceData.RECORD_TYPE;
  }

  if (sourceData.RECEIPT_STATUS) {
    data.receiptStatus = sourceData.RECEIPT_STATUS;
  }

  if (sourceData.RETENTION_POLICY) {
    data.retentionPolicy = sourceData.RETENTION_POLICY;
  }

  if (sourceData.SCHEMA === 'HOLDING_AMDB') {
    if (args.locationsToFolioAMDB[sourceData.LOCATION_ID]) {
      data.permanentLocationId = args.locationsToFolioAMDB[sourceData.LOCATION_ID];
    }
  } else if (sourceData.SCHEMA === 'HOLDING_MSDB') {
    if (args.locationsToFolioMSDB[sourceData.LOCATION_ID]) {
      data.permanentLocationId = args.locationsToFolioMSDB[sourceData.LOCATION_ID];
    }
  }

  data.formerIds.push(sourceData.MFHD_ID);

  var marcFieldsJson = scriptEngineUtility.getFieldsFromRawMarc(sourceData.MARC_RECORD, ['506', '541', '562', '583', '852', '866', '867', '868']);
  var marcFields = JSON.parse(marcFieldsJson);

  if (marcFields) {
    marcFields.forEach(function(marcField, marcFieldKey) {
      if (marcField.tag === '852') {
        marcField.subfields.forEach(function(subField, subFieldKey) {
          if (subField.code === 'g') {
            appendNote(data.notes, subField.data, '7ca7dc63-c053-4aec-8272-c03aeda4840c');
          }
          else if (subField.code === 'h' || subField.code === 'i') {
            data.callNumber = appendString(data.callNumber, subField.data);
          }
          else if (subField.code === 'k') {
            data.callNumberPrefix = appendString(data.callNumberPrefix, subField.data);
          }
          else if (subField.code === 'l') {
            data.shelvingTitle = appendString(data.shelvingTitle, subField.data);
          }
          else if (subField.code === 'm') {
            data.callNumberSuffix = appendString(data.callNumberSuffix, subField.data);
          }
          else if (subField.code === 't') {
            data.copyNumber = appendString(data.copyNumber, subField.data);
          }
          else if (subField.code === 'x') {
            appendNote(data.notes, subField.data, 'b160f13a-ddba-4053-b9c4-60ec5ea45d56', true);
          }
          else if (subField.code === 'z') {
            appendNote(data.notes, subField.data, 'b160f13a-ddba-4053-b9c4-60ec5ea45d56');
          }
        });
      }
      else if (marcField.tag === '506') {
        appendNote(data.notes, marcField.data, 'assign uuid');
      }
      else if (marcField.tag === '541') {
        appendNote(data.notes, marcField.data, 'db9b4787-95f0-4e78-becf-26748ce6bdeb');
      }
      else if (marcField.tag === '562') {
        appendNote(data.notes, marcField.data, 'c4407cc7-d79f-4609-95bd-1cefb2e2b5c5');
      }
      else if (marcField.tag === '583') {
        appendNote(data.notes, marcField.data, 'd6510242-5ec3-42ed-b593-3585d2e48fd6', true);
      }
      else if (marcField.tag === '866') {
        data.holdingsStatements = buildStatements(marcField.subfields);
      }
      else if (marcField.tag === '867') {
        data.holdingsStatementsForSupplements = buildStatements(marcField.subfields);
      }
      else if (marcField.tag === '868') {
        data.holdingsStatementsForIndexes = buildStatements(marcField.subfields);
      }
    });
  }

  return data;
};

returnObj = buildHolding(args.sourceData, args.holding);
