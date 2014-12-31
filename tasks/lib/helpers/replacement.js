'use strict';

var _ = require('lodash');
var utils = require('../utils');

exports.getRegExp = function(replacements, options) {
  var preparedReplacements = exports._prepareReplacements(
    replacements,
    options
  );
  var replacementRegExp = exports._buildRegExp(preparedReplacements);

  return replacementRegExp;
};

exports.prepareReplacements = function(replacements, options) {
  if (typeof replacements === 'undefined') {
    /* default replacements */
    return [
      {
        pattern: '{KEY}',
        keyString: 'KEY'
      }
    ];
  }

  var defaultKeyString = options.defaultKeyString;
  var preparedReplacements = _.map(replacements, function(r) {
    if (typeof r.keyString === 'undefined') {
      r.keyString = defaultKeyString;
    }

    return r;
  });

  return preparedReplacements;
};

exports.buildRegExp = function(replacements) {
  var pattern;
  var keyStringPattern = '([a-z0-9]+(\\.[a-z0-9]+)*)';
  var replacementPattern = _.map(replacements, function(r) {
    // might fail for keyString's that include regexp symbols
    pattern = utils.escapeRegExp(r.pattern)
      .replace(r.keyString, keyStringPattern);
    return pattern;
  }).join('|');
  replacementPattern = '^' + replacementPattern + '$';

  return new RegExp(replacementPattern, 'gi');
};
