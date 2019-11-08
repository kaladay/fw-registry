if(args.sourceData.ADDRESS_ID) {
  var addressFieldMap = {addressLine1:'ADDRESS_LINE1',addressLine2:'ADDRESS_LINE2',city:'CITY',stateRegion:'STATE_PROVINCE',zipCode:'ZIP_POSTAL',country:'COUNTRY',addressTypeId:'ADDRESS_DESC'};
  var addressKeys = Object.keys(addressFieldMap);

  for(var i=0;i<args.sourceData.ADDRESS_ID.length;i++) {
    var currentAddressId = args.sourceData.ADDRESS_ID[i];
    if (currentAddressId !== '') {
      var addressData = {};
      for(var j=0;j<addressKeys.length;j++) {
        var destKey = addressKeys[j];
        var sourceKey = addressFieldMap[destKey];
        if (args.sourceData[sourceKey]) {
          if (args.sourceData[sourceKey][currentAddressId] != null) {
            addressData[destKey] = args.sourceData[sourceKey][currentAddressId];
          }
        }
      }
      args.userRequestBody.personal.addresses.push(addressData);
    }
  }
}
returnObj = args;