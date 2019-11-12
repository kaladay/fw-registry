SELECT t.bib_id,
  'MSDB' AS schema
FROM MSDB.bib_master t
ORDER BY t.bib_id
;
