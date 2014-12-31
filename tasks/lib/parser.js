'use strict';

var fs = require('fs');
var path = require('path');
var grunt = require('grunt');
var properties = require('properties');
var parser = {};

parser.js = function(filepath) {
  return require(filepath);
};

parser.json = function(filepath) {
  return grunt.file.readJSON(filepath);
};

parser.properties = function(filepath) {
  var context = {};

  try {
    var fileContents = fs.readFileSync(filepath, 'utf8');
    context = properties.parse(fileContents);
  } catch (err) {
    // log error fail gracefully (return {})
  }

  return context;
};

parser.yaml = function(filepath) {
  return grunt.file.readYAML(filepath);
};

parser.yml = parser.yaml;

exports._parser = parser;

exports.parse = function(filepath) {
  var extension = path.extname(filepath).slice(1);
  return parser[extension](filepath);
};
