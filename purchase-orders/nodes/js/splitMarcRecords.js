var Spin = Java.type("org.camunda.spin.Spin");
var MarcUtility = Java.type("org.folio.rest.utility.MarcUtility");

var records = MarcUtility.splitRawMarcToMarcJsonRecords(marc);

var reportObj = {
  records: []
};

execution.setVariableLocal('records', S(Spin.JSON(records)));
execution.setVariable('report', S(JSON.stringify(reportObj)));
