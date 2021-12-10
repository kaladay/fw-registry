/* UPDATE */

var reportObj = JSON.parse(report);

var fileName = inputFilePath.indexOf('/') >= 0
  ? inputFilePath.replace(/.*\/([^\/]+)$/i, '$1')
  : inputFilePath.replace(/.*\\([^\\]+)$/i, '$1');

var reportEmailSubject = 'Shelflist (holdings level) Report for ' + fileName;

var reportEmailText = ""
  + "Instance HRID, "
  + "Holdings HRID, "
  + "Location, "
  + "Call Number, "
  + "Contributor Name, "
  + "Title, "
  + "Issuance, "
  + "Identifier, "
  + "Resource Type, "
  + "Format, "
  + "Language, "
  + "Statistical Code, "
  + "Publication Date, "
  + "Create Date, "
  + "Update Date\n\n";

var reportEmailMarkup = "<table class=\"table table-striped\">"
  + "<thead>"
    + "<tr>"
      + "<th scope=\"col\">Instance HRID</th>"
      + "<th scope=\"col\">Holdings HRID</th>"
      + "<th scope=\"col\">Location</th>"
      + "<th scope=\"col\">Call Number</th>"
      + "<th scope=\"col\">Contributor Name</th>"
      + "<th scope=\"col\">Title</th>"
      + "<th scope=\"col\">Issuance</th>"
      + "<th scope=\"col\">Identifier</th>"
      + "<th scope=\"col\">Resource Type</th>"
      + "<th scope=\"col\">Format</th>"
      + "<th scope=\"col\">Language</th>"
      + "<th scope=\"col\">Statistical Code</th>"
      + "<th scope=\"col\">Publication Date</th>"
      + "<th scope=\"col\">Create Date</th>"
      + "<th scope=\"col\">Update Date</th>"
    + "</tr>"
  + "</thead>"
  + "<tbody>";

if (reportObj.records.length > 0) {

  for (var i = 0; i < reportObj.records.length; ++i) {
    var row = reportObj.records[i];
    var cn = row['call_number'];
    if (row['prefix']) {
      cn = row['prefix'] + " " + cn;
    }

    if (row['suffix']) {
      cn = cn + " " + row['suffix'];
    }

    reportEmailText += ""
      + row['instance_hrid'] + ","
      + row['holdings_hrid'] + ","
      + row['location'] + ","
      + cn + ","
      + row['contributor_name'] + ","
      + row['title'] + ","
      + row['issuance'] + ","
      + row['identifier'] + ","
      + row['resource_type'] + ","
      + row['format'] + ","
      + row['language'] + ","
      + row['stat_code'] + "\n";

    reportEmailMarkup += ""
      + "<tr>"
        + "<td>" + row['instance_hrid'] + "</td>"
        + "<td>" + row['holdings_hrid'] + "</td>"
        + "<td>" + row['location'] + "</td>"
        + "<td>" + cn + "</td>"
        + "<td>" + row['contributor_name'] + "</td>"
        + "<td>" + row['title'] + "</td>"
        + "<td>" + row['issuance'] + "</td>"
        + "<td>" + row['identifier'] + "</td>"
        + "<td>" + row['resource_type'] + "</td>"
        + "<td>" + row['format'] + "</td>"
        + "<td>" + row['language'] + "</td>"
        + "<td>" + row['stat_code'] + "</td>"
        + "<td class=\"text-nowrap\">" + row['pub_date'] + "</td>"
        + "<td class=\"text-nowrap\">" + row['create_date'] + "</td>"
        + "<td class=\"text-nowrap\">" + row['update_date'] + "</td>"
      + "</tr>";
  }
} else {
    reportEmailMarkup += "<tr><td colspan=\"15\">No results...</td></tr>";
}
reportEmailMarkup += "</tbody>"
  + "</table>";

if (logLevel === 'INFO' || logLevel === 'DEBUG') {
  print('inputFilePath = ' + inputFilePath);
  print('fileName = ' + fileName);
  print('emailTo = ' + emailTo);
  print('emailFrom = ' + emailFrom);
  print('totalRecords = ' + reportObj.records.length + '\n');

  if (logLevel === 'DEBUG') {
    print('reportEmailSubject = ' + reportEmailSubject);
    print('reportEmailText = ' + reportEmailText);
    print('reportEmailMarkup = ' + reportEmailMarkup);
    print('reportObj = ' + JSON.stringify(reportObj) + '\n');
  }
}

var reportEmail = {
  subject: reportEmailSubject,
  text: reportEmailText,
  markup: reportEmailMarkup
};

execution.setVariableLocal('reportEmail', S(JSON.stringify(reportEmail)));
