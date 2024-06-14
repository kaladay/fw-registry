require 'json'

exampleQuery = <<-SQL
SELECT item_id, item_hrid, accession_number, barcode 
FROM folio_reporting.item_ext ie 
WHERE ie.status_name = 'Checked out' 
ORDER BY ie.effective_call_number
SQL

  # query_wrapper = {
  #   sql: exampleQuery
  # }

  # execution.setVariableLocal('exampleQuery', query_wrapper.to_json)
  execution.setVariable('exampleQuery', S(exampleQuery))

  puts 'exampleQuery content ->>>>>>>>>>>>>>>>>>>>>>>>>>>: ' + S(execution.getVariable('exampleQuery')).toString()
