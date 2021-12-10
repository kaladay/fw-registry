
if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel + '\n');
  print('\nemailRecipient = ' + emailRecipient + '\n');
  print('\nlibraryName = ' + libraryName + '\n');
  print('\nlocationDiscoveryDisplayName = ' + locationDiscoveryDisplayName + '\n');
  print('\nlocationName = ' + locationName + '\n');
  print('\nlanguage = ' + language + '\n');
  print('\nresourceType = ' + resourceType + '\n');
  print('\nformat = ' + format + '\n');
  print('\nbatchId = ' + batchId + '\n');
  print('\nissuance = ' + issuance + '\n');
  print('\nsuppressInstance = ' + suppressInstance + '\n');
  print('\nsuppressHoldings = ' + suppressHoldings + '\n');
  print('\ncreatedDateStart = ' + createdDateStart + '\n');
  print('\ncreatedDateEnd = ' + createdDateEnd + '\n');
  print('\nupdatedDateStart = ' + updatedDateStart + '\n');
  print('\nupdatedDateEnd = ' + updatedDateEnd + '\n');
}


var from = "folio_reporting.holdings_ext"
            + " INNER JOIN folio_reporting.instance_ext ON holdings_ext.instance_id = instance_ext.instance_id"
            + " LEFT JOIN folio_reporting.instance_contributors contribs ON holdings_ext.instance_id = contribs.instance_id"
            + " LEFT JOIN folio_reporting.instance_publication pubs ON holdings_ext.instance_id = pubs.instance_id"
            + " LEFT JOIN folio_reporting.instance_identifiers idents ON holdings_ext.instance_id = idents.instance_id"
            + " LEFT JOIN folio_reporting.instance_formats formats ON holdings_ext.instance_id = formats.instance_id"
            + " LEFT JOIN folio_reporting.instance_languages lan ON holdings_ext.instance_id = lan.instance_id"
            + " LEFT JOIN folio_reporting.instance_statistical_codes stat_codes ON holdings_ext.instance_id = stat_codes.instance_id";

var where = "TRUE";

var normalizeArray = function(array) {
  var index = array.indexOf('All');
  if (index >= 0) {
      array.splice(index, 1);
  }
}

$arguments = array();

if (libraryName) {
  normalizeArray(libraryName);

  if (libraryName.length > 0) {
    from += "\n"
          + "\n\tLEFT JOIN public.inventory_locations display_name ON holdings_ext.permanent_location_name = display_name.name"
          + "\n\tLEFT JOIN public.inventory_libraries libraries ON display_name.library_id = libraries.id";

    where += "\n"
           + "\n\tAND libraries.name {buildIn(libraryName, $arguments, 'libraryName')}";
  }
}

if (locationDiscoveryDisplayName) {
  normalizeArray(locationDiscoveryDisplayName);

  if (count(locationDiscoveryDisplayName) > 0) {
    from += "\n"
          + "\tLEFT JOIN public.inventory_locations display_name ON holdings_ext.permanent_location_name = display_name.name";

    where += "\n"
           + "\n\tAND display_name.discovery_display_name {buildIn(locationDiscoveryDisplayName, $arguments, 'locationDiscoveryDisplayName')}";
  }
}

if (locationName) {
  normalizeArray(locationName);

  if (count(locationName) > 0) {
    where += "\n"
           + "\n\tAND holdings_ext.permanent_location_name {buildIn(locationName, $arguments, $arguments, 'locationName')}";
  }
}

if (language) {
  normalizeArray(language);

  if (count(language) > 0) {
    where += "\n"
           + "\n\tAND lan.language {buildIn(language, $arguments, 'language')}";
  }
}

if (resourceType) {
  normalizeArray(resourceType);

  if (count(resourceType) > 0) {
    where += "\n"
           + "\n\tAND instance_ext.type_name {buildIn(resourceType, $arguments, 'resourceType')}";
  }
}

if (format) {
  normalizeArray(format);

  if (count(format) > 0) {
    where += "\n"
           + "\n\tAND formats.format_name {buildIn(format, $arguments, 'format')}";
  }
}

if (batchId != "") {
  where += "\n"
         + "\n\tAND stat_codes.statistical_code_type_name = 'batch_id'"
         + "\n\tAND stat_codes.statistical_code_name = :batchId";
  $arguments[":batchId"] = batchId;
}

if (issuance != "") {
  where += "\n"
         + "\n\tAND instance_ext.mode_of_issuance_name = :issuance";
  $arguments[":issuance"] = issuance;
}

if (suppressInstance) {
  where += "\n"
         + "\n\tAND instance_ext.discovery_suppress = :suppressInstance";
  $arguments[":suppressInstance"] = suppressInstance;
}

if (suppressHoldings) {
  where += "\n"
         + "\n\tAND holdings_ext.discovery_suppress = :suppressHoldings";
  $arguments[":suppressHoldings"] = suppressHoldings;
}

if (createdDateStart != "") {
  where += "\n"
         + "\n\tAND cast(to_timestamp(instance_ext.record_created_date::text,'YYYY-MM-DD') AT TIME ZONE 'America/Chicago' AS DATE) >= to_date(:createdDateStart, 'YYYY-MM-DD')";
  $arguments[":createdDateStart"] = createdDateStart;
}

if (createdDateEnd != "") {
  where += "\n"
         + "\n\tAND cast(to_timestamp(instance_ext.record_created_date::text,'YYYY-MM-DD') AT TIME ZONE 'America/Chicago' AS DATE) <= to_date(:createdDateEnd, 'YYYY-MM-DD')";
  $arguments[":createdDateEnd"] = createdDateEnd;
}

if (updatedDateStart != "") {
  where += "\n"
         + "\n\tAND cast(to_timestamp(instance_ext.updated_date::text,'YYYY-MM-DD') AT TIME ZONE 'America/Chicago' AS DATE) >= to_date(:updatedDateStart, 'YYYY-MM-DD')";
  $arguments[":updatedDateStart"] = updatedDateStart;
}

if (updatedDateEnd != "") {
  where += "\n"
         + "\n\tAND cast(to_timestamp(instance_ext.updated_date::text,'YYYY-MM-DD') AT TIME ZONE 'America/Chicago' AS DATE) <= to_date(:updatedDateEnd, 'YYYY-MM-DD')";
  $arguments[":updatedDateEnd"] = updupdatedDateEndatedDate;
}

var reportQuery = "\n"
       + "\nSELECT DISTINCT"
       + "\n\tinstance_ext.instance_id AS instance_id,"
       + "\n\tinstance_ext.instance_hrid AS instance_hrid,"
       + "\n\tholdings_hrid,"
       + "\n\tholdings_ext.permanent_location_name AS location,"
       + "\n\tcall_number,"
       + "\n\tcall_number_prefix AS prefix,"
       + "\n\tcall_number_suffix AS suffix,"
       + "\n\tinstance_ext.discovery_suppress AS instance_suppress,"
       + "\n\tholdings_ext.discovery_suppress AS holdings_suppress,"
       + "\n\tcontributor_name,"
       + "\n\tcontributor_primary,"
       + "\n\tsubstr(instance_ext.title,1,60) AS title,"
       + "\n\tinstance_ext.mode_of_issuance_name AS issuance,"
       + "\n\tinstance_ext.type_name AS resource_type,"
       + "\n\tformats.format_name AS format,"
       + "\n\tlan.language AS language,"
       + "\n\tstat_codes.statistical_code_name AS stat_code,"
       + "\n\tpubs.date_of_publication AS pub_date,"
       + "\n\tcast(to_timestamp(instance_ext.record_created_date::text,'YYYY-MM-DD') AT TIME ZONE 'America/Chicago' AS DATE) AS create_date,"
       + "\n\tcast(to_timestamp(instance_ext.updated_date::text,'YYYY-MM-DD') AT TIME ZONE 'America/Chicago' AS DATE) AS update_date"
       + "\nFROM " + from
       + "\nWHERE " + where
       + "\nORDER BY call_number, contributor_primary DESC";

/* may require being transient */
execution.setVariableLocal('reportQuery', reportQuery);
