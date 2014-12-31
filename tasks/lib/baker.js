// just move all this to tasks/string-baker.js
'use strict';

var path = require('path');
var grunt = require('grunt');
var _ = require('lodash');
var utils = require('./utils');
var replacementHelper = require('./helpers/replacement');
var dataFileHelper = require('./helpers/data-file');

exports.bake = function(files, replacements, options) {
  var srcFiles = utils.expandFilePattern(files.src);
  var dest = files.dest;
  var dataFiles = utils.expandFilePattern(files.dataFiles);
  var context = dataFileHelper.getContext(dataFiles);
  var replacementRegExp = replacementHelper.getRegExp(replacements, options);
  var destinationPath;

  _.forEach(srcFiles, function(srcFile) {
    destinationPath = exports.getDestinationPath(srcFile, dest);
    grunt.file.copy(srcFile, destinationPath, function(text) {
      return text.replace(replacementRegExp, function(match, key) {
        return context[key] || match;
      });
    });
  });
};

exports.getDestinationPath = function(filepath, dest) {
  if (typeof dest === 'undefined') {
    return filepath;
  }

  var filename = path.basename(filepath);
  return path.join(dest, filename);
};

exports.validateArguments = function(files, replacements, options) {
  exports.validateFiles(files);
  exports.validateReplacements(replacements);
  exports.validateOptions(options);
};

exports.validateFiles = function(files) {
  var srcType = typeof files.src;
  var destType = typeof files.dest;
  var dataFilesType = typeof files.destFiles;

  if (!Array.isArray(files.src) && srcType !== 'string') {
    grunt.fail.warn('src must be a string or array of strings.');
  }
  if (destType !== 'string' && destType !== 'undefined') {
    grunt.fail.warn('dest must be a string or undefined.');
  }
  if (!Array.isArray(files.destFiles) && dataFilesType !== 'string') {
    grunt.fail.warn('destFiles must be a string or array of strings.');
  }
};

exports.validateReplacements = function(replacements) {
  var replacementsType = typeof replacements;

  if (!Array.isArray(replacements) && replacementsType !== 'undefined') {
    grunt.fail.warn('replacements must be an array or undefined');
  }
};

exports.validateOptions = function(options) {
  var defaultKeyStringType = typeof options.deaultKeyString;

  if (defaultKeyStringType !== 'string' &&
      defaultKeyStringType !== 'undefined') {
    grunt.fail.warn('options.defaultKeyString must be a string or undefined.');
  }
};
