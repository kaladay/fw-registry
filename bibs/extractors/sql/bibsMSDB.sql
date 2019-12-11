WITH
  total_bibs AS (
    SELECT COUNT(*)
    FROM MSDB.bib_master
  )
SELECT /*+ FIRST_ROWS(1000) */ t.bib_id,
  t.suppress_in_opac,
  'BIB_MSDB_INSTANCE' AS instance_schema,
  'BIB_MSDB_SOURCE' AS source_schema,
  MSDB.getBibBlob(t.bib_id) AS marc_record,
  (SELECT * FROM total_bibs) AS bib_total
FROM MSDB.bib_master t
ORDER BY t.bib_id
;
