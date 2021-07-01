var items = JSON.parse(itemsResponse).items;

execution.setVariableLocal('items', S(JSON.stringify(items)));
