if (!counter.bibs) {
  counter.bibs = 1;
}

returnObj = {
  id: args.folioReference,
  suppressInOpac: args.SUPPRESS_IN_OPAC,
  bibId: args.BIB_ID,
  bibTotal: args.BIB_TOTAL,
  bibIndex: counter.bibs++,
  marc: JSON.parse(scriptEngineUtility.rawMarcToJson(args.MARC_RECORD))
};