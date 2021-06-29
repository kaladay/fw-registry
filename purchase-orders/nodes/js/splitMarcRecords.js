var MarcUtility = Java.type("org.folio.rest.utility.MarcUtility");
var Variables = Java.type("org.camunda.bpm.engine.variable.Variables");
var marcUtility = new MarcUtility();

var records = marcUtility.splitRawMarcToMarcJsonRecords(marc);

execution.setVariableLocal('records', Variables.objectValue(records, true).create());
