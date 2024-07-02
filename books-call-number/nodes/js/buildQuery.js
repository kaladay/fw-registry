if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel + '\n');
  print('\ncall number start range = ' + startRange + '\n');
  print('\ncall number end range = ' + endRange + '\n');
  print('locationName = ' + locationName + '\n');
}
var where = 'TRUE';

const locationNames = execution.getVariable('locationName');

const maxAllowedCharacters = 3000;
let totalCharacterCount = 0;

if (startRange) {
  where = '\n\t\tUPPER(ie.effective_call_number) >= UPPER(\'' + startRange + '\')';
}

if (endRange) {
  where += '\n\t\tAND UPPER(ie.effective_call_number) <= RPAD(UPPER(\'' + endRange + '\'), max_len, \'ÿ\')';
}

where += '\n\t\tAND ie.status_name = \'Checked out\'';

if(locationNames.length > 0)
{ 
  where += "\n\tAND ie.effective_location_name IN ('"+locationNames+"')";
}

var cte = 'WITH MaxLength AS (' +
'\n\tSELECT MAX(LENGTH(ie.effective_call_number)) AS max_len' +
'\n\tFROM folio_reporting.item_ext ie' +
')';

var booksCallNumberQuery =
'\n\n' + cte +
'\nSELECT ie.effective_call_number,' +
'\n\tie.effective_location_name AS item_effective_location' +
'\n\tFROM folio_reporting.item_ext ie' +
'\n\tCROSS JOIN MaxLength' +
'\nWHERE ' + where +
'\nORDER BY ie.effective_call_number, item_effective_location';

print(booksCallNumberQuery);

var queryWrapper = {
  sql: booksCallNumberQuery,
};

execution.setVariableLocal('booksCallNumberQuery', S(JSON.stringify(queryWrapper)));
