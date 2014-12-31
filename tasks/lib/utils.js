'use strict';

var grunt = require('grunt');
var _ = require('lodash');

exports.expandFilePattern = function(pattern) {
  if (typeof pattern === 'string') {
    pattern = [pattern];
  }

  return grunt.file.expand({filter: 'isFile'}, pattern);
};

/*
  Modified version of https://gist.github.com/penguinboy/762197
  using lodash
*/
exports.flattenObject = function(obj) {
  var result = {};

  _.forOwn(obj, function(srcVal, srcKey) {
    if (typeof srcVal === 'object') {
      var flatObj = exports.flattenObject(srcVal);
      _.forOwn(flatObj, function(flatVal, flatKey) {
        result[srcKey + '.' + flatKey] = flatVal;
      });
    }
    else {
      result[srcKey] = obj[srcKey];
    }
  });

  return result;
};

/*
  Source from:
  developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
*/
exports.escapeRegExp = function(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
