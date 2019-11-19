var itemTypes = {
  AMDB: {
    id: "53e72510-dc82-4caa-a272-1522cca70bc2",
    name: "ITEM_AMDB"
  },
  MSDB: {
    id: "0014559d-39f6-45c7-9406-03643459aaf0",
    name: "ITEM_MSDB"
  }
};

var itemUUID = UUID.randomUUID().toString();

var returnObj = {
  folioReference: itemUUID,
  externalReference: args.ITEM_ID,
  type: itemTypes[args.SCHEMA]
};