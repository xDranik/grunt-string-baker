'use strict';

module.exports = function(grunt) {
  var parser = {};
  parser.parse = function(filePath) {
    return grunt.file.readYAML(filePath);
  };

  return parser;
};
