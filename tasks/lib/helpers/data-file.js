'use strict';

var path = require('path');
var _ = require('lodash');
var parser = require('../parser');
var utils = require('../utils');

exports.getContext = function(files) {
  var context = exports.generateContext(files);
  var flattenedContext = utils.flattenObject(context);

  return flattenedContext;
};

exports.generateContext = function(files) {
  var contextList = _.map(files, parser.parse);
  var context = _.merge.apply(null, contextList);

  return context;
};
