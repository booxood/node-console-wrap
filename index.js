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
      var type = chalk[wrapMap[k]]('['+toUpperCase.call(k)+']');
      var time = chalk.magenta('['+moment().format(format)+']');

      // refer to https://github.com/joyent/node/blob/master/lib/console.js
      if (k === 'log' || k === 'info') {
        process.stdout.write(time);
        process.stdout.write(type);
      } else {
        process.stderr.write(time);
        process.stderr.write(type);
      }

      fn.apply(this, args);
    };
  });
  console.__ts__ = true;
}