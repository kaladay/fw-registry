var compositePurchaseOrderObj = JSON.parse(compositePurchaseOrder);

var instanceId = compositePurchaseOrderObj.compositePoLines[0].instanceId;

execution.setVariableLocal('instanceId', instanceId);
