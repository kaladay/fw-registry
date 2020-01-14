WITH
  amdb_bib_holdings_items AS (
    SELECT /*+ PARALLEL */
      COUNT(*) AS count
    FROM AMDB.bib_master b
      LEFT JOIN AMDB.bib_mfhd bm ON b.bib_id = bm.bib_id
      LEFT JOIN AMDB.mfhd_item mi ON bm.mfhd_id = mi.mfhd_id
  ),
  msdb_bib_holdings_items AS (
    SELECT /*+ PARALLEL */
      COUNT(*) AS count
    FROM MSDB.bib_master b
      LEFT JOIN MSDB.bib_mfhd bm ON b.bib_id = bm.bib_id
      LEFT JOIN MSDB.mfhd_item mi ON bm.mfhd_id = mi.mfhd_id
  ),
  inventory_count AS (
    SELECT count FROM amdb_bib_holdings_items
    UNION ALL
    SELECT count FROM msdb_bib_holdings_items
  )
SELECT SUM(count) AS total
FROM inventory_count
;