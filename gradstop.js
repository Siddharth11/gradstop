/**
 * extend obj function
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var extend = function extend(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
};

/**
 * hex to rgb conversion
 */
var hexToRgb = function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

var gradStop = (function () {
    function gradStop(options) {
        _classCallCheck(this, gradStop);

        this.options = {
            // input color options: hex, rgb or hsl
            inColor: 'hex',
            // number of equidistant color stops (cannot be less than colorArray.length)
            stops: 5,
            // input color array (currently supports only 2)
            colorArray: ['#fff', '#000']
        };
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
        this.stopsGenerator();
        // console.log(this.colorArray)
        return this.outputArray;
    }

    // methods

    _createClass(gradStop, [{
        key: '_init',
        value: function _init() {
            if (this.options.inColor === 'hex') {
                var fixedHexFormat = this.options.colorArray.map(function (color) {
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
                this.colorArray = fixedHexFormat.map(function (color) {
                    return hexToRgb(color);
                });
            } else if (this.options.inColor === 'rgb') {
                this.colorArray = this.options.colorArray.map(function (color) {
                    color = color.split('').slice(4, -1).join('').split(',');
                    var _ref = [color];
                    var r = _ref[0];
                    var g = _ref[1];
                    var b = _ref[2];

                    return {
                        r: r, g: g, b: b
                    };
                });
            } else if (this.options.inColor === 'hsl') {
                this.colorArray = this.options.colorArray.map(function (color) {
                    color = color.split('').slice(4, -1).join('').split(',');
                    var h = color[0],
                        s = color[1].split('').slice(0, -1).join(''),
                        l = color[2].split('').slice(0, -1).join('');
                    return {
                        h: h, s: s, l: l
                    };
                });
            }
        }
    }, {
        key: 'stopsGenerator',
        value: function stopsGenerator() {

            this.outputArray = [];

            if (this.options.inColor === 'hex' || this.options.inColor === 'rgb') {

                // red
                var redStart = parseInt(this.colorArray[0].r),
                    redEnd = parseInt(this.colorArray[1].r),
                    rIncrement = (redEnd - redStart) / (this.options.stops - 1);

                // green
                var greenStart = parseInt(this.colorArray[0].g),
                    greenEnd = parseInt(this.colorArray[1].g),
                    gIncrement = (greenEnd - greenStart) / (this.options.stops - 1);

                // blue
                var blueStart = parseInt(this.colorArray[0].b),
                    blueEnd = parseInt(this.colorArray[1].b),
                    bIncrement = (blueEnd - blueStart) / (this.options.stops - 1);

                var i = undefined;
                for (i = 0; i < this.options.stops; i++) {
                    var r = undefined,
                        g = undefined,
                        b = undefined;
                    r = redStart + Math.floor(rIncrement * i);
                    g = greenStart + Math.floor(gIncrement * i);
                    b = blueStart + Math.floor(bIncrement * i);
                    this.outputArray.push('rgb(' + r + ',' + g + ',' + b + ')');
                }
            } else if (this.options.inColor === 'hsl') {

                // hue
                var hueStart = parseInt(this.colorArray[0].h),
                    hueEnd = parseInt(this.colorArray[1].h),
                    hIncrement = (hueEnd - hueStart) / (this.options.stops - 1);

                // saturation
                var satStart = parseInt(this.colorArray[0].s),
                    satEnd = parseInt(this.colorArray[1].s),
                    sIncrement = (satEnd - satStart) / (this.options.stops - 1);

                // luminance
                var lumStart = parseInt(this.colorArray[0].l),
                    lumEnd = parseInt(this.colorArray[1].l),
                    lIncrement = (lumEnd - lumStart) / (this.options.stops - 1);

                var i = undefined;
                for (i = 0; i < this.options.stops; i++) {
                    var h = undefined,
                        s = undefined,
                        l = undefined;
                    h = hueStart + Math.floor(hIncrement * i);
                    s = satStart + Math.floor(sIncrement * i);
                    l = lumStart + Math.floor(lIncrement * i);
                    this.outputArray.push('hsl(' + h + ', ' + s + '%, ' + l + '%)');
                }
            }
        }
    }]);

    return gradStop;
})();
//# sourceMappingURL=gradstop.js.map
