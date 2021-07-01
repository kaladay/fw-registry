var UUID = Java.type("java.util.UUID");
var Variables = Java.type("org.camunda.bpm.engine.variable.Variables");
var MarcUtility = Java.type("org.folio.rest.utility.MarcUtility");
var marcUtility = new MarcUtility();

var recordId = UUID.randomUUID().toString();

var instanceObj = JSON.parse(instance);

var instanceId = instanceObj.id;
var instanceHrid = instanceObj.hrid;

var field = {
  tag: '999',
  indicator1: 'f',
  indicator2: 'f',
  subfields: [{
    code: 'i',
    data: instanceId
  }, {
    code: 's',
    data: recordId
  }]
};

var marcJsonRecord = records[loopCounter];

marcJsonRecord = marcUtility.addFieldToMarcJson(marcJsonRecord, JSON.stringify(field));

marcJsonRecord = marcUtility.updateControlNumberField(marcJsonRecord, instanceHrid);

var rawMarcRecord = marcUtility.marcJsonToRawMarc(marcJsonRecord);

execution.setVariable('marcJsonRecord', Variables.stringValue(marcJsonRecord, true));
execution.setVariable('rawMarcRecord', Variables.stringValue(rawMarcRecord, true));
