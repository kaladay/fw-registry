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
  statisticalCodeTypes: {
    'At Bindery': '746429f5-30fd-453e-b07b-e74eb857e47d',
    'Call Slip Request': '5fab41c6-88e1-4b45-a352-f055ab00b323',
    'Cataloging Review': '50b06961-26e9-482b-97ea-c8308dda77d8',
    'Charged': '974bfd47-47c9-48af-91e8-2c25a586ba2a',
    'Circulation Review': 'e13e1b95-3167-4976-a6ca-12a6689e81c4',
    'Claims Returned': '6b95543b-14e4-43ac-8861-860e9f9aa149',
    'Discharged': 'fdcb9916-2624-4196-84e8-9445e0df00e7',
    'Hold Request': 'c242c618-033b-46aa-93c1-1f40a410f82f',
    'In Process': 'fef0a61c-7a29-4b9e-ae05-6c70b8656e9c',
    'In Transit': '96cb1c7f-e188-4a24-b390-11ef4d1ffc99',
    'In Transit Discharged': 'ef9468b0-1a26-4476-a356-8360bedc90ff',
    'In Transit On Hold': 'af4ddf3a-405a-4b42-887d-53119dca26c9',
    'Lost--Library Applied': 'ccf06fc3-4a02-4dbd-b51f-e1d84f75ab4b',
    'Lost--System Applied': '37e178fa-dd83-441d-bb2f-77de049cfba1',
    'Missing': '9a579158-d437-4e13-87b2-550c401a3994',
    'Not Charged': '71b2451d-408f-4ac7-ad28-e5e774efd06a',
    'On Hold': '0b40ba6b-b169-4e44-a7a5-5cbbe3f120f4',
    'Overdue': 'd96462aa-ec7b-4330-b68b-8f8fb5c6f4d0',
    'Recall Request': 'f347bcf1-9e09-4202-9971-4449253e9672',
    'Remote Storage Request': '30d8ab13-b397-4e1e-b0b8-ec87f3341122',
    'Renewed': '6363d3b7-aef1-4470-8934-8df96498d27b',
    'Scheduled': '6972a1f6-b22a-48bf-829e-a673337c9031',
    'Short Loan Request': 'a9091510-e99b-49d6-869f-3e0f6319bcf9',
    'Withdrawn': '7cfd2e13-f85e-4337-8b10-f36e0b325d9b'
  }
};
