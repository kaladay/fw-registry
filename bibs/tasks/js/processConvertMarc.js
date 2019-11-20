returnObj = {
  id: args.folioReference,
  suppressInOpac: args.SUPPRESS_IN_OPAC,
  bibId: args.BIB_ID,
  bibTotal: args.BIB_TOTAL,
  bibIndex: args.BIB_INDEX,
  marc: JSON.parse(scriptEngineUtility.rawMarcToJson(args.MARC_RECORD))
};