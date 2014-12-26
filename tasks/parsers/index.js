module.exports = function(grunt) {
  var parsers = {};
  parsers.js = require('./js-parser')();
  parsers.json = require('./json-parser')(grunt);
  parsers.yaml = parsers.yml = require('./yaml-parser')(grunt);
  parsers.properties = require('./properties-parser')();

  return parsers;
};
