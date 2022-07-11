var itemHistory = JSON.parse(itemHistoryResults);
var sql = "INSERT INTO mis.item_history (item_id, hist_charges, hist_browses, last_transaction) \nVALUES";

for(var i = 0; i < itemHistory.length; i++) {
    var result = itemHistory[i];
    var charges = !!result.hist_charges ? Number(result.hist_charges) + Number(result.new_charges) : Number(result.new_charges);
    var browses = !!result.hist_browses ? Number(result.hist_browses) + Number(result.new_browses) : Number(result.new_browses);
    sql += '\n\t(\"'+ result.item_id +'\", '+ charges +', '+ browses +', \"'+ result.new_date +'\")';
    if(i < itemHistory.length - 1) {
        sql += ",";
    }

}

sql += '\nON CONFLICT (item_id)'
    + '\nDO UPDATE SET'
    + '\n\thist_charges = EXCLUDED.hist_charges,' 
    + '\n\thist_browses = EXCLUDED.hist_browses,' 
    + '\n\tlast_transaction = EXCLUDED.last_transaction';

var upsertQuery = {
    "sql": sql
};

execution.setVariableLocal('upsertQuery', S(JSON.stringify(upsertQuery)));
