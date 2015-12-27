'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

(function (glob) {
    var _arguments = arguments;

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
        inColor: 'hex',
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
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        var init = function init(options) {
            // if hex and defined as #ff or #fff then convert it to standard 7 letter form #ffffff
            if (options.inColor === 'hex') {
                var fixedHexFormat = options.colorArray.map(function (color) {
                    if (color.length === 3) {
                        color = color + color.split('').slice(1, 3).join('') + color.split('').slice(1, 3).join('');
                        return color;
                    } else if (color.length === 4) {
                        color = color + color.split('').slice(1, 4).join('');
                        return color;
                    } else if (color.length === 7) {
                        return color;
                    }
                });
                return fixedHexFormat.map(function (color) {
                    return hexToRgb(color);
                });
            }
            // if rgb then extract r, g anb b values
            else if (options.inColor === 'rgb') {
                    return options.colorArray.map(function (color) {
                        color = color.split('').slice(4, -1).join('').split(',');

                        var _ref = [].concat(_toConsumableArray(color));

                        var r = _ref[0];
                        var g = _ref[1];
                        var b = _ref[2];

                        return {
                            r: r, g: g, b: b
                        };
                    });
                }
                // if hsl then extract h, s and l values
                else if (options.inColor === 'hsl') {
                        return options.colorArray.map(function (color) {
                            color = color.split('').slice(4, -1).join('').split(',');
                            var h = color[0],
                                s = color[1].split('').slice(0, -1).join(''),
                                l = color[2].split('').slice(0, -1).join('');
                            return {
                                h: h, s: s, l: l
                            };
                        });
                    }
        };

        var stopsGenerator = function stopsGenerator(options) {

            var colorArray = options.colorArray;

            if (options.inColor === 'hex' || options.inColor === 'rgb') {

                // count increment value for red
                var redStart = parseInt(colorArray[0].r),
                    redEnd = parseInt(colorArray[1].r),
                    rIncrement = (redEnd - redStart) / (options.stops - 1),

                // count increment value for green
                greenStart = parseInt(colorArray[0].g),
                    greenEnd = parseInt(colorArray[1].g),
                    gIncrement = (greenEnd - greenStart) / (options.stops - 1),

                // count increment value for blue
                blueStart = parseInt(colorArray[0].b),
                    blueEnd = parseInt(colorArray[1].b),
                    bIncrement = (blueEnd - blueStart) / (options.stops - 1);

                for (var i = 0; i < options.stops; i++) {
                    var r = undefined,
                        g = undefined,
                        b = undefined;
                    r = redStart + Math.floor(rIncrement * i);
                    g = greenStart + Math.floor(gIncrement * i);
                    b = blueStart + Math.floor(bIncrement * i);
                    outputArray.push('rgb(' + r + ',' + g + ',' + b + ')');
                }
            } else if (options.inColor === 'hsl') {

                // count increment value for hue
                var hueStart = parseInt(colorArray[0].h),
                    hueEnd = parseInt(colorArray[1].h),
                    hIncrement = (hueEnd - hueStart) / (options.stops - 1),

                // count increment value for saturation
                satStart = parseInt(colorArray[0].s),
                    satEnd = parseInt(colorArray[1].s),
                    sIncrement = (satEnd - satStart) / (options.stops - 1),

                // count increment value for luminance
                lumStart = parseInt(colorArray[0].l),
                    lumEnd = parseInt(colorArray[1].l),
                    lIncrement = (lumEnd - lumStart) / (options.stops - 1);

                for (var i = 0; i < options.stops; i++) {
                    var h = undefined,
                        s = undefined,
                        l = undefined;
                    h = hueStart + Math.floor(hIncrement * i);
                    s = satStart + Math.floor(sIncrement * i);
                    l = lumStart + Math.floor(lIncrement * i);
                    outputArray.push('hsl(' + h + ', ' + s + '%, ' + l + '%)');
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
