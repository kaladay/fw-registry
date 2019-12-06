WITH bib_holdings_items AS (
  SELECT
    bm.bib_id,
    bm.mfhd_id,
    mi.item_id
  FROM AMDB.bib_mfhd bm
    LEFT JOIN AMDB.mfhd_item mi ON bm.mfhd_id = mi.mfhd_id
 )
SELECT
  bhi.bib_id,
  'AMDB' AS schema,
  CAST(COLLECT(bhi.mfhd_id || '::' || bhi.item_id) AS sys.odcivarchar2list) AS holding_items
FROM bib_holdings_items bhi
GROUP BY bhi.bib_id
ORDER BY bhi.bib_id
;