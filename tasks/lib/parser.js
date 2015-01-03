'use strict';

var fs = require('fs');
var path = require('path');
var grunt = require('grunt');
var properties = require('properties');
var Parser = {};

Parser.js = function(filepath) {
  return require(path.resolve(filepath));
};

Parser.json = function(filepath) {
  return grunt.file.readJSON(filepath);
};

Parser.properties = function(filepath) {
  var context = {};
  var fileContents = fs.readFileSync(filepath, 'utf8');

  try {
    context = properties.parse(fileContents);
  } catch (err) {
    grunt.fail.warn('Failed to parse ' + filepath + '. Error:' + err);
  }

  return context;
};

Parser.yaml = function(filepath) {
  return grunt.file.readYAML(filepath);
};

Parser.yml = Parser.yaml;

Parser.parse = function(filepath) {
  var extension = path.extname(filepath).slice(1);
  return Parser[extension](filepath);
};

module.exports = Parser;
