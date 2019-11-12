SELECT /*+ FIRST_ROWS(1000) */ t.bib_id,
  t.suppress_in_opac,
  'AMDB' AS schema
FROM AMDB.bib_master t
ORDER BY t.bib_id
;
