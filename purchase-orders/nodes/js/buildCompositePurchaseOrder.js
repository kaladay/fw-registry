var UUID = Java.type("java.util.UUID");

var orderId = UUID.randomUUID().toString();
var orderLineId = UUID.randomUUID().toString();

var poNumber = JSON.parse(poNumberResponse).poNumber;

var vendorId = JSON.parse(vendorLookupResponse).organizations[0].id;

var marcOrderDataObj = JSON.parse(marcOrderData);

var locations = JSON.parse(locationsResponse).locations;

var funds = JSON.parse(fundsResponse).funds;

var materialTypes = JSON.parse(materialTypesResponse).mtypes;

var electronic = marcOrderDataObj.electronicIndicator && marcOrderDataObj.electronicIndicator.toLowerCase().indexOf('electronic') >= 0;

var orderLine = {
  id: orderLineId,
  acquisitionMethod: 'Purchase',
  cost: {
    currency: 'USD'
  },
  fundDistribution: [{
    code: funds[0].code,
    distributionType: 'percentage',
    fundId: funds[0].id,
    value: 100
  }],
  locations: [],
  purchaseOrderId: orderId,
  source: 'User',
  titleOrPackage: marcOrderDataObj.title
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

var tagList = [];

var findLocationIdByName = function (locationName) {
  for (var i = 0; i < locations.length; ++i) {
    if (locationName === locations[i].name) return locations[i].id;
  }
};

var findMaterialTypeIdByName = function (materialTypeName) {
  for (var i = 0; i < materialTypes.length; ++i) {
    if (materialTypeName === materialTypes[i].name) return materialTypes[i].id;
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
    locationId: findLocationIdByName(permELocation)
  });
} else {
  orderLine.orderFormat = 'Physical Resource';

  orderLine.physical = {
    createInventory: 'Instance, Holding, Item',
    materialType: findMaterialTypeIdByName(materialType)
  };

  orderLine.cost.quantityPhysical = 1;
  orderLine.cost.listUnitPrice = marcOrderDataObj.price;

  orderLine.locations.push({
    quantityPhysical: 1,
    locationId: findLocationIdByName(permLocation)
  });
}

if (marcOrderDataObj.vendorItemId) {
  orderLine.vendorDetail = {
    instructions: '',
    vendorAccount: '',
    referenceNumbers: [{
      refNumber: marcOrderDataObj.vendorItemId,
      refNumberType: 'Vendor internal number'
    }]
  };
}

if (marcOrderDataObj.objectCode) {
  tagList.push(marcOrderDataObj.objectCode);
}

if (marcOrderDataObj.projectCode) {
  tagList.push(marcOrderDataObj.projectCode);
}

if (tagList.length) {
  orderLine.tags = {
    tagList: tagList
  };
}

execution.setVariableLocal('compositePurchaseOrder', S(JSON.stringify(compositePurchaseOrder)));
