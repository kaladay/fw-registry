SELECT v.vendor_id,
  'AMDB' AS schema
FROM AMDB.vendor v
UNION ALL
SELECT v.vendor_id,
  'MSDB' AS schema
FROM MSDB.vendor v
;