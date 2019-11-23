SELECT bh.bib_id,
  'AMDB' AS schema,
  CAST(COLLECT('{"HOLDING_ID":"' || bh.mfhd_id || '","ITEM_ID":"' || hi.item_id || '"}') AS sys.odcivarchar2list) AS holding_items
FROM AMDB.bib_mfhd bh
  INNER JOIN AMDB.mfhd_item hi ON bh.mfhd_id = hi.mfhd_id
GROUP BY bh.bib_id, hi.mfhd_id
;
