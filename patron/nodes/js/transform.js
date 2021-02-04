function tranform(patrons) {
  var users = [];
  for (var i = 0; i < patrons.length; i++) {

    var userImport = {
      departments: []
    };
  
    var personal = {
      addresses: []
    };
  
    var patron = patrons[i];
  
    userImport.username = patron.USERNAME;
  
    userImport.externalSystemId = patron.EXTERNALSYSTEMID;
    userImport.barcode = patron.BARCODE;
    userImport.active = patron.ACTIVE;
    userImport.patronGroup = patron.PATRONGROUP;
  
    personal.lastName = patron.PERSONAL_LASTNAME;
    personal.firstName = patron.PERSONAL_FIRSTNAME;
    personal.middleName = patron.PERSONAL_MIDDLENAME;
    personal.email = patron.PERSONAL_EMAIL;
    /* TODO: normalize/format phone number */
    personal.phone = patron.PERSONAL_PHONE;
  
    if (patron.ADDRESSES_PERMANENT_ADDRESSLINE1) {
      var permanentAddress = {};
  
      permanentAddress.AddressTypeId  = patron.ADDRESSES_PERMANENT_ADDRESSTYPEID;
      permanentAddress.CountryId  = patron.ADDRESSES_PERMANENT_COUNTRYID;
      permanentAddress.AddressLine1  = patron.ADDRESSES_PERMANENT_ADDRESSLINE1;
      permanentAddress.AddressLine2  = patron.ADDRESSES_PERMANENT_ADDRESSLINE2;
      permanentAddress.City  = patron.ADDRESSES_PERMANENT_CITY;
      permanentAddress.Region  = patron.ADDRESSES_PERMANENT_REGION;
      /* TODO: normalize/format postal code */
      permanentAddress.PostalCode  = patron.ADDRESSES_PERMANENT_POSTALCODE;
  
      personal.addresses.push(permanentAddress);
    }
  
    if (patron.ADDRESSES_TEMPORARY_ADDRESSLINE1) {
      var temporaryAddress = {};
  
      temporaryAddress.AddressTypeId = patron.ADDRESSES_TEMPORARY_ADDRESSTYPEID;
      temporaryAddress.AddressLine1 = patron.ADDRESSES_TEMPORARY_ADDRESSLINE1;
      temporaryAddress.AddressLine2 = patron.ADDRESSES_TEMPORARY_ADDRESSLINE2;
      temporaryAddress.City = patron.ADDRESSES_TEMPORARY_CITY;
      temporaryAddress.Region = patron.ADDRESSES_TEMPORARY_REGION;
      /* TODO: normalize/format postal code */
      temporaryAddress.PostalCode = patron.ADDRESSES_TEMPORARY_POSTALCODE;
  
      personal.addresses.push(temporaryAddress);
    }
  
    if (patron.DEPARTMENTS_0) {
      /* userImport.departments.push(patron.DEPARTMENTS_0); */
    }
  
    userImport.personal = personal;
  
    users.push(userImport);
  }
  return users;
}

var employees = tranform(JSON.parse(employeePatrons));
var students = tranform(JSON.parse(studentPatrons));
var others = tranform(JSON.parse(otherPatrons));

var users = employees.concat(students).concat(others);

var userImportCollection = {
  users: users,
  totalRecords: users.length,
  deactivateMissingUsers: false,
  updateOnlyPresentFields: true
};

execution.setVariableLocal('userImportCollection', S(JSON.stringify(userImportCollection)));
