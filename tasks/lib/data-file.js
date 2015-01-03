'use strict';

var path = require('path');
var _ = require('lodash');
var parser = require('./parser');
var utils = require('./util');
var DataFile = {};

DataFile.getContext = function(files) {
  var context = DataFile.generateContext(files);
  var flattenedContext = utils.flattenObject(context);

  return flattenedContext;
};

DataFile.generateContext = function(files) {
  var contextList = _.map(files, parser.parse);
  var context = _.merge.apply(null, contextList);

  return context;
};

module.exports = DataFile;
