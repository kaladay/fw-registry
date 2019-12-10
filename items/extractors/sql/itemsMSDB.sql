WITH
  one_item_to_many_bibs AS (
    SELECT mi.item_id,
      mi.caption,
      mi.chron,
      mi.item_enum,
      mi.freetext,
      mi.year,
      bm.bib_id,
      COUNT(*) OVER (PARTITION BY bm.bib_id) AS total
    FROM MSDB.mfhd_item mi
      INNER JOIN MSDB.mfhd_master mm ON mi.mfhd_id = mm.mfhd_id
      INNER JOIN MSDB.bib_mfhd bm ON mm.mfhd_id = bm.mfhd_id
  ),
  items_with_one_bib AS (
    SELECT ib.item_id,
      ib.caption,
      ib.chron,
      ib.item_enum,
      ib.freetext,
      ib.year,
      ib.bib_id
    FROM one_item_to_many_bibs ib
    WHERE ib.total = 1
  )
SELECT i.item_id
  i.copy_number,
  i.media_type_id,
  i.pieces,
  i.price,
  i.spine_label,
  i.magnetic_media,
  i.sensitize,
  mib.bib_id,
  mib.caption,
  mib.chron,
  mib.item_enum,
  mib.freetext,
  mib.year,
  l_p.location_code AS permloc,
  l_t.location_code AS temploc,
  it_p.item_type_code AS permtype,
  it_t.item_type_code AS temptype,
  ib.item_barcode,
  ib.barcode_status,
  'ITEM_MSDB' AS schema
FROM MSDB.item i
  INNER JOIN MSDB.location l_p ON i.perm_location = l_p.location_id
  LEFT JOIN MSDB.location l_t ON i.temp_location <> 0 AND i.temp_location = l_t.location_id
  INNER JOIN MSDB.item_type it_p ON i.item_type_id = it_p.item_type_id
  LEFT JOIN MSDB.item_type it_t ON i.temp_item_type_id <> 0 AND i.temp_item_type_id = it_t.item_type_id
  LEFT JOIN MSDB.item_barcode ib ON ib.barcode_status = '1' AND i.item_id = ib.item_id
  INNER JOIN items_with_one_bib mib ON i.item_id = mib.item_id
ORDER BY mib.bib_id
;
