returnObj = {
  id: args.folioReference,
  bibId: args.BIB_ID,
  suppressInOpac: args.SUPPRESS_IN_OPAC,
  total: args.TOTAL,
  marc: JSON.parse(scriptEngineUtility.rawMarcToJson(args.MARC_RECORD))
};