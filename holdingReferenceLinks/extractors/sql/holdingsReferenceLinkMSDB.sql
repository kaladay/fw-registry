SELECT mm.mfhd_id,
  'MSDB' AS schema,
FROM MSDB.mfhd_master mm
ORDER BY mm.mfhd_id
;
