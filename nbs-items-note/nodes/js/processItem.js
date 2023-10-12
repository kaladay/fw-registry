var itemObj = JSON.parse(itemResponse);

print('\nitemResponse = ' + itemResponse + '\n');

var extractResponseArray = function (response, key) {
  return (!response || !response[key]) ? [] : response[key];
};

if (!!itemObj && !!itemObj.status && !!itemObj.status.name && itemObj.status.name == 'Checked out') {
  var circulationNotes = extractResponseArray(itemObj, 'circulationNotes');
  var addNote = true;

  if (circulationNotes.length > 0) {
    for (var i = 0; i < circulationNotes.length; i++) {
      if (!!circulationNotes.noteType && !!circulationNotes.note) {
        if (circulationNotes.noteType == 'Check in' && circulation.note == 'Place on New Bookshelf') {
          addNote = false;
          break;
        }
      }
    }
  }

  if (addNote) {
    circulationNotes.push({
      'noteType': 'Check in',
      'note': 'Place on New Bookshelf',
      'staffOnly': true
    });

    itemObj.circulationNotes = circulationNotes;
  }
}

execution.setVariable('updatedItem', S(JSON.stringify(itemObj)));
execution.setVariable('itemId', (!!itemObj && !!itemObj.id) ? itemObj.id : '');
