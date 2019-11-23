SELECT bh.bib_id,
  'MSDB' AS schema,
  CAST(COLLECT('{"HOLDING_ID":"' || bh.mfhd_id || '","ITEM_ID":"' || hi.item_id || '"}') AS sys.odcivarchar2list) AS holding_items
FROM MSDB.bib_mfhd bh
  INNER JOIN MSDB.mfhd_item hi ON bh.mfhd_id = hi.mfhd_id
GROUP BY bh.bib_id, hi.mfhd_id
;
