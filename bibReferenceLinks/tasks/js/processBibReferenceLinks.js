var bibTypes = {
  AMDB: {
    INSTANCE: {
      id: '43efa217-2d57-4d75-82ef-4372507d0672',
      name: 'BIB_AMDB_INSTANCE'
    },
    SOURCE: {
      id: '96017110-47c5-4d55-8324-7dab1771749b',
      name: 'BIB_AMDB_SOURCE'
    }
  },
  MSDB: {
    INSTANCE: {
      id: 'fb6db4f0-e5c3-483b-a1da-3edbb96dc8e8',
      name: 'BIB_MSDB_INSTANCE'
    },
    SOURCE: {
      id: 'b9f633b3-22e4-4bad-8785-da09d9eaa6c8',
      name: 'BIB_MSDB_SOURCE'
    }
  }
};

var instanceUUID = UUID.randomUUID().toString();
var sourceUUID = UUID.randomUUID().toString();

var bibReferenceLinks = [
  {
    folioReference: sourceUUID,
    externalReference: args.BIB_ID,
    type: bibTypes[args.SCHEMA].SOURCE
  },
  {
    folioReference: instanceUUID,
    externalReference: args.BIB_ID,
    type: bibTypes[args.SCHEMA].INSTANCE
  }
];

var returnObj = bibReferenceLinks;