var UUID = Java.type("java.util.UUID");
var Variables = Java.type("org.camunda.bpm.engine.variable.Variables");
var MarcUtility = Java.type("org.folio.rest.utility.MarcUtility");
var marcUtility = new MarcUtility();

var sourceRecordId = UUID.randomUUID().toString();
var snapshotId = UUID.randomUUID().toString();

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
    data: sourceRecordId
  }]
};

var marcJsonRecord = records[loopCounter];

marcJsonRecord = marcUtility.addFieldToMarcJson(marcJsonRecord, JSON.stringify(field));

marcJsonRecord = marcUtility.updateControlNumberField(marcJsonRecord, instanceHrid);

var rawMarcRecord = marcUtility.marcJsonToRawMarc(marcJsonRecord);

var jobExecution = {
  jobExecutionId: snapshotId,
  status: 'PARSING_IN_PROGRESS'
};

var sourceRecord = {
  id: sourceRecordId,
  recordType: 'MARC',
  snapshotId: snapshotId,
  matchedId:  instanceId,
  externalIdsHolder: {
    instanceId: instanceId
  },
  rawRecord: {
    id: sourceRecordId,
    content: rawMarcRecord
  },
  parsedRecord: {
    id: sourceRecordId,
    content: JSON.parse(marcJsonRecord)
  }
};

execution.setVariableLocal('jobExecution', JSON.stringify(jobExecution));

execution.setVariable('sourceRecord', Variables.stringValue(JSON.stringify(sourceRecord), true));
