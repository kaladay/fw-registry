
if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel + '\n');
  print('emailFrom = ' + emailFrom + '\n');
  print('emailTo = ' + emailTo + '\n');
  print('libraryName = ' + libraryName + '\n');
  print('locationDiscoveryDisplayName = ' + locationDiscoveryDisplayName + '\n');
  print('locationName = ' + locationName + '\n');
  print('language = ' + language + '\n');
  print('resourceType = ' + resourceType + '\n');
  print('format = ' + format + '\n');
  print('batchId = ' + batchId + '\n');
  print('issuance = ' + issuance + '\n');
  print('suppressInstance = ' + suppressInstance + '\n');
  print('suppressHoldings = ' + suppressHoldings + '\n');
  print('createdDateStart = ' + createdDateStart + '\n');
  print('createdDateEnd = ' + createdDateEnd + '\n');
  print('updatedDateStart = ' + updatedDateStart + '\n');
  print('updatedDateEnd = ' + updatedDateEnd + '\n');
}

var from = 'folio_reporting.holdings_ext'
            + '\n\t INNER JOIN folio_reporting.instance_ext ON holdings_ext.instance_id = instance_ext.instance_id'
            + '\n\t LEFT JOIN folio_reporting.instance_contributors contribs ON holdings_ext.instance_id = contribs.instance_id'
            + '\n\t LEFT JOIN folio_reporting.instance_publication pubs ON holdings_ext.instance_id = pubs.instance_id'
            + '\n\t LEFT JOIN folio_reporting.instance_identifiers idents ON holdings_ext.instance_id = idents.instance_id'
            + '\n\t LEFT JOIN folio_reporting.instance_formats formats ON holdings_ext.instance_id = formats.instance_id'
            + '\n\t LEFT JOIN folio_reporting.instance_languages lan ON holdings_ext.instance_id = lan.instance_id'
            + '\n\t LEFT JOIN folio_reporting.instance_statistical_codes stat_codes ON holdings_ext.instance_id = stat_codes.instance_id';

var where = 'TRUE';

var libraryNameArray = JSON.parse(libraryName);

var normalizeArray = function (array) {
  var index = array.indexOf('All');
  if (index >= 0) {
      array.splice(index, 1);
  }
};

if (libraryNameArray) {
  normalizeArray(libraryNameArray);
  if (libraryNameArray.length > 0) {
    from += ''
          + '\n\t LEFT JOIN public.inventory_locations display_name ON holdings_ext.permanent_location_name = display_name.name'
          + '\n\t LEFT JOIN public.inventory_libraries libraries ON display_name.library_id = libraries.id';

    where += ''
          + '\n\t AND libraries.name IN (\'' + libraryNameArray.join('\',\'') + '\')';
  }
}

var locationDiscoveryDisplayNameArray = JSON.parse(locationDiscoveryDisplayName);

if (locationDiscoveryDisplayNameArray) {
  normalizeArray(locationDiscoveryDisplayNameArray);

  if (locationDiscoveryDisplayNameArray.length > 0) {
    from += ''
          + '\n\t LEFT JOIN public.inventory_locations display_name ON holdings_ext.permanent_location_name = display_name.name';

    where += ''
          + '\n\t AND display_name.discovery_display_name IN (\'' + locationDiscoveryDisplayNameArray.join('\',\'') + '\')';
  }
}

var locationNameArray = JSON.parse(locationName);

if (locationNameArray) {
  normalizeArray(locationNameArray);

  if (locationNameArray.length > 0) {
    where += ''
           + '\n\t AND holdings_ext.permanent_location_name IN (\'' + locationNameArray.join('\',\'') + '\')';
  }
}

var languageArray = JSON.parse(language);

if (languageArray) {
  normalizeArray(languageArray);

  if (languageArray.length > 0) {
    where += ''
          + '\n\t AND lan.language IN (\'' + languageArray.join('\',\'') + '\')';
  }
}

var resourceTypeArray = JSON.parse(resourceType);

if (resourceTypeArray) {
  normalizeArray(resourceTypeArray);

  if (resourceTypeArray.length > 0) {
    where += ''
           + '\n\t AND instance_ext.type_name IN (\'' + resourceTypeArray.join('\',\'') + '\')';
  }
}

var formatArray = JSON.parse(format);

if (formatArray) {
  normalizeArray(formatArray);

  if (formatArray.length > 0) {
    where += ''
          + '\n\t AND formats.format_name IN (\'' + formatArray.join('\',\'') + '\')';
  }
}

if (batchId != '') {
  where += ''
         + '\n\t AND stat_codes.statistical_code_type_name = \'batch_id\''
         + '\n\t AND stat_codes.statistical_code_name = \'' + batchId + '\'';
}

if (issuance != '') {
  where += ''
         + '\n\t AND instance_ext.mode_of_issuance_name = \'' + issuance + '\'';
}

if (suppressInstance) {
  where += ''
         + '\n\t AND instance_ext.discovery_suppress = ' + suppressInstance;
}

if (suppressHoldings) {
  where += ''
         + '\n\t AND holdings_ext.discovery_suppress = ' + suppressHoldings;
}

if (createdDateStart != '') {
  where += ''
         + '\n\t AND cast(to_timestamp(instance_ext.record_created_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) >= to_date(\'' + createdDateStart + '\', \'YYYY-MM-DD\')';
}

if (createdDateEnd != '') {
  where += ''
         + '\n\t AND cast(to_timestamp(instance_ext.record_created_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) <= to_date(\'' + createdDateEnd + '\', \'YYYY-MM-DD\')';
}

if (updatedDateStart != '') {
  where += ''
         + '\n\t AND cast(to_timestamp(instance_ext.updated_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) >= to_date(\'' + updatedDateStart + '\', \'YYYY-MM-DD\')';
}

if (updatedDateEnd != '') {
  where += ''
         + '\n\t AND cast(to_timestamp(instance_ext.updated_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) <= to_date(\'' + updatedDateEnd + '\', \'YYYY-MM-DD\')';
}

var reportQuery = '\n'
       + '\nSELECT DISTINCT'
       + '\n\tinstance_ext.instance_id AS instance_id,'
       + '\n\tinstance_ext.instance_hrid AS instance_hrid,'
       + '\n\tholdings_hrid,'
       + '\n\tholdings_ext.permanent_location_name AS location,'
       + '\n\tcall_number,'
       + '\n\tcall_number_prefix AS prefix,'
       + '\n\tcall_number_suffix AS suffix,'
       + '\n\tinstance_ext.discovery_suppress AS instance_suppress,'
       + '\n\tholdings_ext.discovery_suppress AS holdings_suppress,'
       + '\n\tcontributor_name,'
       + '\n\tcontributor_primary,'
       + '\n\tsubstr(instance_ext.title,1,60) AS title,'
       + '\n\tinstance_ext.mode_of_issuance_name AS issuance,'
       + '\n\tinstance_ext.type_name AS resource_type,'
       + '\n\tformats.format_name AS format,'
       + '\n\tlan.language AS language,'
       + '\n\tstat_codes.statistical_code_name AS stat_code,'
       + '\n\tpubs.date_of_publication AS pub_date,'
       + '\n\tcast(to_timestamp(instance_ext.record_created_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) AS create_date,'
       + '\n\tcast(to_timestamp(instance_ext.updated_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) AS update_date'
       + '\nFROM ' + from
       + '\nWHERE ' + where
       + '\nORDER BY call_number, contributor_primary DESC\n';

if (logLevel === 'DEBUG') {
  print('\nreportQuery = ' + reportQuery);
}

execution.setVariableLocal('reportQuery', reportQuery);
