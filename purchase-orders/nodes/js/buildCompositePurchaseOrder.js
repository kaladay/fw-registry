var UUID = Java.type("java.util.UUID");

var orderId = UUID.randomUUID().toString();
var orderLineId = UUID.randomUUID().toString();

var poNumber = JSON.parse(poNumberResponse).poNumber;

var vendorId = JSON.parse(vendorLookupResponse).organizations[0].id;

var marcOrderDataObj = JSON.parse(marcOrderData);

var locations = JSON.parse(locationsResponse).locations;

var materialTypes = JSON.parse(materialTypesResponse).mtypes;

var electronic = marcOrderDataObj.electronicIndicator && marcOrderDataObj.electronicIndicator.toLowerCase() === "electronic";

var orderLine = {
  id: orderLineId,
  cost: {},
  locations: []
};

var compositePoLines = [
  orderLine
];

var compositePurchaseOrder = {
  id: orderId,
  approved: true,
  compositePoLines: compositePoLines,
  orderType: 'One-Time',
  poNumber: poNumber,
  reEncumber: false,
  vendor: vendorId,
  workflowStatus: 'Open'
};

var findLocationByName = function (locationName) {
  for (var i = 0; i < locations.length; ++i) {
    if (locationName === locations[i].name) return locations[i];
  }
};

var findMaterialTypeByName = function (materialTypeName) {
  for (var i = 0; i < materialTypes.length; ++i) {
    if (materialTypeName === materialTypes[i].name) return materialTypes[i];
  }
};

if (electronic) {
  orderLine.orderFormat = 'Electronic Resource';

  orderLine.eResource = {
    activated: false,
    createInventory: 'Instance, Holding',
    trial: false,
    accessProvider: vendorId
  };

  orderLine.cost.quantityElectronic = 1;
  orderLine.cost.listUnitPriceElectronic = marcOrderDataObj.price;

  orderLine.locations.push({
    quantityElectronic: 1,
    locationId: findLocationByName(permELocation)
  });
} else {
  orderLine.physical = {
    createInventory: 'Instance, Holding, Item',
    materialType: findMaterialTypeByName(permLocation)
  };

  orderLine.cost.quantityPhysical = 1;
  orderLine.cost.listUnitPrice = marcOrderDataObj.price;

  orderLine.locations.push({
    quantityPhysical: 1,
    locationId: findLocationByName(permLocation)
  });
}

execution.setVariableLocal('compositePurchaseOrder', S(JSON.stringify(compositePurchaseOrder)));
