s = JSON.parse(schema);
c = JSON.parse(count);
s.total = c[0].TOTAL;
s.remaining = c[0].TOTAL;
execution.setVariableLocal('schema', S(JSON.stringify(s)));