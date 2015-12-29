'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

(function (glob) {
    var _arguments = arguments;

    // Object.assign polyfill
    if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var output = Object(target);
            for (var index = 1; index < _arguments.length; index++) {
                var source = _arguments[index];
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
    }

    function GradStop(options) {
        options = Object.assign({}, this.options, options);
        return this.computeStops(options);
    }

    /**
     * GradStop options
     */
    GradStop.prototype.options = {
        // input color options: hex, rgb or hsl
        inputFormat: 'hex',
        // number of equidistant color stops (cannot be less than colorArray.length)
        stops: 5,
        // input color array (currently supports only 2)
        colorArray: ['#fff', '#000']
    };

    /**
     * computeStops
     */
    GradStop.prototype.computeStops = function (options) {

        var outputArray = [];

        /**
         * utlils
         */
        var hexToRgb = function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            var _ref = [].concat(_toConsumableArray(result.map(function (val) {
                return parseInt(val, 16);
            })));

            var r = _ref[1];
            var g = _ref[2];
            var b = _ref[3];

            return result ? {
                r: r, g: g, b: b
            } : null;
        };

        var splitSliceJoin = function splitSliceJoin(string, start, end) {
            return string.split('').slice(start, end).join('');
        };

        var init = function init(options) {
            // if hex and defined as #ff or #fff then convert it to standard 7 letter format #ffffff

            if (options.inputFormat === 'hex') {
                var fixedHexFormat = options.colorArray.map(function (color) {
                    if (color.length === 3) {
                        return color + splitSliceJoin(color, 1, 3) + splitSliceJoin(color, 1, 3);
                    } else if (color.length === 4) {
                        return color + splitSliceJoin(color, 1, 4);
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
                        var _ref2 = [].concat(_toConsumableArray(splitSliceJoin(color, 4, -1).split(',')));

                        var r = _ref2[0];
                        var g = _ref2[1];
                        var b = _ref2[2];

                        return {
                            r: r, g: g, b: b
                        };
                    });
                }
                // if hsl then extract h, s and l values
                else if (options.inputFormat === 'hsl') {
                        return options.colorArray.map(function (color) {
                            color = splitSliceJoin(color, 4, -1).split(',');
                            var h = color[0],
                                s = splitSliceJoin(color[1], 0, -1),
                                l = splitSliceJoin(color[2], 0, -1);
                            return {
                                h: h, s: s, l: l
                            };
                        });
                    }
        };

        var stopsGenerator = function stopsGenerator(options) {

            var colorArray = options.colorArray;

            // calculate start and end values of r,g,b,h,s and l
            var startEnd = function startEnd(property) {
                return colorArray.map(function (val) {
                    return parseInt(val[property]);
                });
            };

            // calculate increment value
            var increment = function increment(start, end) {
                return (end - start) / (options.stops - 1);
            };

            // calculate step values of r,g,b,h,s and l
            var stepVal = function stepVal(property, index) {
                return startEnd(property)[0] + Math.trunc(increment.apply(undefined, _toConsumableArray(startEnd(property))) * index);
            };

            if (options.inputFormat === 'hex' || options.inputFormat === 'rgb') {
                var _loop = function (i) {
                    var _ref3 = [].concat(_toConsumableArray(['r', 'g', 'b'].map(function (char) {
                        return stepVal(char, i);
                    })));

                    var r = _ref3[0];
                    var g = _ref3[1];
                    var b = _ref3[2];

                    outputArray.push('rgb(' + r + ',' + g + ',' + b + ')');
                };

                for (var i = 0; i < options.stops; i++) {
                    _loop(i);
                }
            } else if (options.inputFormat === 'hsl') {
                var _loop2 = function (i) {
                    var _ref4 = [].concat(_toConsumableArray(['h', 's', 'l'].map(function (char) {
                        return stepVal(char, i);
                    })));

                    var h = _ref4[0];
                    var s = _ref4[1];
                    var l = _ref4[2];

                    outputArray.push('hsl(' + h + ', ' + s + '%, ' + l + '%)');
                };

                for (var i = 0; i < options.stops; i++) {
                    _loop2(i);
                }
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
