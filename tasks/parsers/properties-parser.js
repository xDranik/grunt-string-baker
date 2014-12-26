var fs = require('fs');
var properties = require('properties');

module.exports = function() {
  var parser = {};
  parser.parse = function(filePath) {
    var fileContents = fs.readFileSync(filePath, 'utf8');
    var context = properties.parse(fileContents);

    return context;
  };

  return parser;
};
