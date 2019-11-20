var lastBibIndex;
var lastBibTotal;

var initialRecords = [];

for (var i = 0; i < args.length; i++) {
  initialRecords.push({ record: args[i].marc });
  lastBibIndex = args[i].bibIndex;
  lastBibTotal = args[i].bibTotal;
}

var last = lastBibIndex >= lastBibTotal;
var counter = Math.ceil(lastBibIndex / {{bibBatchSize}});
var total = Math.ceil(lastBibTotal / {{bibBatchSize}});
var contentType = 'MARC_JSON';

returnObj = {
  recordsMetadata: {
    last: last,
    counter: counter,
    total: total,
    contentType: contentType
  },
  initialRecords: initialRecords
};