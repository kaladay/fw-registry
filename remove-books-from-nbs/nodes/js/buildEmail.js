var itemsRemoved = JSON.parse(itemsToRemove);

var emailSubject = 'Items removed from new bookshelf';
var emailMarkup = '<p>A total of <strong>' + itemsRemoved.length + '</strong> items have been successfully processed.</p>\n';
var emailText = '';

emailMarkup += '<p>';
for (var i = 0; i < itemsRemoved.length; ++i) {
  var item = itemsRemoved[i];
  emailMarkup += '<p>Item: ' + item.title + '</p>';
  emailMarkup += '<ul>';
  emailMarkup += '<li>\tid: ' + item.id + '</li>';
  emailMarkup += '<li>\thrid: ' + item.hrid + '</li>';
  emailMarkup += '<li>\tbarcode: ' + item.barcode + '</li>';
  emailMarkup += '<li>\tcall number: ' + item.callNumber + '</li>';
  emailMarkup += '</ul>';
}
emailMarkup += '</p>';

emailText = emailMarkup.replace(/<\/p>/ig, '\n')
  .replace(/<\/li>/ig, '\n')
  .replace(/<\/ul>/ig, '\n')
  .replace(/<\/[^>]+>/ig, '')
  .replace(/<[^>]+>/ig, '');

emailMarkup = emailMarkup.replace(/\t/ig, '')
  .replace(/\n/ig, '');

if (logLevel === 'INFO' || logLevel === 'DEBUG') {
  print('emailTo = ' + emailTo);

  if (logLevel === 'DEBUG') {
    print('emailSubject = ' + emailSubject);
    print('emailText = ' + emailText);
    print('emailMarkup = ' + emailMarkup);
  }
}

var email = {
  subject: emailSubject,
  text: emailText,
  markup: emailMarkup
};

execution.setVariableLocal('email', S(JSON.stringify(email)));
