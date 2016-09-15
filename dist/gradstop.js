(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
(function (global){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _polyfill = require('./polyfill');

var _utils = require('./utils');

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (glob) {
    function GradStop(options) {
        options = (0, _polyfill.objectAssign)({}, this.options, options);

        if (options.stops < options.colorArray.length) {
            throw "Number of stops cannot be less than colorArray.length";
        }
        return this.computeStops(options);
    }

    // GradStop deafult options
    GradStop.prototype.options = _defaultOptions2.default;

    // computeStops
    GradStop.prototype.computeStops = function (options) {

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

                if (options.inputFormat == 'hex' || options.inputFormat == 'rgb') {
                    var _propBezInterpolate = (0, _utils.propBezInterpolate)(['r', 'g', 'b'])(colorArray)(t);

                    var _propBezInterpolate2 = _slicedToArray(_propBezInterpolate, 3);

                    var r = _propBezInterpolate2[0];
                    var g = _propBezInterpolate2[1];
                    var b = _propBezInterpolate2[2];

                    outputArray.push((0, _utils.returnRGBStr)([r, g, b]));
                } else if (options.inputFormat == 'hsl') {
                    var _propBezInterpolate3 = (0, _utils.propBezInterpolate)(['h', 's', 'l'])(colorArray)(t);

                    var _propBezInterpolate4 = _slicedToArray(_propBezInterpolate3, 3);

                    var h = _propBezInterpolate4[0];
                    var s = _propBezInterpolate4[1];
                    var l = _propBezInterpolate4[2];

                    outputArray.push((0, _utils.returnHSLStr)([h, s, l]));
                }
                t += inc;
            }
        };
        options.colorArray = init(options);
        stopsGenerator(options);

        return outputArray;
    };

    // drop 'new' keyword
    glob.gradStop = function (options) {
        return new GradStop(options);
    };
})(typeof window !== 'undefined' ? window : global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./defaultOptions":1,"./polyfill":3,"./utils":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Math.trunc polyfill
var mathTrunc = exports.mathTrunc = function () {
    if (Math.trunc) {
        return Math.trunc;
    }
    return function (x) {
        return x === 0 ? x : x < 0 ? Math.ceil(x) : Math.floor(x);
    };
}();

// Object.assign polyfill
var objectAssign = exports.objectAssign = function () {
    if (Object.assign) {
        return Object.assign;
    }
    return function (target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
}();

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.returnHSLStr = exports.returnRGBStr = exports.extractHSL = exports.extractRGB = exports.extractHEX = exports.propBezInterpolate = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _polyfill = require('./polyfill');

var hexToRgb = function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var _result$map = result.map(function (val) {
        return parseInt(val, 16);
    });

    var _result$map2 = _slicedToArray(_result$map, 4);

    var r = _result$map2[1];
    var g = _result$map2[2];
    var b = _result$map2[3];

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
            var y = 1 - x,
                v = void 0;
            return charArr.map(function (c) {
                if (colArr.length == 2) {
                    v = y * colArr[0][c] + x * colArr[1][c];
                } else if (colArr.length == 3) {
                    v = Math.pow(y, 2) * colArr[0][c] + 2 * y * x * colArr[1][c] + Math.pow(x, 2) * colArr[2][c];
                } else if (colArr.length == 4) {
                    v = Math.pow(y, 3) * colArr[0][c] + 3 * Math.pow(y, 2) * x * colArr[1][c] + 3 * y * Math.pow(x, 2) * colArr[2][c] + Math.pow(x, 3) * colArr[3][c];
                }
                return (0, _polyfill.mathTrunc)(v);
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
        var _splitSliceJoin$split = splitSliceJoin(c, 4, -1).split(',');

        var _splitSliceJoin$split2 = _slicedToArray(_splitSliceJoin$split, 3);

        var r = _splitSliceJoin$split2[0];
        var g = _splitSliceJoin$split2[1];
        var b = _splitSliceJoin$split2[2];

        return { r: r, g: g, b: b };
    });
};

var extractHSL = exports.extractHSL = function extractHSL(arr) {
    return arr.map(function (c) {
        c = splitSliceJoin(c, 4, -1).split(',');
        var h = c[0],
            s = splitSliceJoin(c[1], 0, -1),
            l = splitSliceJoin(c[2], 0, -1);
        return { h: h, s: s, l: l };
    });
};

var returnRGBStr = exports.returnRGBStr = function returnRGBStr(arr) {
    return 'rgb(' + arr[0] + ', ' + arr[1] + ', ' + arr[2] + ')';
};

var returnHSLStr = exports.returnHSLStr = function returnHSLStr(arr) {
    return 'hsl(' + arr[0] + ', ' + arr[1] + '%, ' + arr[2] + '%)';
};

},{"./polyfill":3}]},{},[1,2,3,4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZGVmYXVsdE9wdGlvbnMuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9wb2x5ZmlsbC5qcyIsInNyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsSUFBTSxpQkFBaUI7QUFDbkI7QUFDQSxpQkFBYSxLQUZNO0FBR25CO0FBQ0EsV0FBTyxDQUpZO0FBS25CO0FBQ0EsZ0JBQVksQ0FBQyxNQUFELEVBQVMsTUFBVDtBQU5PLENBQXZCOztrQkFTZSxjOzs7Ozs7OztBQ1RmOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxDQUFDLFVBQVMsSUFBVCxFQUFlO0FBQ1osYUFBUyxRQUFULENBQWtCLE9BQWxCLEVBQTJCO0FBQ3ZCLGtCQUFVLDRCQUFhLEVBQWIsRUFBaUIsS0FBSyxPQUF0QixFQUErQixPQUEvQixDQUFWOztBQUVBLFlBQUksUUFBUSxLQUFSLEdBQWdCLFFBQVEsVUFBUixDQUFtQixNQUF2QyxFQUErQztBQUMzQyxrQkFBTSx1REFBTjtBQUNIO0FBQ0QsZUFBTyxLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBUDtBQUNIOztBQUVEO0FBQ0EsYUFBUyxTQUFULENBQW1CLE9BQW5COztBQUVBO0FBQ0EsYUFBUyxTQUFULENBQW1CLFlBQW5CLEdBQWtDLG1CQUFXOztBQUV6QyxZQUFJLGNBQWMsRUFBbEI7O0FBRUEsWUFBTSxPQUFPLFNBQVAsSUFBTyxVQUFXO0FBQ3BCLG9CQUFPLFFBQVEsV0FBZjtBQUNJLHFCQUFLLEtBQUw7QUFDSSwyQkFBTyx1QkFBVyxRQUFRLFVBQW5CLENBQVA7QUFDSixxQkFBSyxLQUFMO0FBQ0ksMkJBQU8sdUJBQVcsUUFBUSxVQUFuQixDQUFQO0FBQ0oscUJBQUssS0FBTDtBQUNJLDJCQUFPLHVCQUFXLFFBQVEsVUFBbkIsQ0FBUDtBQU5SO0FBUUgsU0FURDs7QUFXQSxZQUFNLGlCQUFpQixTQUFqQixjQUFpQixVQUFX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QUosQ0FBUSxhQUFLO0FBQUEsb0NBQzFCLGVBQWUsQ0FBZixFQUFrQixDQUFsQixFQUFxQixDQUFDLENBQXRCLEVBQXlCLEtBQXpCLENBQStCLEdBQS9CLENBRDBCOztBQUFBOztBQUFBLFlBQ3JDLENBRHFDO0FBQUEsWUFDbEMsQ0FEa0M7QUFBQSxZQUMvQixDQUQrQjs7QUFFMUMsZUFBTyxFQUFFLElBQUYsRUFBSyxJQUFMLEVBQVEsSUFBUixFQUFQO0FBQ0gsS0FIZ0MsQ0FBUDtBQUFBLENBQW5COztBQUtBLElBQU0sa0NBQWEsU0FBYixVQUFhO0FBQUEsV0FBTyxJQUFJLEdBQUosQ0FBUSxhQUFLO0FBQzFDLFlBQUksZUFBZSxDQUFmLEVBQWtCLENBQWxCLEVBQXFCLENBQUMsQ0FBdEIsRUFBeUIsS0FBekIsQ0FBK0IsR0FBL0IsQ0FBSjtBQUNBLFlBQUksSUFBSSxFQUFFLENBQUYsQ0FBUjtBQUFBLFlBQ0ksSUFBSSxlQUFlLEVBQUUsQ0FBRixDQUFmLEVBQXFCLENBQXJCLEVBQXdCLENBQUMsQ0FBekIsQ0FEUjtBQUFBLFlBRUksSUFBSSxlQUFlLEVBQUUsQ0FBRixDQUFmLEVBQXFCLENBQXJCLEVBQXdCLENBQUMsQ0FBekIsQ0FGUjtBQUdBLGVBQU8sRUFBRSxJQUFGLEVBQUssSUFBTCxFQUFRLElBQVIsRUFBUDtBQUNILEtBTmdDLENBQVA7QUFBQSxDQUFuQjs7QUFRQSxJQUFNLHNDQUFlLFNBQWYsWUFBZTtBQUFBLG9CQUFjLElBQUksQ0FBSixDQUFkLFVBQXlCLElBQUksQ0FBSixDQUF6QixVQUFvQyxJQUFJLENBQUosQ0FBcEM7QUFBQSxDQUFyQjs7QUFFQSxJQUFNLHNDQUFlLFNBQWYsWUFBZTtBQUFBLG9CQUFjLElBQUksQ0FBSixDQUFkLFVBQXlCLElBQUksQ0FBSixDQUF6QixXQUFxQyxJQUFJLENBQUosQ0FBckM7QUFBQSxDQUFyQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAvLyBpbnB1dCBjb2xvciBvcHRpb25zOiBoZXgsIHJnYiBvciBoc2xcbiAgICBpbnB1dEZvcm1hdDogJ2hleCcsXG4gICAgLy8gbnVtYmVyIG9mIGNvbG9yIHN0b3BzIChjYW5ub3QgYmUgbGVzcyB0aGFuIGNvbG9yQXJyYXkubGVuZ3RoKVxuICAgIHN0b3BzOiA1LFxuICAgIC8vIGlucHV0IGNvbG9yIGFycmF5XG4gICAgY29sb3JBcnJheTogWycjZmZmJywgJyMwMDAnXVxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0T3B0aW9ucyIsImltcG9ydCB7IG9iamVjdEFzc2lnbiB9IGZyb20gJy4vcG9seWZpbGwnXG5pbXBvcnQgeyBleHRyYWN0SEVYLCBleHRyYWN0UkdCLCBleHRyYWN0SFNMLCBwcm9wQmV6SW50ZXJwb2xhdGUsIHJldHVyblJHQlN0ciwgcmV0dXJuSFNMU3RyIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuL2RlZmF1bHRPcHRpb25zJ1xuXG4oZnVuY3Rpb24oZ2xvYikge1xuICAgIGZ1bmN0aW9uIEdyYWRTdG9wKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9iamVjdEFzc2lnbih7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKVxuXG4gICAgICAgIGlmIChvcHRpb25zLnN0b3BzIDwgb3B0aW9ucy5jb2xvckFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgXCJOdW1iZXIgb2Ygc3RvcHMgY2Fubm90IGJlIGxlc3MgdGhhbiBjb2xvckFycmF5Lmxlbmd0aFwiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcHV0ZVN0b3BzKG9wdGlvbnMpXG4gICAgfVxuXG4gICAgLy8gR3JhZFN0b3AgZGVhZnVsdCBvcHRpb25zXG4gICAgR3JhZFN0b3AucHJvdG90eXBlLm9wdGlvbnMgPSBkZWZhdWx0T3B0aW9uc1xuXG4gICAgLy8gY29tcHV0ZVN0b3BzXG4gICAgR3JhZFN0b3AucHJvdG90eXBlLmNvbXB1dGVTdG9wcyA9IG9wdGlvbnMgPT4ge1xuXG4gICAgICAgIGxldCBvdXRwdXRBcnJheSA9IFtdXG5cbiAgICAgICAgY29uc3QgaW5pdCA9IG9wdGlvbnMgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKG9wdGlvbnMuaW5wdXRGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZXgnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXh0cmFjdEhFWChvcHRpb25zLmNvbG9yQXJyYXkpXG4gICAgICAgICAgICAgICAgY2FzZSAncmdiJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4dHJhY3RSR0Iob3B0aW9ucy5jb2xvckFycmF5KVxuICAgICAgICAgICAgICAgIGNhc2UgJ2hzbCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleHRyYWN0SFNMKG9wdGlvbnMuY29sb3JBcnJheSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0b3BzR2VuZXJhdG9yID0gb3B0aW9ucyA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjb2xvckFycmF5ID0gb3B0aW9ucy5jb2xvckFycmF5XG5cbiAgICAgICAgICAgIGNvbnN0IGluYyA9IDEuMCAvIChvcHRpb25zLnN0b3BzIC0gMSlcblxuICAgICAgICAgICAgbGV0IHQgPSAwXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5zdG9wczsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5pbnB1dEZvcm1hdCA9PSAnaGV4JyB8fCBvcHRpb25zLmlucHV0Rm9ybWF0ID09ICdyZ2InKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBbciwgZywgYl0gPSBwcm9wQmV6SW50ZXJwb2xhdGUoWydyJywgJ2cnLCAnYiddKShjb2xvckFycmF5KSh0KVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRBcnJheS5wdXNoKHJldHVyblJHQlN0cihbciwgZywgYl0pKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5pbnB1dEZvcm1hdCA9PSAnaHNsJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgW2gsIHMsIGxdID0gcHJvcEJlekludGVycG9sYXRlKFsnaCcsICdzJywgJ2wnXSkoY29sb3JBcnJheSkodClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0QXJyYXkucHVzaChyZXR1cm5IU0xTdHIoW2gsIHMsIGxdKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdCArPSBpbmNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLmNvbG9yQXJyYXkgPSBpbml0KG9wdGlvbnMpXG4gICAgICAgIHN0b3BzR2VuZXJhdG9yKG9wdGlvbnMpXG5cbiAgICAgICAgcmV0dXJuIG91dHB1dEFycmF5XG4gICAgfVxuXG4gICAgLy8gZHJvcCAnbmV3JyBrZXl3b3JkXG4gICAgZ2xvYi5ncmFkU3RvcCA9IG9wdGlvbnMgPT4gbmV3IEdyYWRTdG9wKG9wdGlvbnMpXG5cbn0pKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKSIsIi8vIE1hdGgudHJ1bmMgcG9seWZpbGxcbmV4cG9ydCBjb25zdCBtYXRoVHJ1bmMgPSAoKCkgPT4ge1xuICAgIGlmIChNYXRoLnRydW5jKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnRydW5jXG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiB4ID09PSAwID8geCA6IHggPCAwID8gTWF0aC5jZWlsKHgpIDogTWF0aC5mbG9vcih4KVxuICAgIH1cbn0pKClcblxuLy8gT2JqZWN0LmFzc2lnbiBwb2x5ZmlsbFxuZXhwb3J0IGNvbnN0IG9iamVjdEFzc2lnbiA9ICgoKSA9PiB7XG4gICAgaWYgKE9iamVjdC5hc3NpZ24pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ25cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKVxuICAgICAgICB9XG4gICAgICAgIGxldCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KVxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF1cbiAgICAgICAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgfVxufSkoKSIsImltcG9ydCB7IG1hdGhUcnVuYyB9IGZyb20gJy4vcG9seWZpbGwnXG5cbmNvbnN0IGhleFRvUmdiID0gaGV4ID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCksXG4gICAgICAgIFssIHIsIGcsIGJdID0gcmVzdWx0Lm1hcCh2YWwgPT4gcGFyc2VJbnQodmFsLCAxNikpXG4gICAgcmV0dXJuIHJlc3VsdCA/IHtyLCBnLCBiIH0gOiBudWxsXG59XG5cbmNvbnN0IHNwbGl0U2xpY2VKb2luID0gKHN0cmluZywgc3RhcnQsIGVuZCkgPT4gc3RyaW5nLnNwbGl0KCcnKS5zbGljZShzdGFydCwgZW5kKS5qb2luKCcnKVxuXG4vLyBpZiBoZXggYW5kIGRlZmluZWQgYXMgI2ZmZiB0aGVuIGNvbnZlcnQgaXQgdG8gc3RhbmRhcmQgNyBsZXR0ZXIgZm9ybWF0ICNmZmZmZmZcbmNvbnN0IGZpeGVkSGV4Rm9ybWF0ID0gYXJyID0+IGFyci5tYXAoYyA9PiB7XG4gICAgaWYgKGMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHJldHVybiBgIyR7Y1sxXSArIGNbMV0gKyBjWzJdICsgY1syXSArIGNbM10gKyBjWzNdfWBcbiAgICB9IGVsc2UgaWYgKGMubGVuZ3RoID09PSA3KSB7XG4gICAgICAgIHJldHVybiBjXG4gICAgfVxufSlcblxuLy8gZ2V0IHIsZyxiLGgscyBhbmQgbCB3aXRoIEJlemllciBpbnRlcnBvbGF0aW9uIFxuLy8gaHR0cHM6Ly93d3cuY2wuY2FtLmFjLnVrL3RlYWNoaW5nLzIwMDAvQUdyYXBoSENJL1NNRUcvbm9kZTMuaHRtbFxuLy8gQ2hlY2sgaXNzdWUgIzMgZm9yIG1vcmUgaW5mb1xuZXhwb3J0IGNvbnN0IHByb3BCZXpJbnRlcnBvbGF0ZSA9IGNoYXJBcnIgPT4gY29sQXJyID0+IHggPT4ge1xuICAgIGxldCB5ID0gMSAtIHgsIHZcbiAgICByZXR1cm4gY2hhckFyci5tYXAoYyA9PiB7XG4gICAgICAgIGlmIChjb2xBcnIubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgIHYgPSAoeSAqIGNvbEFyclswXVtjXSkgKyAoeCAqIGNvbEFyclsxXVtjXSlcbiAgICAgICAgfSBlbHNlIGlmIChjb2xBcnIubGVuZ3RoID09IDMpIHtcbiAgICAgICAgICAgIHYgPSAoKHkgKiogMikgKiBjb2xBcnJbMF1bY10pICsgKDIgKiB5ICogeCAqIGNvbEFyclsxXVtjXSkgKyAoKHggKiogMikgKiBjb2xBcnJbMl1bY10pXG4gICAgICAgIH0gZWxzZSBpZiAoY29sQXJyLmxlbmd0aCA9PSA0KSB7XG4gICAgICAgICAgICB2ID0gKCh5ICoqIDMpICogY29sQXJyWzBdW2NdKSArICgzICogKHkgKiogMikgKiB4ICogY29sQXJyWzFdW2NdKSArICgzICogeSAqICh4ICoqIDIpICogY29sQXJyWzJdW2NdKSArICgoeCAqKiAzKSAqIGNvbEFyclszXVtjXSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0aFRydW5jKHYpXG4gICAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RIRVggPSBhcnIgPT4gZml4ZWRIZXhGb3JtYXQoYXJyKS5tYXAoYyA9PiBoZXhUb1JnYihjKSlcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RSR0IgPSBhcnIgPT4gYXJyLm1hcChjID0+IHtcbiAgICBsZXQgW3IsIGcsIGJdID0gc3BsaXRTbGljZUpvaW4oYywgNCwgLTEpLnNwbGl0KCcsJylcbiAgICByZXR1cm4geyByLCBnLCBiIH1cbn0pXG5cbmV4cG9ydCBjb25zdCBleHRyYWN0SFNMID0gYXJyID0+IGFyci5tYXAoYyA9PiB7XG4gICAgYyA9IHNwbGl0U2xpY2VKb2luKGMsIDQsIC0xKS5zcGxpdCgnLCcpXG4gICAgbGV0IGggPSBjWzBdLFxuICAgICAgICBzID0gc3BsaXRTbGljZUpvaW4oY1sxXSwgMCwgLTEpLFxuICAgICAgICBsID0gc3BsaXRTbGljZUpvaW4oY1syXSwgMCwgLTEpXG4gICAgcmV0dXJuIHsgaCwgcywgbCB9XG59KVxuXG5leHBvcnQgY29uc3QgcmV0dXJuUkdCU3RyID0gYXJyID0+IGByZ2IoJHthcnJbMF19LCAke2FyclsxXX0sICR7YXJyWzJdfSlgXG5cbmV4cG9ydCBjb25zdCByZXR1cm5IU0xTdHIgPSBhcnIgPT4gYGhzbCgke2FyclswXX0sICR7YXJyWzFdfSUsICR7YXJyWzJdfSUpYCJdfQ==
