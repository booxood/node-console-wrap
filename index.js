/**
 * Module dependencies.
 */

var chalk = require('chalk');
var moment = require('moment');

/**
 * Expose `consoleWrap`.
 */

module.exports = function consoleWrap (timeFormat) {
  if (console.__ts__) return;

  var format = timeFormat || 'YYYY-MM-DD HH:mm:ss';

  var slice = Array.prototype.slice;
  var toUpperCase = String.prototype.toUpperCase;

  var wrapMap = {
    log: 'green',
    info: 'cyan',
    warn: 'yellow',
    error: 'red'
  };

  Object.keys(wrapMap).forEach(function (k) {
    var fn = console[k];
    console[k] = function () {
      var args = slice.call(arguments);
      args.unshift(chalk[wrapMap[k]]('['+toUpperCase.call(k)+']'));
      args.unshift(chalk.magenta('['+moment().format(format)+']'));
      fn.apply(this, args);
    };
  });
  console.__ts__ = true;
}