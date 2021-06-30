var marcOrderDataObj = JSON.parse(marcOrderData);

var findNoteTypeIdByName = function (noteTypeName) {
  for (var i = 0; i < noteTypes.length; ++i) {
    if (noteTypeName === noteTypes[i].name) return noteTypes[i].id;
  }
};

var notes = [];

if (marcOrderDataObj.notes && marcOrderDataObj.notes.length) {
  var compositePurchaseOrderObj = JSON.parse(compositePurchaseOrder);

  var noteTypes = JSON.parse(noteTypesResponse).noteTypes;

  notes.push({
    links: [{
      type: 'poLine',
      id: compositePurchaseOrderObj.compositePoLines[0].id
    }],
    typeId: findNoteTypeIdByName(noteType),
    domain: 'orders',
    content: marcOrderDataObj.notes,
    title: marcOrderDataObj.notes
  });
}

execution.setVariableLocal('notes', S(JSON.stringify(notes)));
