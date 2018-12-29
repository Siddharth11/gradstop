'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
var propBezInterpolate = exports.propBezInterpolate = function propBezInterpolate(charArr, colArr, x) {
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