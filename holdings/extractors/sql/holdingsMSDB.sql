WITH
  one_holding_to_many_bibs AS (
    SELECT mm.mfhd_id,
      mm.suppress_in_opac,
      mm.location_id,
      mm.display_call_no,
      mm.call_no_type,
      mm.record_type,
      mm.field_008,
      bm.bib_id,
      COUNT(*) OVER (PARTITION BY bm.bib_id) AS total
    FROM MSDB.mfhd_master mm
      INNER JOIN MSDB.bib_mfhd bm ON mm.mfhd_id = bm.mfhd_id
  )
SELECT /*+ FIRST_ROWS(1000) */ hb.bib_id,
  hb.mfhd_id,
  hb.suppress_in_opac,
  hb.location_id,
  hb.display_call_no,
  DECODE (
    hb.call_no_type,
    ' ', '24badefa-4456-40c5-845c-3f45ffbc4c03',
    '0', '95467209-6d7b-468b-94df-0f5d7ad2747d',
    '1', '03dd64d0-5626-4ecd-8ece-4531e0069f35',
    '2', '054d460d-d6b9-4469-9e37-7a78a2266655',
    '3', 'fc388041-6cd0-4806-8a74-ebe3b9ab4c6e',
    '4', '28927d76-e097-4f63-8510-e56f2b7a3ad0',
    '5', '5ba6b62e-6858-490a-8102-5b1369873835',
    '6', 'cd70562c-dd0b-42f6-aa80-ce803d24d4a1',
    '8', '6caca63e-5651-4db6-9247-3205156e9699'
  ) AS call_no_type,
  DECODE (
    hb.record_type,
    'u', '61155a36-148b-4664-bb7f-64ad708e0b32',
    'v', 'dc35d0ae-e877-488b-8e97-6e41444e6d0a',
    'x', '03c9c400-b9e3-4a07-ac0e-05ab470233ed',
    'y', 'e6da6c98-6dd0-41bc-8b4b-cfd4bbd9c3ae'
  ) AS record_type,
  DECODE (
    SUBSTR(hb.field_008, 7, 1),
    '0', 'Unknown',
    '1', 'Other receipt or acquisition status',
    '2', 'Received and complete or ceased',
    '3', 'On order',
    '4', 'Currently received',
    '5', 'Not currently received',
    ' ', 'Unknown',
    '|', 'Unknown'
  ) AS receipt_status,
  DECODE (
    SUBSTR(hb.field_008, 8, 1),
    'c', 'Cooperative or consortial purchase',
    'd', 'Deposit',
    'e', 'Exchange',
    'f', 'Free',
    'g', 'Gift',
    'l', 'Legal deposit',
    'm', 'Membership',
    'n', 'Non-library purchase',
    'p', 'Purchase',
    'q', 'Lease',
    'u', 'Unknown',
    'z', 'Other method of acquisition',
    '|', 'Unknown'
  ) AS acq_method,
  DECODE (
    SUBSTR(hb.field_008, 13, 1),
    ' ', 'Unknown',
    '|', 'Unknown',
    '0', 'Unknown',
    '1', 'Other general retention policy',
    '2', 'Retained except as replaced by updates',
    '3', 'Sample issue retained',
    '4', 'Retained until replaced by microform',
    '5', 'Retained until replaced by cumulation, replacement volume, or revision',
    '6', 'Retained for a limited period',
    '7', 'Not retained',
    '8', 'Permanently retained'
  ) AS retention_policy,
  'MSDB' AS schema
FROM one_holding_to_many_bibs hb
WHERE hb.total = 1
ORDER BY hb.mfhd_id
;
