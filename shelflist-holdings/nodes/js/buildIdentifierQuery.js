var shelflist = JSON.parse(shelflistResult);

var identifierTypeName = shelflist.issuance === 'serial' ? 'ISSN' : 'ISBN';

var identifierQuery = '\n'
       + '\nSELECT'
       + '\n\tsplit_part(idents.identifier,\' \',1) AS identifier,'
       + '\n\tlength(identifier) AS ident_len'
       + '\nFROM folio_reporting.instance_identifiers idents'
       + '\nWHERE identifier_type_name = \'' + identifierTypeName + '\''
       + '\n\tAND instance_id = \'' + shelflist.instance_id + '\''
       + '\nORDER BY ident_len DESC\n';

if (logLevel === 'DEBUG') {
  print('\nidentifierQuery = ' + identifierQuery);
}

execution.setVariableLocal('identifierQuery', identifierQuery);
