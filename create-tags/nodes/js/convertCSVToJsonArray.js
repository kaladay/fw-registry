var tags = [];

var tagsJSON = MappingUtility.mapCsvToJson(tagsCSV);
var tagsObj = JSON.parse(tagsJSON);

if (logLevel === "DEBUG") {
  print('\ntags = ' + tagsJSON + '\n');
}

// for(var i=1;i<arrData.length;i++) {
//     var tagLabel = arrData[i][0];
//   tags.push({
//     label: tagLabel
//   });
// }

if (logLevel === "DEBUG") {
    print('\ntags = ' + JSON.stringify(tags) + '\n');
}

execution.setVariable('tags', S(JSON.stringify(tags)));
