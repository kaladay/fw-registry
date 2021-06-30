var UUID = Java.type("java.util.UUID");

var orderId = UUID.randomUUID().toString();
var orderLineId = UUID.randomUUID().toString();

var poNumber = JSON.parse(poNumberResponse).poNumber;

var vendorId = JSON.parse(vendorLookupResponse).organizations[0].id;

var compositePurchaseOrder = {
  id: orderId,
  orderType: 'One-Time',
  reEncumber: false,
  approved: true,
  workflowStatus: 'Open',
  poNumber: poNumber,
  vendor: vendorId,
  compositePoLines: [{
    id: orderLineId
  }]
};

execution.setVariableLocal('compositePurchaseOrder', S(JSON.stringify(compositePurchaseOrder)));
