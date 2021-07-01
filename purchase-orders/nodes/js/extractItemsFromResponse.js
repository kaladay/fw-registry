var items = JSON.parse(itemsResponse).items;

execution.setVariable('items', S(JSON.stringify(items)));
