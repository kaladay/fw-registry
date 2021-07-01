var MappingUtility = Java.type("org.folio.rest.utility.MappingUtility");

var instanceObj = JSON.parse(instance);
var marcJsonRecord = JSON.stringify(JSON.parse(sourceRecord).parsedRecord.content);

var token = execution.getVariable('X-Okapi-Token');

var tenant = execution.getTenantId();

var mappedInstance = MappingUtility.mapRecordToInsance(marcJsonRecord, okapiUrl, tenant, token);
var mappedInstanceObj = JSON.parse(mappedInstance);

mappedInstanceObj.id = instanceObj.id;
mappedInstanceObj.hrid = instanceObj.hrid;
mappedInstanceObj.statusId = instanceObj.statusId;
mappedInstanceObj.statusUpdatedDate = instanceObj.statusUpdatedDate;
mappedInstanceObj.discoverySuppress = false;

execution.setVariableLocal('instance', S(JSON.stringify(mappedInstanceObj)));

