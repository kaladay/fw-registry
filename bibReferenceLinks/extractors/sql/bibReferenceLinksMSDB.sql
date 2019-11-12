SELECT /*+ FIRST_ROWS(1000) */ t.bib_id,
  t.suppress_in_opac,
  'MSDB' AS schema
FROM MSDB.bib_master t
ORDER BY t.bib_id
;
