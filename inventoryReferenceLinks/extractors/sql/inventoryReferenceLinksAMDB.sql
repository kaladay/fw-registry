WITH bib_item_holdings AS (
  SELECT bh.bib_id,
    bh.mfhd_id,
    mi.item_id
  FROM AMDB.bib_mfhd bh
    LEFT JOIN AMDB.mfhd_item mi ON bh.mfhd_id = mi.mfhd_id
 )
SELECT
  bih.bib_id,
  'AMDB' AS schema,
  CAST(COLLECT(bih.mfhd_id || '::' || bih.item_id) AS sys.odcivarchar2list) AS holding_items
FROM bib_item_holdings bih
GROUP BY bih.bib_id
ORDER BY bih.bib_id
;