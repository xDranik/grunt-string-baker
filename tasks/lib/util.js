'use strict';

var grunt = require('grunt');
var _ = require('lodash');
var Util = {};

Util.expandFilePattern = function(pattern) {
  return grunt.file.expand({filter: 'isFile'}, pattern);
};

/*
  Modified version of https://gist.github.com/penguinboy/762197
  using lodash
*/
Util.flattenObject = function(obj) {
  var result = {};

  _.forOwn(obj, function(srcVal, srcKey) {
    if (typeof srcVal === 'object') {
      var flatObj = Util.flattenObject(srcVal);
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
Util.escapeRegExp = function(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = Util;
