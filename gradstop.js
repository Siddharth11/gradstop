(function(window) {

    'use strict';

    /**
     * extend obj function
     */
    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    /**
     * hex to rgb conversion
     */
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * gradStop function
     */
    function gradStop(options) {
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
        this.stopsGenerator();
        // console.log(this.colorArray);
        return this.outputArray;
    }

    /**
     * gradStop options
     */
    gradStop.prototype.options = {
        // input color options: hex, rgb or hsl
        inColor: 'hex',
        // number of equidistant color stops (cannot be less than colorArray.length)
        stops: 5,
        // input color array (currently supports only 2)
        colorArray: ['#fff', '#000']
    }

    /**
     * init function
     */
    gradStop.prototype._init = function() {

        if (this.options.inColor === 'hex') {

            var fixedHexFormat = this.options.colorArray.map(function(color) {
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
            this.colorArray = fixedHexFormat.map(function(color) {
                return hexToRgb(color);
            });
        } else if (this.options.inColor === 'rgb') {
            this.colorArray = this.options.colorArray.map(function(color) {
                color = color.split('').slice(4, -1).join('').split(',');
                var tempObj = {};
                tempObj.r = color[0];
                tempObj.g = color[1];
                tempObj.b = color[2];
                return tempObj;
            });
        } else if (this.options.inColor === 'hsl') {
            this.colorArray = this.options.colorArray.map(function(color) {
                color = color.split('').slice(4, -1).join('').split(',');
                var tempObj = {};
                tempObj.h = color[0];
                tempObj.s = color[1].split('').slice(0, -1).join('');
                tempObj.l = color[2].split('').slice(0, -1).join('');
                return tempObj;
            });
        }
    }

    gradStop.prototype.stopsGenerator = function() {

        this.outputArray = [];

        if (this.options.inColor === 'hex' || this.options.inColor === 'rgb') {

            // red
            var redStart = parseInt(this.colorArray[0].r);
            var redEnd = parseInt(this.colorArray[1].r);
            var rIncrement = (redEnd - redStart) / (this.options.stops - 1);

            // green
            var greenStart = parseInt(this.colorArray[0].g);
            var greenEnd = parseInt(this.colorArray[1].g);
            var gIncrement = (greenEnd - greenStart) / (this.options.stops - 1);

            // blue
            var blueStart = parseInt(this.colorArray[0].b);
            var blueEnd = parseInt(this.colorArray[1].b);
            var bIncrement = (blueEnd - blueStart) / (this.options.stops - 1);

            var i;
            for (i = 0; i < this.options.stops; i++) {
                var r, g, b;
                r = redStart + Math.floor(rIncrement * i);
                g = greenStart + Math.floor(gIncrement * i);
                b = blueStart + Math.floor(bIncrement * i);
                this.outputArray.push('rgb(' + r + ',' + g + ',' + b + ')');
            }

        } else if (this.options.inColor === 'hsl') {

            // hue
            var hueStart = parseInt(this.colorArray[0].h);
            var hueEnd = parseInt(this.colorArray[1].h);
            var hIncrement = (hueEnd - hueStart) / (this.options.stops - 1);

            // saturation
            var satStart = parseInt(this.colorArray[0].s);
            var satEnd = parseInt(this.colorArray[1].s);
            var sIncrement = (satEnd - satStart) / (this.options.stops - 1);

            // luminance
            var lumStart = parseInt(this.colorArray[0].l);
            var lumEnd = parseInt(this.colorArray[1].l);
            var lIncrement = (lumEnd - lumStart) / (this.options.stops - 1);

            var i;
            for (i = 0; i < this.options.stops; i++) {
                var h, s, l;
                h = hueStart + Math.floor(hIncrement * i);
                s = satStart + Math.floor(sIncrement * i);
                l = lumStart + Math.floor(lIncrement * i);
                this.outputArray.push('rgb(' + h + ',' + s + '%,' + l + '%)');
            }

        }

    };

    /**
     * add to global namespace
     */
    window.gradStop = gradStop;

})(window);
