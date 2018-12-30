'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Gradstop(options) {
  options = _extends({}, _defaultOptions2.default, options);

  if (options.stops < options.colorArray.length) {
    throw 'Number of stops cannot be less than colorArray.length';
  }
  return this.computeStops(options);
}

// computeStops
Gradstop.prototype.computeStops = function (options) {
  var outputArray = [];

  var init = function init(options) {
    switch (options.inputFormat) {
      case 'hex':
        return (0, _utils.extractHEX)(options.colorArray);
      case 'rgb':
        return (0, _utils.extractRGB)(options.colorArray);
      case 'hsl':
        return (0, _utils.extractHSL)(options.colorArray);
    }
  };

  var stopsGenerator = function stopsGenerator(options) {
    var colorArray = options.colorArray;

    var inc = 1.0 / (options.stops - 1);

    var t = 0;

    for (var i = 0; i < options.stops; i++) {
      if (options.inputFormat === 'hex' || options.inputFormat === 'rgb') {
        var _propBezInterpolate = (0, _utils.propBezInterpolate)(['r', 'g', 'b'], colorArray, t),
            _propBezInterpolate2 = _slicedToArray(_propBezInterpolate, 3),
            r = _propBezInterpolate2[0],
            g = _propBezInterpolate2[1],
            b = _propBezInterpolate2[2];

        outputArray.push((0, _utils.returnRGBStr)([r, g, b]));
      } else if (options.inputFormat === 'hsl') {
        var _propBezInterpolate3 = (0, _utils.propBezInterpolate)(['h', 's', 'l'], colorArray, t),
            _propBezInterpolate4 = _slicedToArray(_propBezInterpolate3, 3),
            h = _propBezInterpolate4[0],
            s = _propBezInterpolate4[1],
            l = _propBezInterpolate4[2];

        outputArray.push((0, _utils.returnHSLStr)([h, s, l]));
      }
      t += inc;
    }
  };
  options.colorArray = init(options);
  stopsGenerator(options);

  return outputArray;
};

// drop new keyword
var gradstop = function gradstop(options) {
  return new Gradstop(options);
};

module.exports = gradstop;