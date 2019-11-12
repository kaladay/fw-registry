SELECT /*+ FIRST_ROWS(1000) */ t.bib_id,
  t.suppress_in_opac,
  'MSDB' AS schema,
  rtrim(MSDB.getBibBlob(t.bib_id)) AS marc_record
FROM MSDB.bib_master t
ORDER BY t.bib_id
;
