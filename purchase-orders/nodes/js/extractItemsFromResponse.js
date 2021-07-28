var items = JSON.parse(itemsResponse).items;

if (logLevel === 'DEBUG') {
  print('\nitemsResponse = ' + itemsResponse + '\n');
}

execution.setVariable('items', S(JSON.stringify(items)));
