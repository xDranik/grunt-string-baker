'use strict';

var path = require('path');
var grunt = require('grunt');
var _ = require('lodash');
var utils = require('./util');
var replacementHelper = require('./replacements');
var dataFileHelper = require('./data-file');
var Baker = {};

Baker.bake = function(files, replacements, options) {
  var srcFiles = utils.expandFilePattern(files.src);
  var dest = files.dest;
  var dataFiles = utils.expandFilePattern(files.dataFiles);
  var context = dataFileHelper.getContext(dataFiles);
  var replacementRegExps = replacementHelper.getReplacementRegExps(
    replacements,
    options
  );
  var destinationPath;

  _.forEach(srcFiles, function(srcFile) {
    destinationPath = Baker.getDestinationPath(srcFile, dest);
    grunt.file.copy(srcFile, destinationPath, {
      process: function(text) {
        return _.reduce(replacementRegExps, function(resultText, rRegExp) {
          return resultText.replace(rRegExp, function(match, key) {
            return context[key] || match;
          });
        }, text);
      }
    });
  });
};

Baker.getDestinationPath = function(filepath, dest) {
  if (typeof dest === 'undefined') {
    return filepath;
  }

  var filename = path.basename(filepath);
  return path.join(dest, filename);
};

Baker.validateArguments = function(files, replacements, options) {
  Baker.validateFiles(files);
  Baker.validateReplacements(replacements);
  Baker.validateOptions(options);
};

Baker.validateFiles = function(files) {
  var srcType = typeof files.src;
  var destType = typeof files.dest;
  var dataFilesType = typeof files.dataFiles;

  if (!Array.isArray(files.src) && srcType !== 'string') {
    grunt.fail.warn('src must be a string or array of strings.');
  }
  if (destType !== 'string' && destType !== 'undefined') {
    grunt.fail.warn('dest must be a string or undefined.');
  }
  if (!Array.isArray(files.dataFiles) && dataFilesType !== 'string') {
    grunt.fail.warn('dataFiles must be a string or array of strings.');
  }
};

Baker.validateReplacements = function(replacements) {
  var replacementsType = typeof replacements;

  if (!Array.isArray(replacements) && replacementsType !== 'undefined') {
    grunt.fail.warn('replacements must be an array or undefined');
  }
};

Baker.validateOptions = function(options) {
  var defaultKeyStringType = typeof options.deaultKeyString;

  if (defaultKeyStringType !== 'string' &&
      defaultKeyStringType !== 'undefined') {
    grunt.fail.warn('options.defaultKeyString must be a string or undefined.');
  }
};

module.exports = Baker;
