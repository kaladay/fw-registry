var itemsArr = JSON.parse(itemsResponse);

print('\nitemsResponse = ' + itemsResponse + '\n');

if (!itemsArr) {
  itemsArr = [];
}

execution.setVariable('items', S(JSON.stringify(itemsArr)));
