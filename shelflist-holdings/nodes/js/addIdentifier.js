if (logLevel === 'DEBUG') {
  print('\nidentifierResults = ' + identifierResults);
}

var shelflist = JSON.parse(shelflistResult);
var results = JSON.parse(identifierResults);

if (results && results.length > 0) {
  shelflist.identifier = results[0].identifier;
}
