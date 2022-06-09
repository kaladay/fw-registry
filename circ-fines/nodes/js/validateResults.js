
feefinesReport = feefinesReport.trim().length === 0 
? "There were no circ fees for this time period."
: feefinesReport;

execution.setVariableLocal('feefinesReport', feefinesReport);
