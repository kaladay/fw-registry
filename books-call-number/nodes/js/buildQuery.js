if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel + '\n');
  print('\ncall number start range = ' + startRange + '\n');
  print('\ncall number end range = ' + endRange + '\n');
}

var where = 'TRUE';

// wip top

var libraryNameArray = JSON.parse(libraryName);

var normalizeArray = function (array) {
  var index = array.indexOf('All');
  if (index >= 0) {
      array.splice(index, 1);
  }
};

if (libraryNameArray) {
  normalizeArray(libraryNameArray);
  if (libraryNameArray.length > 0) {
    from += '\n\tLEFT JOIN public.inventory_locations publoc ON item_ext.effective_location_id = publoc.id'
          + '\n\tLEFT JOIN public.inventory_libraries publib ON publoc.library_id = publib.id';

    where += '\n\tAND publib.name IN (\'' + libraryNameArray.join('\',\'') + '\')';
  }
}


var locationDiscoveryDisplayNameArray = JSON.parse(locationDiscoveryDisplayName);

if (locationDiscoveryDisplayNameArray) {
  normalizeArray(locationDiscoveryDisplayNameArray);

  if (locationDiscoveryDisplayNameArray.length > 0) {
    from += '\n\tLEFT JOIN public.inventory_locations publoc ON item_ext.effective_location_name = publoc.name';

    where += '\n\tAND publoc.discovery_display_name IN (\'' + locationDiscoveryDisplayNameArray.join('\',\'') + '\')';
  }
}

var locationNameArray = JSON.parse(locationName);

if (locationNameArray) {
  normalizeArray(locationNameArray);

  if (locationNameArray.length > 0) {
    where += '\n\tAND item_ext.effective_location_name IN (\'' + locationNameArray.join('\',\'') + '\')';
  }
}


// wip bottom

if (startRange) {
  where = '\n\t\tUPPER(ie.effective_call_number) >= UPPER(\'' + startRange + '\')';
}

if (endRange) {
  where += '\n\t\tAND UPPER(ie.effective_call_number) <= RPAD(UPPER(\'' + endRange + '\'), max_len, \'ÿ\')';
}

where += '\n\t\tAND ie.status_name = \'Checked out\'';

var cte = 'WITH MaxLength AS (' +
'\n\tSELECT MAX(LENGTH(ie.effective_call_number)) AS max_len' +
'\n\tFROM folio_reporting.item_ext ie' +
')';

var booksCallNumberQuery =
  '\n\n' + cte +
  '\nSELECT ie.effective_call_number' +
  '\n\tie.effective_location_name AS item_effective_location,' +     // wip
  '\n\tFROM folio_reporting.item_ext ie' +
  '\n\tCROSS JOIN MaxLength' +
  '\nWHERE ' + where +
  '\nORDER BY ie.effective_call_number';

if (logLevel === 'DEBUG') {
  print('\nbooksCallNumberQuery = ' + booksCallNumberQuery);
}

var queryWrapper = {
  sql: booksCallNumberQuery,
};

execution.setVariableLocal('booksCallNumberQuery', S(JSON.stringify(queryWrapper)));
