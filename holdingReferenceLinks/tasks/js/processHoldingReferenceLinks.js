var holdingTypes = {
  AMDB: {
    id: "67c65ccb-02b1-4f15-8278-eb5b029cdcd5",
    name: "HOLDING_AMDB"
  },
  MSDB: {
    id: "e7fbdcf5-8fb0-417e-b477-6ee9d6832f12",
    name: "HOLDING_MSDB"
  }
};

var holdingUUID = UUID.randomUUID().toString();

var returnObj = {
  folioReference: holdingUUID,
  externalReference: args.MFHD_ID,
  type: holdingTypes[args.SCHEMA]
};