'use strict';

var grunt = require('grunt');
var _ = require('lodash');
// if dest isn't defined, overwrite

var defaultReplacements = [
  {
    pattern: '{KEY}',
    keyString: 'KEY'
  }
];

exports.bake = function(files, replacements, options) {
  // validate before running task

  var src = expandFilePattern(files.src);
  var data = expandFilePattern(files.dataFiles);
  replacements = processReplacements(replacements, options);
  var replacementRegexp = buildReplacementRegExp(replacements);

};

function expandFilePattern(pattern) {
  if (typeof pattern === 'string') {
    pattern = [pattern];
  }

  return grunt.file.expand({filter: 'isFile'}, pattern);
}

function processReplacements(replacements, options) {
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
  var processedReplacement = _.map(replacements, function(r) {
    if (typeof r.keyString === 'undefined') {
      r.keyString = defaultKeyString;
    }

    return r;
  });

  return processedReplacement;
}

function buildReplacementRegExp(replacements) {
  var pattern;
  var keyStringPattern = '[a-z0-9]+(\\.[a-z0-9]+)*';
  var replacementPattern = _.map(replacements, function(r) {
    // might fail for keyString's that include regexp symbols
    pattern = escapeRegExp(r.pattern)
      .replace(r.keyString, keyStringPattern);
    return '(' + pattern + ')';
  }).join('|');
  replacementPattern = '^' + replacementPattern + '$';

  return new RegExp(replacementPattern, 'gi');
}

/*
  Source from:
  developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
*/
function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}



