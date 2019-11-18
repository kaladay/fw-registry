SELECT t.bib_id,
  'BIB_AMDB' AS schema
FROM AMDB.bib_master t
ORDER BY t.bib_id
;
