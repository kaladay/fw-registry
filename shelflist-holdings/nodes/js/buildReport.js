var results = JSON.parse(shelflistResults);
var report = 'Instance ID,Instance HRID,Holdings HRID,Location,Call Number,Contributor Name,Title,Issuance,Identifier,Resource Type,Format,Language,Statistical Code,Publication Date,Create Date,Update Date\n';

for (var i = 0; i < results.length; i++) {
  var shelflist = results[i];

  var instance_id = shelflist.instance_id;
  var instance_hrid = shelflist.instance_hrid;
  var holdings_hrid = shelflist.holdings_hrid;
  var location = shelflist.location;
  var call_number = shelflist.call_number;
  if (shelflist.prefix) {
    call_number = shelflist.prefix + ' ' + call_number;
  }
  if (shelflist.suffix) {
    call_number = call_number + ' ' + shelflist.suffix;
  }
  var contributor_name = shelflist.contributor_name;
  var title = shelflist.title;
  var issuance = shelflist.issuance;
  var identifier = shelflist.identifier;
  var resource_type = shelflist.resource_type;
  var format = shelflist.format;
  var language = shelflist.language;
  var stat_code = shelflist.stat_code;
  var pub_date = shelflist.pub_date;
  var create_date = shelflist.create_date;
  var update_date = shelflist.update_date;

  report += instance_id + ',' + instance_hrid + ',' + holdings_hrid + ',' + location + ',' + call_number + ',' + contributor_name + ',' + title + ',' + issuance + ',' + identifier + ',' + resource_type + ',' + format + ',' + language + ',' + stat_code + ',' + pub_date + ',' + create_date + ',' + update_date + '\n';
}

execution.setVariable('shelflistResults', report);
