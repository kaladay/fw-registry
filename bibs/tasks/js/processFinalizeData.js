var lastBibIndex;
var lastBibTotal;

var initialRecords = [];

for (var i = 0; i < args.length; i++) {
  // NOTE: sometimes this is an empty object {}
  var marc = JSON.stringify(args[i].marc);
  if (marc !== '' && marc != '{}') {
    initialRecords.push({ record: marc });
  }
  lastBibIndex = args[i].bibIndex;
  lastBibTotal = args[i].bibTotal;
}

var last = lastBibIndex >= lastBibTotal;
var counter = Math.ceil(lastBibIndex / {{bibBatchSize}});
var total = Math.ceil(lastBibTotal / {{bibBatchSize}});
var contentType = 'MARC_JSON';

print(JSON.stringify({
  recordsMetadata: {
    last: last,
    counter: counter,
    total: total,
    contentType: contentType
  }
}));

returnObj = {
  recordsMetadata: {
    last: last,
    counter: counter,
    total: total,
    contentType: contentType
  },
  initialRecords: initialRecords
};