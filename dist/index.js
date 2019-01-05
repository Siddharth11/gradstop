'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

var defaultOptions = {
  // input color options: hex, rgb or hsl
  inputFormat: 'hex',
  // number of color stops (cannot be less than colorArray.length)
  stops: 5,
  // input color array
  colorArray: ['#fff', '#000']
};

function gradstop(options) {
  options = _extends({}, defaultOptions, options);
  (0, _utils.handleErrors)(options);
  var stops = (0, _utils.getStops)(options);
  return stops;
}

module.exports = gradstop;