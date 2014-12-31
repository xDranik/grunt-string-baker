/*
 * grunt-string-baker
 * https://github.com/xdranik/grunt-string-baker
 *
 * Copyright (c) 2014 Andranik Andy Tonoyan
 * Licensed under the MIT license.
 */

'use strict';

var baker = require('./lib/baker.js');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask(
    'string_baker',
    'The best Grunt plugin ever.',
    function() {
      var files = {
        src: this.data.src,
        dest: this.data.dest,
        dataFiles: this.data.dataFiles
      };
      var replacements = this.data.replacements;
      var options = this.options({
        defaultKeyString: 'KEY'
      });

      baker.validateArguments(files, replacements, options);
      baker.bake(files, replacements, options);
    }
  );
};
