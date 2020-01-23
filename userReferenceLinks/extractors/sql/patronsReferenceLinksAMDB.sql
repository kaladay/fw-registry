SELECT ap.patron_id,
  ap.institution_id,
  NVL2(ap.institution_id, regexp_replace(ap.institution_id, '([[:digit:]]{3})-([[:digit:]]{2})-([[:digit:]]{4})', '\1\2\3'), 'AMDB_' || ap.patron_id) AS external_system_id,
  'AMDB' as schema
FROM AMDB.patron ap
WHERE ap.last_name IS NOT NULL
ORDER BY external_system_id
;