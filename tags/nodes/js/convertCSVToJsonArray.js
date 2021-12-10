var lines = tagsCSV.split('\n');
var tags = [];
var headers = lines[0].split(',');

if (logLevel === "DEBUG") {
    print('\nlines = ' + lines + '\n');
}

for (var i = 1; i < lines.length; i++) {
    if(!lines[i]) {
        continue;
    }
    var tagName;
    var currentline = lines[i].split(',');

    for (var j = 0; j < headers.length; j++) {
        if(headers[j] === "Tag Name") {
            tagName = currentline[j];
        }
    }

    if(!!tagName) {
        tags.push({
            label: tagName
        });
    } else {
        if (logLevel === "DEBUG") {
            print('\n Tag label not found \n');
        }
    }
}

if (logLevel === "DEBUG") {
    print('\ntags = ' + JSON.stringify(tags) + '\n');
}

execution.setVariable('tags', S(JSON.stringify(tags)));
