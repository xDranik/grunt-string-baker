'use strict';

var fs = require('fs');
var properties = require('properties');

module.exports = function() {
  var parser = {};
  parser.parse = function(filePath) {
    var context = {};

    try {
      var fileContents = fs.readFileSync(filePath, 'utf8');
      context = properties.parse(fileContents);
    } catch (err) {
      // log error fail gracefully (return {})
    }

    return context;
  };

  return parser;
};
