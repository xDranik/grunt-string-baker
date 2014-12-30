'use strict';

var path = require('path');
var _ = require('lodash');
var parser = require('../parser');
var dataProcessor = {};

dataProcessor.processDataFiles = function(files) {
  var context = dataProcessor._generateContext(files);
  var flattenedContext = dataProcessor._flattenObject(context);

  return flattenedContext;
};

dataProcessor._generateContext = function(files) {
  var contextList = _.map(files, parser.parse);
  var context = _.merge.apply(null, contextList);

  return context;
};

/*
  Modified version of https://gist.github.com/penguinboy/762197
  using lodash
*/
dataProcessor._flattenObject = function(srcObj) {
  var result = {};

  _.forOwn(srcObj, function(srcVal, srcKey) {
    if (typeof srcVal === 'object') {
      var flatObj = dataProcessor._flattenObject(srcVal);
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

module.exports = dataProcessor;
