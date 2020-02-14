WITH
  amdb_bib_holdings_items AS (
    SELECT /*+ PARALLEL */
      b.bib_id,
      bm.mfhd_id,
      mi.item_id
    FROM AMDB.bib_master b
      LEFT JOIN AMDB.bib_mfhd bm ON b.bib_id = bm.bib_id
      LEFT JOIN AMDB.mfhd_item mi ON bm.mfhd_id = mi.mfhd_id
  ),
  amdb_inventory AS (
    SELECT /*+ PARALLEL */
      'AMDB' AS schema,
      bhi.bib_id,
      CAST(COLLECT(bhi.mfhd_id || '::' || bhi.item_id) AS sys.odcivarchar2list) AS holding_items
    FROM amdb_bib_holdings_items bhi
    GROUP BY bhi.bib_id
  ),
  msdb_bib_holdings_items AS (
    SELECT /*+ PARALLEL */
      b.bib_id,
      bm.mfhd_id,
      mi.item_id
    FROM MSDB.bib_master b
      LEFT JOIN MSDB.bib_mfhd bm ON b.bib_id = bm.bib_id
      LEFT JOIN MSDB.mfhd_item mi ON bm.mfhd_id = mi.mfhd_id
  ),
  msdb_inventory AS (
    SELECT /*+ PARALLEL */
      'MSDB' AS schema,
      bhi.bib_id,
      CAST(COLLECT(bhi.mfhd_id || '::' || bhi.item_id) AS sys.odcivarchar2list) AS holding_items
    FROM msdb_bib_holdings_items bhi
    GROUP BY bhi.bib_id
  )
SELECT * FROM amdb_inventory
UNION ALL
SELECT * FROM msdb_inventory
;