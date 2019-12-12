var buildHolding = function (sourceData, data) {
  data.id = sourceData.folioReference;
  data.holdingsRecordId = sourceData.reference;

  data.formerIds.push(sourceData.ITEM_ID);

  data.materialTypeId = 'd9acad2f-2aac-4b48-9097-e6ab85906b25';

  if (sourceData.ITEM_BARCODE) {
    data.barcode = sourceData.ITEM_BARCODE;
  }

  if (sourceData.ITEM_ENUM) {
    data.enumeration = sourceData.ITEM_ENUM;
  }

  if (sourceData.CHRON) {
    data.chronology = sourceData.CHRON;
  }

  if (sourceData.CAPTION) {
    data.yearCaption.push(sourceData.CAPTION);
  }

  if (sourceData.YEAR) {
    data.volume = sourceData.YEAR;
  }

  if (sourceData.SPINE_LABEL) {
    data.yearCaption.push(sourceData.SPINE_LABEL);
  }

  if (sourceData.PIECES) {
    data.numberOfPieces = sourceData.PIECES;
  }

  if (sourceData.PERMLOC) {
    data.permanentLocationId = sourceData.PERMLOC;
  }

  if (sourceData.TEMPLOC) {
    data.temporaryLocationId = sourceData.TEMPLOC;
  }

  if (sourceData.PERMTYPE) {
    data.permanentLoanTypeId = sourceData.PERMTYPE;
  }

  if (sourceData.TEMPTYPE) {
    data.temporaryLoanTypeId = sourceData.TEMPTYPE;
  }

  if (sourceData.FREETEXT) {
    data.notes.push({
      note: sourceData.FREETEXT,
      staffOnly: true,
      itemNoteTypeId: '8d0a5eca-25de-4391-81a9-236eeefdd20b'
    });
  }

  data.discoverySuppress = false;

  data.status = {
    name: 'Available'
  };

  if (sourceData.ITEM_STATUSES) {
    for (var i = 0; i < sourceData.ITEM_STATUSES.length; i++) {
      var statusParts = sourceData.ITEM_STATUSES[i].split('::');
      var statusCode = statusParts[0];
      var statusName = statusParts[1];
      var statusDate = statusParts[1];

      if (statusName === 'Missing' || statusName === 'Lost' || statusName === 'Withdrawn') {
        data.discoverySuppress = true;
      }

      if (statusName === 'Damaged') {
        data.itemDamagedStatusId = '54d1dd76-ea33-4bcb-955b-6b29df4f7930';
      }

      if (i === 0) {
        data.status.name = statusName;
        if (statusDate.length > 0) {
          data.status.date = statusDate;
        }
      } else {
        data.statisticalCodeIds.push(args.statisticalCodeTypes[statusName]);
      }
    }
  }

  if (sourceData.ITEM_NOTES) {
    for (var j = 0; j < sourceData.ITEM_NOTES.length; j++) {
      var noteParts = sourceData.ITEM_NOTES[j].split('::');
      var noteType = noteParts[0];
      var noteText = noteParts[1];
      var note = {
        note: noteText.replace(/\s\s+/g, ' '),
        staffOnly: true
      };
      if (noteType === 1) {
        note.itemNoteTypeId = '8d0a5eca-25de-4391-81a9-236eeefdd20b';
        data.notes.push(note);
      } else if (noteType === 2) {
        note.noteType = 'Check out';
        data.circulationNotes.push(note);
      } else if (noteType === 3) {
        note.noteType = 'Check in';
        data.circulationNotes.push(note);
      }
    }
  }

  return data;
};

returnObj = buildHolding(args.sourceData, args.holding);
