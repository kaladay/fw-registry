var inventoryTypes = {
  AMDB: {
    SOURCE: {
      id: '96017110-47c5-4d55-8324-7dab1771749b',
      name: 'BIB_AMDB_SOURCE'
    },
    INSTANCE: {
      id: '43efa217-2d57-4d75-82ef-4372507d0672',
      name: 'BIB_AMDB_INSTANCE'
    },
    HOLDING: {
      id: '67c65ccb-02b1-4f15-8278-eb5b029cdcd5',
      name: 'HOLDING_AMDB'
    },
    ITEM: {
      id: '53e72510-dc82-4caa-a272-1522cca70bc2',
      name: 'ITEM_AMDB'
    },
    HOLDING_TO_BIB: {
      id: '0ff1680d-caf5-4977-a78f-2a4fd64a2cdc',
      name: 'HOLDING_TO_BIB_AMDB'
    },
    ITEM_TO_HOLDING: {
      id: '492fea54-399a-4822-8d4b-242096c2ab12',
      name: 'ITEM_TO_HOLDING_MSDB'
    }
  },
  MSDB: {
    SOURCE: {
      id: 'b9f633b3-22e4-4bad-8785-da09d9eaa6c8',
      name: 'BIB_MSDB_SOURCE'
    },
    INSTANCE: {
      id: 'fb6db4f0-e5c3-483b-a1da-3edbb96dc8e8',
      name: 'BIB_MSDB_INSTANCE'
    },
    HOLDING: {
      id: 'e7fbdcf5-8fb0-417e-b477-6ee9d6832f12',
      name: 'HOLDING_MSDB'
    },
    ITEM: {
      id: '0014559d-39f6-45c7-9406-03643459aaf0',
      name: 'ITEM_MSDB'
    },
    HOLDING_TO_BIB: {
      id: 'f8252895-6bf5-4458-8a3f-57bd8c36c6ba',
      name: 'HOLDING_TO_BIB_MSDB'
    },
    ITEM_TO_HOLDING: {
      id: '39670cf7-de23-4473-b5e3-abf6d79735e1',
      name: 'ITEM_TO_HOLDING_AMDB'
    }
  }
};

function createUUIDPair() {
  return {
    RLID: UUID.randomUUID().toString(),
    FID: UUID.randomUUID().toString()
  };
}

var sourceIds = createUUIDPair();
var instanceIds = createUUIDPair();

var inventoryReferenceLinks = [
  {
    id: sourceIds.RLID,
    folioReference: sourceIds.FID,
    externalReference: args.BIB_ID,
    type: inventoryTypes[args.SCHEMA].SOURCE
  },
  {
    id: instanceIds.RLID,
    folioReference: instanceIds.FID,
    externalReference: args.BIB_ID,
    type: inventoryTypes[args.SCHEMA].INSTANCE
  }
];

var holdingItems = args.HOLDING_ITEMS;

var holdingRLID;
var holdingFID;

var holdings = [];

for (var i = 0; i < holdingItems.length; i++) {
  var holdingItem = holdingItems[i].split('::');
  var holdingId = holdingItem[0];
  var itemId = holdingItem[1];

  if (holdings.indexOf(holdingId) === -1) {
    holdingIds = createUUIDPair();
    inventoryReferenceLinks.push({
      id: holdingIds.RLID,
      folioReference: holdingIds.FID,
      externalReference: holdingId,
      type: inventoryTypes[args.SCHEMA].HOLDING
    });

    inventoryReferenceLinks.push({
      folioReference: instanceIds.RLID,
      externalReference: holdingIds.RLID,
      type: inventoryTypes[args.SCHEMA].HOLDING_TO_BIB
    });

    holdings.push(holdingId);
  }

  if (itemId && itemId.length > 0) {
    var itemIds = createUUIDPair();

    inventoryReferenceLinks.push({
      id: itemIds.RLID,
      folioReference: itemIds.FID,
      externalReference: itemId,
      type: inventoryTypes[args.SCHEMA].ITEM
    });

    inventoryReferenceLinks.push({
      folioReference: holdingIds.RLID,
      externalReference: itemIds.RLID,
      type: inventoryTypes[args.SCHEMA].ITEM_TO_HOLDING
    });
  }
}

var returnObj = inventoryReferenceLinks;