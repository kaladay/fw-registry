var bibs = JSON.parse(bibsPage);
var instanceReferenceLinks = JSON.parse(bibInstanceReferenceLinks);
var sourceRecordReferenceLinks = JSON.parse(bibSourceRecordReferenceLinks);
var initialRecords = [];
for (var i = 0; i < bibs.length; i++) {
  var rawRecord = {
    record: bibs[i].MARC,
    suppressDiscovery: bibs[i].SUPPRESS_IN_OPAC === 'Y'
  };
  if (bibs[i]['BIB_ID'] == instanceReferenceLinks[i].externalReference) {
    rawRecord.instanceId = instanceReferenceLinks[i].folioReference;
  }
  if (bibs[i]['BIB_ID'] == sourceRecordReferenceLinks[i].externalReference) {
    rawRecord.sourceRecordId = sourceRecordReferenceLinks[i].folioReference;
  }
  initialRecords.push(rawRecord);
}

var j = JSON.parse(job);

var recordsMetadata = {
  last: j.last,
  counter: j.counter,
  total: j.total,
  contentType: 'MARC_RAW'
};

var records = {
  recordsMetadata: recordsMetadata,
  initialRecords: initialRecords
};

execution.setVariableLocal('records', JSON.stringify(records));