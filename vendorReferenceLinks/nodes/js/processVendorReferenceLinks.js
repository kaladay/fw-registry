var vendorTypes = {
  AMDB: {
    id: '08c7dd18-dbaf-11e9-8a34-2a2ae2dbcce4',
    name: 'VENDOR_AMDB'
  },
  MSDB: {
    id: 'b427aa0a-96f2-4338-8b3c-2ddcdca6cfe4',
    name: 'VENDOR_MSDB'
  }
};

var vendorUUID = UUID.randomUUID().toString();

returnObj = {
  folioReference: vendorUUID,
  externalReference: args.VENDOR_ID,
  type: vendorTypes[args.SCHEMA]
};