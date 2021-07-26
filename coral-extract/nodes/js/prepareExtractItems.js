var StringEscapeUtils = Java.type('org.apache.commons.lang.StringEscapeUtils');

var safe = function (str) {
  return StringEscapeUtils.escapeSql(str);
};

var buildExtractItems = function () {
  var lines = coralExtractResponse.replace(/\n$/i, '').split('\n');
  var parts;
  var items = [];

  for (var i = 1; i < lines.length; ++i) {
    parts = lines[i].split('\t');

    items.push({
      coralId: parts[0],
      contributor: safe(parts[3]),
      title: safe(parts[6]),
      publisher: safe(parts[8]),
      summary: safe(parts[15]),
      natureOfContentTerm: safe(parts[29]),
      electronicAccess: safe(parts[32]),
      status: safe(parts[62])
    });
  }

  return items;
};

execution.setVariable('extractItems', S(JSON.stringify(buildExtractItems())));
