var MarcUtility = Java.type("org.folio.rest.utility.MarcUtility");

var fields = JSON.parse(MarcUtility.getFieldsFromMarcJson(records[loopCounter], ['245', '947', '980']));

if (logLevel === 'DEBUG') {
  print('\nfields = ' + JSON.stringify(fields) + '\n');
}

var getSubfield = function (fields, tag, code) {
  for (var i = 0; i < fields.length; ++i) {
    if (fields[i].tag === tag) {
      for (var j = 0; j < fields[i].subfields.length; ++j) {
        if (fields[i].subfields[j].code === code) {
          return fields[i].subfields[j].data;
        }
      }
    }
  }
};

var getMultipleSubfield = function (fields, tag, code) {
  var data = [];
  for (var i = 0; i < fields.length; ++i) {
    if (fields[i].tag === tag) {
      for (var j = 0; j < fields[i].subfields.length; ++j) {
        if (fields[i].subfields[j].code === code) {
          data.push(fields[i].subfields[j].data);
        }
      }
      break;
    }
  }
  return data;
};

var title = getSubfield(fields, '245', 'a');
if (title.endsWith(' :')) {
  title += ' ' + getSubfield(fields, '245', 'b');
}
if (title.endsWith(' /')) {
  title += ' ' + getSubfield(fields, '245', 'c');
}

/* TODO: Ask about MARC title parsing */

var marcOrderData = {
  title: title,
  objectCode: getSubfield(fields, '980', 'o'),
  projectCode: getSubfield(fields, '980', 'r'),
  fundCode: getSubfield(fields, '980', 'b'),
  vendorCode:  getSubfield(fields, '980', 'v'),
  notes:  getMultipleSubfield(fields, '980', 'n'),
  price: getSubfield(fields, '980', 'm'),
  electronicIndicator: getSubfield(fields, '980', 'z'),
  vendorItemId: getSubfield(fields, '980', 'c'),
  barcode: getSubfield(fields, '947', 'a')
};

execution.setVariable('marcOrderData', S(JSON.stringify(marcOrderData)));
