// Math.trunc polyfill
var mathTrunc = (function() {
    if (Math.trunc) {
        return Math.trunc;
    }
    return function(x) {
        return x === 0 ? x : x < 0 ? Math.ceil(x) : Math.floor(x);
    };
})();

// Object.assign polyfill
var objectAssign = (function() {
    if (Object.assign) {
        return Object.assign;
    }
    return function(target) {
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
})();;'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

(function (glob) {
    function GradStop(options) {
        options = objectAssign({}, this.options, options);

        if (options.stops < options.colorArray.length) {
            throw "Number of stops cannot be less than colorArray.length";
        }
        return this.computeStops(options);
    }

    // GradStop options
    GradStop.prototype.options = {
        // input color options: hex, rgb or hsl
        inputFormat: 'hex',
        // number of equidistant color stops (cannot be less than colorArray.length)
        stops: 5,
        // input color array (currently supports only 2)
        colorArray: ['#fff', '#000']
    };

    // computeStops
    GradStop.prototype.computeStops = function (options) {

        var outputArray = [];

        // utlils
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

        var splitSliceJoin = function splitSliceJoin(string) {
            return function (start) {
                return function (end) {
                    return string.split('').slice(start, end).join('');
                };
            };
        };

        // if hex and defined as #fff then convert it to standard 7 letter format #ffffff
        var init = function init(options) {

            if (options.inputFormat === 'hex') {
                var fixedHexFormat = options.colorArray.map(function (color) {
                    if (color.length === 4) {
                        return '#' + (color[1] + color[1] + color[2] + color[2] + color[3] + color[3]);
                    } else if (color.length === 7) {
                        return color;
                    }
                });
                return fixedHexFormat.map(function (color) {
                    return hexToRgb(color);
                });
            }
            // if rgb then extract r, g anb b values
            else if (options.inputFormat === 'rgb') {
                    return options.colorArray.map(function (color) {
                        var _splitSliceJoin$split = splitSliceJoin(color)(4)(-1).split(',');

                        var _splitSliceJoin$split2 = _slicedToArray(_splitSliceJoin$split, 3);

                        var r = _splitSliceJoin$split2[0];
                        var g = _splitSliceJoin$split2[1];
                        var b = _splitSliceJoin$split2[2];

                        return { r: r, g: g, b: b };
                    });
                }
                // if hsl then extract h, s and l values
                else if (options.inputFormat === 'hsl') {
                        return options.colorArray.map(function (color) {
                            color = splitSliceJoin(color)(4)(-1).split(',');
                            var h = color[0],
                                s = splitSliceJoin(color[1])(0)(-1),
                                l = splitSliceJoin(color[2])(0)(-1);
                            return { h: h, s: s, l: l };
                        });
                    }
        };

        var stopsGenerator = function stopsGenerator(options) {

            var colorArray = options.colorArray;

            // get r,g,b,h,s and l with Bezier interpolation
            // https://www.cl.cam.ac.uk/teaching/2000/AGraphHCI/SMEG/node3.html
            // Check issue #3 for more info
            var propBezInterpolate = function propBezInterpolate(charArr) {
                return function (colArr) {
                    return function (x) {
                        var y = 1 - x;
                        return charArr.map(function (c) {
                            if (colArr.length == 2) {
                                v = y * colArr[0][c] + x * colArr[1][c];
                            } else if (colArr.length == 3) {
                                v = Math.pow(y, 2) * colArr[0][c] + 2 * y * x * colArr[1][c] + Math.pow(x, 2) * colArr[2][c];
                            } else if (colArr.length == 4) {
                                v = Math.pow(y, 3) * colArr[0][c] + 3 * Math.pow(y, 2) * x * colArr[1][c] + 3 * y * Math.pow(x, 2) * colArr[2][c] + Math.pow(x, 3) * colArr[3][c];
                            }
                            return Math.trunc(v);
                        });
                    };
                };
            };

            var inc = 1.0 / (options.stops - 1);

            var t = 0;

            for (var i = 0; i < options.stops; i++) {

                if (options.inputFormat == 'hex' || options.inputFormat == 'rgb') {
                    var _propBezInterpolate = propBezInterpolate(['r', 'g', 'b'])(colorArray)(t);

                    var _propBezInterpolate2 = _slicedToArray(_propBezInterpolate, 3);

                    var r = _propBezInterpolate2[0];
                    var g = _propBezInterpolate2[1];
                    var b = _propBezInterpolate2[2];

                    outputArray.push('rgb(' + r + ', ' + g + ', ' + b + ')');
                } else if (options.inputFormat == 'hsl') {
                    var _propBezInterpolate3 = propBezInterpolate(['h', 's', 'l'])(colorArray)(t);

                    var _propBezInterpolate32 = _slicedToArray(_propBezInterpolate3, 3);

                    var h = _propBezInterpolate32[0];
                    var s = _propBezInterpolate32[1];
                    var l = _propBezInterpolate32[2];

                    outputArray.push('hsl(' + h + ', ' + s + '%, ' + l + '%)');
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
//# sourceMappingURL=gradstop.js.map
