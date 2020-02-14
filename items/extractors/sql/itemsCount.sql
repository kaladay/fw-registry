SELECT /*+ FIRST_ROWS(1000) */
  item_id,
  copy_number,
  media_type_id,
  pieces,
  price,
  spine_label,
  magnetic_media,
  sensitize
FROM ${SCHEMA}.item
ORDER BY item_id
OFFSET ${OFFSET} ROWS
FETCH NEXT ${LIMIT} ROWS ONLY
;
