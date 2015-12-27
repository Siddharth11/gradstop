(function(glob) {

    if (typeof Object.assign != 'function') {
        Object.assign = target => {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object')
            }

            let output = Object(target)
            for (let index = 1; index < arguments.length; index++) {
                let source = arguments[index]
                if (source !== undefined && source !== null) {
                    for (let nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey]
                        }
                    }
                }
            }
            return output
        }
    }

    function GradStop(options) {
        options = Object.assign({}, this.options, options)
        return this.computeStops(options)
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
    }

    /**
     * computeStops
     */
    GradStop.prototype.computeStops = options => {

        let outputArray = []

        /**
         * utlils
         */
        let hexToRgb = hex => {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null
        }

        let init = options => {
            // if hex and defined as #ff or #fff then convert it to standard 7 letter form #ffffff
            if (options.inColor === 'hex') {
                let fixedHexFormat = options.colorArray.map(color => {
                    if (color.length === 3) {
                        color = color + color.split('').slice(1, 3).join('') + color.split('').slice(1, 3).join('')
                        return color
                    } else if (color.length === 4) {
                        color = color + color.split('').slice(1, 4).join('')
                        return color
                    } else if (color.length === 7) {
                        return color
                    }
                })
                return fixedHexFormat.map(color => hexToRgb(color))
            }
            // if rgb then extract r, g anb b values
            else if (options.inColor === 'rgb') {
                return options.colorArray.map(color => {
                    color = color.split('').slice(4, -1).join('').split(',')
                    let [r, g, b] = [...color]
                    return {
                        r, g, b
                    }
                })

            }
            // if hsl then extract h, s and l values
            else if (options.inColor === 'hsl') {
                return options.colorArray.map(color => {
                    color = color.split('').slice(4, -1).join('').split(',')
                    let h = color[0],
                        s = color[1].split('').slice(0, -1).join(''),
                        l = color[2].split('').slice(0, -1).join('')
                    return {
                        h, s, l
                    }
                })

            }
        }

        let stopsGenerator = options => {

            let colorArray = options.colorArray

            if (options.inColor === 'hex' || options.inColor === 'rgb') {

                // count increment value for red
                let redStart = parseInt(colorArray[0].r),
                    redEnd = parseInt(colorArray[1].r),
                    rIncrement = (redEnd - redStart) / (options.stops - 1),

                    // count increment value for green
                    greenStart = parseInt(colorArray[0].g),
                    greenEnd = parseInt(colorArray[1].g),
                    gIncrement = (greenEnd - greenStart) / (options.stops - 1),

                    // count increment value for blue
                    blueStart = parseInt(colorArray[0].b),
                    blueEnd = parseInt(colorArray[1].b),
                    bIncrement = (blueEnd - blueStart) / (options.stops - 1)

                for (let i = 0; i < options.stops; i++) {
                    let r, g, b
                    r = redStart + Math.floor(rIncrement * i)
                    g = greenStart + Math.floor(gIncrement * i)
                    b = blueStart + Math.floor(bIncrement * i)
                    outputArray.push(`rgb(${r},${g},${b})`)
                }

            } else if (options.inColor === 'hsl') {

                // count increment value for hue
                let hueStart = parseInt(colorArray[0].h),
                    hueEnd = parseInt(colorArray[1].h),
                    hIncrement = (hueEnd - hueStart) / (options.stops - 1),

                    // count increment value for saturation
                    satStart = parseInt(colorArray[0].s),
                    satEnd = parseInt(colorArray[1].s),
                    sIncrement = (satEnd - satStart) / (options.stops - 1),

                    // count increment value for luminance
                    lumStart = parseInt(colorArray[0].l),
                    lumEnd = parseInt(colorArray[1].l),
                    lIncrement = (lumEnd - lumStart) / (options.stops - 1)

                for (let i = 0; i < options.stops; i++) {
                    let h, s, l
                    h = hueStart + Math.floor(hIncrement * i)
                    s = satStart + Math.floor(sIncrement * i)
                    l = lumStart + Math.floor(lIncrement * i)
                    outputArray.push(`hsl(${h}, ${s}%, ${l}%)`)
                }
            }
        }

        options.colorArray = init(options)
        stopsGenerator(options)

        return outputArray

    }

    // drop 'new' keyword
    glob.gradStop = options => new GradStop(options)

})(typeof window !== 'undefined' ? window : global)
