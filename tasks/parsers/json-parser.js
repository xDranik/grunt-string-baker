module.exports = function(grunt) {
  var parser = {};
  parser.parse = function(filePath) {
    return grunt.file.readJSON(filePath);
  };

  return parser;
};
