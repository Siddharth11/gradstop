(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gradstop = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaultOptions = {
    // input color options: hex, rgb or hsl
    inputFormat: 'hex',
    // number of color stops (cannot be less than colorArray.length)
    stops: 5,
    // input color array
    colorArray: ['#fff', '#000']
};

exports.default = defaultOptions;

},{}],2:[function(require,module,exports){
'use strict';

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _utils = require('./utils');

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
        var _propBezInterpolate = (0, _utils.propBezInterpolate)(['r', 'g', 'b'])(colorArray)(t),
            _propBezInterpolate2 = _slicedToArray(_propBezInterpolate, 3),
            r = _propBezInterpolate2[0],
            g = _propBezInterpolate2[1],
            b = _propBezInterpolate2[2];

        outputArray.push((0, _utils.returnRGBStr)([r, g, b]));
      } else if (options.inputFormat === 'hsl') {
        var _propBezInterpolate3 = (0, _utils.propBezInterpolate)(['h', 's', 'l'])(colorArray)(t),
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

},{"./defaultOptions":1,"./utils":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var mathTrunc = function () {
  if (Math.trunc) {
    return Math.trunc;
  }
  return function (x) {
    return x === 0 ? x : x < 0 ? Math.ceil(x) : Math.floor(x);
  };
}();

var hexToRgb = function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
      _result$map = result.map(function (val) {
    return parseInt(val, 16);
  }),
      _result$map2 = _slicedToArray(_result$map, 4),
      r = _result$map2[1],
      g = _result$map2[2],
      b = _result$map2[3];

  return result ? { r: r, g: g, b: b } : null;
};

var splitSliceJoin = function splitSliceJoin(string, start, end) {
  return string.split('').slice(start, end).join('');
};

// if hex and defined as #fff then convert it to standard 7 letter format #ffffff
var fixedHexFormat = function fixedHexFormat(arr) {
  return arr.map(function (c) {
    if (c.length === 4) {
      return '#' + (c[1] + c[1] + c[2] + c[2] + c[3] + c[3]);
    } else if (c.length === 7) {
      return c;
    }
  });
};

// get r,g,b,h,s and l with Bezier interpolation
// https://www.cl.cam.ac.uk/teaching/2000/AGraphHCI/SMEG/node3.html
// Check issue #3 for more info
var propBezInterpolate = exports.propBezInterpolate = function propBezInterpolate(charArr) {
  return function (colArr) {
    return function (x) {
      var y = 1 - x;
      var v = void 0;
      return charArr.map(function (c) {
        if (colArr.length === 2) {
          v = y * colArr[0][c] + x * colArr[1][c];
        } else if (colArr.length === 3) {
          v = Math.pow(y, 2) * colArr[0][c] + 2 * y * x * colArr[1][c] + Math.pow(x, 2) * colArr[2][c];
        } else if (colArr.length === 4) {
          v = Math.pow(y, 3) * colArr[0][c] + 3 * Math.pow(y, 2) * x * colArr[1][c] + 3 * y * Math.pow(x, 2) * colArr[2][c] + Math.pow(x, 3) * colArr[3][c];
        }
        return mathTrunc(v);
      });
    };
  };
};

var extractHEX = exports.extractHEX = function extractHEX(arr) {
  return fixedHexFormat(arr).map(function (c) {
    return hexToRgb(c);
  });
};

var extractRGB = exports.extractRGB = function extractRGB(arr) {
  return arr.map(function (c) {
    var _splitSliceJoin$split = splitSliceJoin(c, 4, -1).split(','),
        _splitSliceJoin$split2 = _slicedToArray(_splitSliceJoin$split, 3),
        r = _splitSliceJoin$split2[0],
        g = _splitSliceJoin$split2[1],
        b = _splitSliceJoin$split2[2];

    return { r: r, g: g, b: b };
  });
};

var extractHSL = exports.extractHSL = function extractHSL(arr) {
  return arr.map(function (c) {
    c = splitSliceJoin(c, 4, -1).split(',');
    var h = c[0];
    var s = splitSliceJoin(c[1], 0, -1);
    var l = splitSliceJoin(c[2], 0, -1);
    return { h: h, s: s, l: l };
  });
};

var returnRGBStr = exports.returnRGBStr = function returnRGBStr(arr) {
  return 'rgb(' + arr[0] + ', ' + arr[1] + ', ' + arr[2] + ')';
};

var returnHSLStr = exports.returnHSLStr = function returnHSLStr(arr) {
  return 'hsl(' + arr[0] + ', ' + arr[1] + '%, ' + arr[2] + '%)';
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = require('./dist/main.js');

},{"./dist/main.js":2}]},{},[4])(4)
});
