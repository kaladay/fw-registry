var FormatUtility = Java.type('org.folio.rest.utility.FormatUtility');
var item = JSON.parse(coralItem);
var cqlTitle = FormatUtility.normalizeCqlUrlArgument(item.title);

execution.setVariableLocal('instanceQuery', 'title==' + cqlTitle);
