var isActive = function (expireDateString) {
  var todayDate = new Date();
  var year = expireDateString.substring(0, 4);
  var month = expireDateString.substring(4, 6);
  var day = expireDateString.substring(6, 8);
  var expireDate = new Date(year, month, day);
  if (expireDate - todayDate > 0) {
    return 'true';
  } else {
    return 'false';
  }
};

args.userRequestBody.id = args.sourceData.id;
args.userRequestBody.username = args.sourceData.netid ? args.sourceData.netid : args.sourceData.SCHEMA + '_' + args.sourceData.ID;
args.userRequestBody.externalSystemId = args.sourceData.EXTERNAL_SYSTEM_ID;
args.userRequestBody.barcode = args.sourceData.PATRON_BARCODE;

if (args.sourceData.ACTIVE_DATE) {
  args.userRequestBody.expirationDate = args.sourceData.EXPIRE_DATE;
  args.userRequestBody.active = isActive(args.sourceData.ACTIVE_DATE);
} else {
  args.userRequestBody.active = 'true';
}

args.userRequestBody.type = 'patron';
args.userRequestBody.personal.lastName = args.sourceData.LAST_NAME;
if (args.sourceData.FIRST_NAME) {
  args.userRequestBody.personal.firstName = args.sourceData.FIRST_NAME;
}

if (args.sourceData.MIDDLE_NAME) {
  args.userRequestBody.personal.middleName = args.sourceData.MIDDLE_NAME;
}

if (args.sourceData.EMAIL) {
  args.userRequestBody.personal.email = args.sourceData.EMAIL;
}

if (args.sourceData.PHONE_NUMBER) {
  var argKeys = Object.keys(args.sourceData.PHONE_NUMBER);

  for (var i = 0; i < argKeys.length; i++) {
    var key = argKeys[i];
    if (args.sourceData.PHONE_TYPE && args.sourceData.PHONE_TYPE[key] != null) {
      if (args.sourceData.PHONE_TYPE[key] != null && args.userRequestBody.personal.phone == null && args.sourceData.PHONE_TYPE[key] == 1) {
        args.userRequestBody.personal.phone = args.sourceData.PHONE_NUMBER[key];
      } else if (args.sourceData.PHONE_TYPE[key] != null && !args.userRequestBody.personal.mobilePhone == null && args.sourceData.PHONE_TYPE[key] == 2) {
        args.userRequestBody.personal.mobilePhone = args.sourceData.PHONE_NUMBER[key];
      }
    }
  }
}
returnObj = args;