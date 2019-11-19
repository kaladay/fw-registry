SELECT mi.item_id,
  'MSDB' AS schema
FROM MSDB.mfhd_item mi
ORDER BY mi.item_id
;
