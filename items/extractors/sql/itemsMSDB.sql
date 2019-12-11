WITH
  item_status_with_desc AS (
    SELECT
      istat.item_id,
      istat.item_status,
      istat.item_status_date,
      itype.item_status_desc
    FROM MSDB.item_status istat
      LEFT JOIN MSDB.item_status_type itype ON istat.item_status = itype.item_status_type
  ),
  item_with_statuses AS (
    SELECT
      iswd.item_id,
      CAST(COLLECT(iswd.item_status || '::' || iswd.item_status_desc || '::' || iswd.item_status_date
      ORDER BY
        case
          when iswd.item_status_desc ='Charged'                         then '01'
          when iswd.item_status_desc ='Renewed'                         then '02'
          when iswd.item_status_desc ='Overdue'                         then '03'
          when iswd.item_status_desc ='Recall Request'                  then '04'
          when iswd.item_status_desc ='Hold Request'                    then '05'
          when iswd.item_status_desc ='On Hold'                         then '06'
          when iswd.item_status_desc ='Missing'                         then '07'
          when iswd.item_status_desc ='Lost--Library Applied'           then '08'
          when iswd.item_status_desc ='Lost--System Applied'            then '09'
          when iswd.item_status_desc ='In Transit'                      then '10'
          when iswd.item_status_desc ='In Transit Discharged'           then '11'
          when iswd.item_status_desc ='In Transit On Hold'              then '12'
          when iswd.item_status_desc ='Withdrawn'                       then '13'
          when iswd.item_status_desc ='Discharged'                      then '14'
          when iswd.item_status_desc ='Not Charged'                     then '15'
          when iswd.item_status_desc ='Claims Returned'                 then '16'
          when iswd.item_status_desc ='Damaged'                         then '17'
          when iswd.item_status_desc ='At Bindery'                      then '18'
          when iswd.item_status_desc ='Cataloging Review'               then '19'
          when iswd.item_status_desc ='Circulation Review'              then '20'
          when iswd.item_status_desc ='Scheduled'                       then '21'
          when iswd.item_status_desc ='In Process'                      then '22'
          when iswd.item_status_desc ='Call Slip Request'               then '23'
          when iswd.item_status_desc ='Short Loan Request'              then '24'
          when iswd.item_status_desc ='Remote Storage Request'          then '25'
        end
      ) AS sys.odcivarchar2list) AS item_statuses
    FROM item_status_with_desc iswd
    GROUP BY iswd.item_id
  )
SELECT
  i.item_id,
  i.copy_number,
  i.media_type_id,
  i.pieces,
  i.price,
  i.spine_label,
  i.magnetic_media,
  i.sensitize,
  iws.item_statuses,
  mi.caption,
  mi.chron,
  mi.item_enum,
  mi.freetext,
  mi.year,
  l_p.location_code AS permloc,
  l_t.location_code AS temploc,
  it_p.item_type_code AS permtype,
  it_t.item_type_code AS temptype,
  ib.item_barcode,
  ib.barcode_status,
  'ITEM_MSDB' AS schema
FROM MSDB.item i
  INNER JOIN item_with_statuses iws ON i.item_id = iws.item_id
  INNER JOIN MSDB.mfhd_item mi ON i.item_id = mi.item_id
  INNER JOIN MSDB.location l_p ON i.perm_location = l_p.location_id
  LEFT JOIN MSDB.location l_t ON i.temp_location <> 0 AND i.temp_location = l_t.location_id
  INNER JOIN MSDB.item_type it_p ON i.item_type_id = it_p.item_type_id
  LEFT JOIN MSDB.item_type it_t ON i.temp_item_type_id <> 0 AND i.temp_item_type_id = it_t.item_type_id
  LEFT JOIN MSDB.item_barcode ib ON ib.barcode_status = '1' AND i.item_id = ib.item_id
ORDER BY i.item_id
FETCH NEXT 10 ROWS ONLY
;
