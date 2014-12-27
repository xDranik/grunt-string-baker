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
      var extension = path.extename(filePath).substring(1);
      return parsers[extension].parse(filePath);
    });
    var context = _.merge.apply(null, contextList);

    return context;
  };

  /*
    Modified version of https://gist.github.com/penguinboy/762197
  */
  processor._flattenObject = function(ob) {
    var toReturn = {};

    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;

      if ((typeof ob[i]) == 'object') {
        var flatObject = flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  };

  return processor;
};
