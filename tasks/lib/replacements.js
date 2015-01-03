'use strict';

var _ = require('lodash');
var utils = require('./util');
var Replacements = {};


Replacements.getReplacementRegExps = function(replacements, options) {
  if (typeof replacements === 'undefined') {
    /* default replacements */
    replacements = [
      {
        pattern: '{KEY}',
        keyString: 'KEY'
      }
    ];
  }

  var defaultKeyString = options.defaultKeyString;
  var replacementRegExps = _.map(replacements, function(r) {
    if (typeof r.keyString === 'undefined') {
      r.keyString = defaultKeyString;
    }

    return Replacements.buildRegExp(r);
  });

  return replacementRegExps;
};

Replacements.buildRegExp = function(replacement) {
  var keyStringPattern = '([a-z0-9_]+(\\.[a-z0-9_]+)*)';
  var replacementPattern = utils.escapeRegExp(replacement.pattern)
    .replace(replacement.keyString, keyStringPattern);

  return new RegExp(replacementPattern, 'gi');
};

module.exports = Replacements;
