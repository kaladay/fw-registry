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
  },
  itemStatusTypes: {
    '1': 'Not Charged',
    '2': 'Charged',
    '3': 'Renewed',
    '4': 'Overdue',
    '5': 'Recall Request',
    '6': 'Hold Request',
    '7': 'On Hold',
    '8': 'In Transit',
    '9': 'In Transit Discharged',
    '10': 'In Transit On Hold',
    '11': 'Discharged',
    '12': 'Missing',
    '13': 'Lost--Library Applied',
    '14': 'Lost--System Applied',
    '15': 'Claims Returned',
    '16': 'Damaged',
    '17': 'Withdrawn',
    '18': 'At Bindery',
    '19': 'Cataloging Review',
    '20': 'Circulation Review',
    '21': 'Scheduled',
    '22': 'In Process',
    '23': 'Call Slip Request',
    '24': 'Short Loan Request',
    '25': 'Remote Storage Request'
  }
};
