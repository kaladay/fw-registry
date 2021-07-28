var listing = JSON.parse(sfxListing);

var regex = /^.*e-collection-TAMUCS..*$/g;

while (listing.length) {
  var file = listing.pop();
  if (file.match(regex)) {
    execution.setVariableLocal('sfxFile', file);
    break;
  }
}


