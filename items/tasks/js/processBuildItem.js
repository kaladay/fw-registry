var buildHolding = function (sourceData, data) {
  data.id = sourceData.folioReference;
  data.holdingId = sourceData.reference;

  return data;
};

returnObj = buildHolding(args.sourceData, args.holding);
