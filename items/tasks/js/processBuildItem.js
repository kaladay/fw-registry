var addItemNotes = function (notes, value, id, staff) {
  if (value) {
    notes.push({
      'note': value,
      'staffOnly': staff ? true : false,
      'holdingsNoteTypeId': id
    });
  }
};

var buildHolding = function (sourceData, data) {
  data.id = sourceData.folioReference;
  data.holdingsRecordId = sourceData.reference;

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

  if (sourceData.FREETEXT) {
    var itemNodeObject = {
      note: sourceData.FREETEXT,
      staffOnly: true,
      itemNoteTypeId: '8d0a5eca-25de-4391-81a9-236eeefdd20b'
    }
  }

  data.permanentLocationId = null;

  data.formerIds.push(sourceData.ITEM_ID);

  data.numberOfPieces = null;

  data.materialTypeId = 'd9acad2f-2aac-4b48-9097-e6ab85906b25';

  data.permanentLoanTypeId = null;

  data.temporaryLoanTypeId = null;

  data.temporaryLocationId = null;

  return data;
};

returnObj = buildHolding(args.sourceData, args.holding);
