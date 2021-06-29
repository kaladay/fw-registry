var MarcUtility = Java.type("org.folio.rest.utility.MarcUtility");
var marcUtility = new MarcUtility();

var records = marcUtility.splitRawMarcToMarcJsonRecords(marc);

execution.setVariableLocal('records', records);
