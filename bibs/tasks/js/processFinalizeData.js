var last = false;
var counter = 1;
var total = 1;
var contentType = 'MARC_JSON';
var initialRecords = [];

for (var i = 0; i < args; i++) {
  initialRecords.push({ record: args[i].marc });
  total = args.total;
}

total = Math.floor(total / {{bibBatchSize}});

returnObj = {
  recordsMetadata: {
    last: last,
    counter: counter,
    total: total,
    contentType: contentType
  },
  initialRecords: initialRecords
};