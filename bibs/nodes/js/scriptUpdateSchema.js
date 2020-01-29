s = JSON.parse(schema);
var jt = s.limit * s.batch;
var r = s.remaining - jt;
s.remaining = r >= 0 ? r : 0;
s.offset = s.offset + jt;
execution.setVariableLocal('schema', S(JSON.stringify(s)));