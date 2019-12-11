var formatSourceData = function (args) {
  var data = {};
  var argKeys = Object.keys(args);
  for (var i = 0; i < argKeys.length; i++) {
    var key = argKeys[i];
    var value = args[key];
    data[key] = value;
  }
  return data;
};

returnObj = {
  sourceData: formatSourceData(args),
  holding: {
    id: null,
    hrid: null,
    holdingsRecordId: null,
    formerIds: [],
    discoverySuppress: null,
    accessionNumber: null,
    barcode: null,
    itemLevelCallNumber: null,
    itemLevelCallNumberPrefix: null,
    itemLevelCallNumberSuffix: null,
    itemLevelCallNumberTypeId: null,
    effectiveCallNumberComponents: null,
    volume: null,
    enumeration: null,
    chronology: null,
    yearCaption: [],
    itemIdentifier: null,
    copyNumbers: [],
    numberOfPieces: null,
    descriptionOfPieces: null,
    numberOfMissingPieces: null,
    missingPieces: null,
    missingPiecesDate: null,
    itemDamagedStatusId: null,
    itemDamagedStatusDate: null,
    notes: [],
    circulationNotes: [],
    status: null,
    materialTypeId: null,
    permanentLoanTypeId: null,
    temporaryLoanTypeId: null,
    permanentLocationId: null,
    temporaryLocationId: null,
    effectiveLocationId: null,
    electronicAccess: [],
    inTransitDestinationServicePointId: null,
    statisticalCodeIds: [],
    purchaseOrderLineIdentifier: null,
    tags: null,
    lastCheckIn: null
  }
};
