var itemsArr = JSON.parse(itemsResponse);

if (!itemsArr) {
  itemsArr = [];
}

execution.setVariable('items', S(JSON.stringify(itemsArr)));
