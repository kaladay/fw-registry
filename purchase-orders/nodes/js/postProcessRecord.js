var reportObj = JSON.parse(report);
var instanceObj = JSON.parse(instance);

reportObj.records.push({
  poNumber: JSON.parse(poNumberResponse).poNumber,
  instanceUuid: instanceObj.id,
  instanceHrid: instanceObj.hrid
});

execution.setVariable('report', S(JSON.stringify(reportObj)));
