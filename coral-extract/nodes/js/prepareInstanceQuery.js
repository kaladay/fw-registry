var FormatUtility = Java.type('org.folio.rest.utility.FormatUtility');
var item = JSON.parse(coralItem);
var cqlTitle = FormatUtility.normalizeCql(item.title);
var instanceQuery = 'title==' + FormatUtility.normalizeUrlArgument(cqlTitle);

execution.setVariableLocal('instanceQuery', instanceQuery);
