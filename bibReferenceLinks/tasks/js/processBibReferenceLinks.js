var bibTypes = {
  BIB_AMDB: '{{mod-external-reference-resolver}}/referenceLinkTypes/43efa217-2d57-4d75-82ef-4372507d0672',
  BIB_MSDB: '{{mod-external-reference-resolver}}/referenceLinkTypes/fb6db4f0-e5c3-483b-a1da-3edbb96dc8e8'
};

var returnObj = {
  folioReference: UUID.randomUUID().toString(),
  externalReference: args.BIB_ID,
  type: bibTypes[args.SCHEMA]
};