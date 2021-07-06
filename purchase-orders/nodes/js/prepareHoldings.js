var instanceObj = JSON.parse(instance);
var holdingsObj = JSON.parse(holdingsResponse).holdingsRecords[0];

var marcOrderDataObj = JSON.parse(marcOrderData);

var holdingsTypes = JSON.parse(holdingsTypesResponse).holdingsTypes;

var locations = JSON.parse(locationsResponse).locations;

var findHoldingsTypeIdByName = function (holdingsTypeName) {
  for (var i = 0; i < holdingsTypes.length; ++i) {
    if (holdingsTypeName === holdingsTypes[i].name) return holdingsTypes[i].id;
  }
};

var findLocationIdByName = function (locationName) {
  for (var i = 0; i < locations.length; ++i) {
    if (locationName === locations[i].name) return locations[i].id;
  }
};

var electronic = marcOrderDataObj.electronicIndicator && marcOrderDataObj.electronicIndicator.toLowerCase().indexOf('electronic') >= 0;

holdingsObj.electronicAccess = instanceObj.electronicAccess;

if (electronic) {
  holdingsObj.holdingsTypeId = findHoldingsTypeIdByName(eHoldingsType);
} else {
  holdingsObj.temporaryLocationId = findLocationIdByName(tempLocation);
}

execution.setVariable('holdingsRecordId', holdingsObj.id);
execution.setVariable('holdings', S(JSON.stringify(holdingsObj)));
