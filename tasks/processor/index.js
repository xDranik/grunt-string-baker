'use strict';

var path = require('path');
var _ = require('lodash');

module.exports = function(grunt) {
  var parsers = require('../parsers')(grunt);
  var processor = {};

  processor.processDataFiles = function(files) {
    var context = processor._generateContext(files);
    var flattenedContext = processor._flattenObject(context);

    return flattenedContext;
  };

  processor._generateContext = function(files) {
    var contextList = _.map(files, function(filePath) {
      var extension = path.extname(filePath).substring(1);
      return parsers[extension].parse(filePath);
    });
    var context = _.merge.apply(null, contextList);

    return context;
  };

  /*
    Modified version of https://gist.github.com/penguinboy/762197
    using lodash
  */
  processor._flattenObject = function(srcObj) {
    var result = {};

    _.forOwn(srcObj, function(srcVal, srcKey) {
      if (typeof srcVal === 'object') {
        var flatObj = processor._flattenObject(srcVal);
        _.forOwn(flatObj, function(flatVal, flatKey) {
          result[srcKey + '.' + flatKey] = flatVal;
        });
      }
      else {
        result[srcKey] = srcObj[srcKey];
      }
    });

    return result;
  };

  return processor;
};
