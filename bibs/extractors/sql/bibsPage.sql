WITH
  bibs AS (
    SELECT /*+ PARALLEL */
      bib_id,
      suppress_in_opac
    FROM ${SCHEMA}.bib_master
    ORDER BY bib_id
    OFFSET ${OFFSET} ROWS
    FETCH NEXT ${LIMIT} ROWS ONLY
  )
SELECT /*+ FIRST_ROWS(1000) */
  bib_id,
  suppress_in_opac,
  ${SCHEMA}.getBibBlob(bib_id) AS marc
FROM bibs
;