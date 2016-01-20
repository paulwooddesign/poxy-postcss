// Module dependencies
var postcss = require('postcss');
var assign = require('object-assign');

// Poxy At Rules and Declarations
var libs = [
  require('./lib/poxy-cw'),
  require('./lib/poxy-x'),
  require('./lib/poxy-y')
];

var defaultSettings = {
  gutter: '20px',
  flexbox: 'no-flex',
  cycle: 'auto'
};

module.exports = postcss.plugin('poxy', function poxy(settings) {
  settings = assign(defaultSettings, settings || {});

  return function (css) {
    libs.forEach(function(lib) {
      lib(css, settings);
    });
  };
});
