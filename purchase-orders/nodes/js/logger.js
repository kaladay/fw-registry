if (logLevel === 'INFO' || logLevel === 'DEBUG') {
  print('\nindex = ' + loopCounter);
  print('\tokapiUrl = ' + okapiUrl);
  print('\tpermLocation = ' + permLocation);
  print('\ttempLocation = ' + tempLocation);
  print('\tfiscalYearCode = ' + fiscalYearCode);
  print('\tpermLoanType = ' + permLoanType);
  print('\ttempLoanType = ' + tempLoanType);
  print('\tnoteType = ' + noteType);
  print('\tmaterialType = ' + materialType);

  print('\tpermELocation = ' + permELocation);
  print('\teMaterialType = ' + eMaterialType);
  print('\teHoldingsType = ' + eHoldingsType + '\n');
}

if (logLevel === 'DEBUG') {
  print('\npoNumberResponse = ' + poNumberResponse + '\n');
  print('\nvendorsResponse = ' + vendorsResponse + '\n');
  print('\nfundsResponse = ' + fundsResponse + '\n');

  print('\nlocationsResponse = ' + locationsResponse + '\n');
  print('\nnoteTypesResponse = ' + noteTypesResponse + '\n');
  print('\nloanTypesResponse = ' + loanTypesResponse + '\n');
  print('\nholdingsTypesResponse = ' + holdingsTypesResponse + '\n');
  print('\ninstanceTypesResponse = ' + instanceTypesResponse + '\n');
  print('\nmaterialTypesResponse = ' + materialTypesResponse + '\n');

  print('\nmarcOrderData = ' + marcOrderData + '\n');

  print('\ncompositePurchaseOrder = ' + compositePurchaseOrder + '\n');
  
  print('\njobExecution = ' + jobExecution + '\n');
  print('\nsourceRecord = ' + sourceRecord + '\n');

  print('\ninstance = ' + instance + '\n');
  print('\nholdings = ' + holdings + '\n');

  print('\nitemsResponse = ' + itemsResponse + '\n');
}

