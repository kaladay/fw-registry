print(JSON.stringify(args));
returnObj = {
  recordsMetadata: {
    last: false,
    counter: 1,
    total: 1,
    contentType: "MARC_JSON",
  },
  initialRecords: args.map(function (r) {
    return {
      record: r.marc
    }
  })
};