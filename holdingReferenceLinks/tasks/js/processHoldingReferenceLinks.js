var holdingTypes = {
  AMDB: '{{mod-external-reference-resolver}}/referenceLinkTypes/67c65ccb-02b1-4f15-8278-eb5b029cdcd5',
  MSDB: '{{mod-external-reference-resolver}}/referenceLinkTypes/e7fbdcf5-8fb0-417e-b477-6ee9d6832f12'
};

var holdingUUID = UUID.randomUUID().toString();

var returnObj = {
  folioReference: holdingUUID,
  externalReference: args.MFHD_ID,
  type: holdingTypes[args.SCHEMA]
};