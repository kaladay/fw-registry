var tags = [];

strDelimiter = ",";

var objPattern = new RegExp(
  (
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

    "([^\"\\" + strDelimiter + "\\r\\n]*))"
  ),
  "gi"
);

var arrData = [[]];

var arrMatches = null;

while (arrMatches = objPattern.exec( tagsCSV )){

  var strMatchedDelimiter = arrMatches[ 1 ];

  if (
    strMatchedDelimiter.length &&
    (strMatchedDelimiter != strDelimiter)
  ){

    arrData.push( [] );

  }

  if (arrMatches[ 2 ]){

    var strMatchedValue = arrMatches[ 2 ].replace(
      new RegExp( "\"\"", "g" ),
      "\""
    );

  } else {

    var strMatchedValue = arrMatches[ 3 ];

  }

  arrData[ arrData.length - 1 ].push( strMatchedValue );
}

for(var i=1;i<arrData.length;i++) {
    var tagLabel = arrData[i][0];
  tags.push({
    labe: tagLabel
  });
}

if (logLevel === "DEBUG") {
    print('\ntags = ' + JSON.stringify(tags) + '\n');
}

execution.setVariable('tags', S(JSON.stringify(tags)));
