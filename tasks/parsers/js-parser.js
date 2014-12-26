module.exports = function() {
  var parser = {};
  parser.parse = function(filePath) {
    return require(filePath);
  };

  return parser;
};
