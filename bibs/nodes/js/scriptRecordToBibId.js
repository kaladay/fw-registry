var bibs = JSON.parse(bibsPage);
var bibIds = [];
for (var i = 0; i < bibs.length; i++) {
  bibIds.push(bibs[i]['BIB_ID']);
}
execution.setVariableLocal('bibIds', S(JSON.stringify(bibIds)));