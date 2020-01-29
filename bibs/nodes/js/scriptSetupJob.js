s = JSON.parse(schema);
var s = JSON.parse(schema);
var jobs = [];
if (s.limit * s.batch > s.remaining) {
  s.batch = Math.floor(s.remaining / s.limit);
}
for (var i = 0; i < s.batch; i++) {
  jobs.push({
    schema: s.name,
    last: i === s.batch - 1,
    counter: i,
    total: (s.limit * (i + 1)),
    limit: s.limit,
    offset: s.offset + (s.limit * i)
  });
}
execution.setVariableLocal('jobs', S(JSON.stringify(jobs)));