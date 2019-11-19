SELECT mi.item_id,
  'AMDB' AS schema,
FROM AMDB.mfhd_item mi
ORDER BY mi.item_id
;
