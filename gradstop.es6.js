(function(glob) {
    // Object.assign polyfill
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
        inputFormat: 'hex',
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
        const hexToRgb = hex => {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
                [, r, g, b] = [...result.map(val => parseInt(val, 16))]
            return result ? {
                r, g, b
            } : null
        }

        const splitSliceJoin = (string, start, end) => string.split('').slice(start, end).join('')

        const init = options => {
            // if hex and defined as #ff or #fff then convert it to standard 7 letter format #ffffff

            if (options.inputFormat === 'hex') {
                let fixedHexFormat = options.colorArray.map(color => {
                    if (color.length === 3) {
                        return color + splitSliceJoin(color, 1, 3) + splitSliceJoin(color, 1, 3)
                    } else if (color.length === 4) {
                        return color + splitSliceJoin(color, 1, 4)
                    } else if (color.length === 7) {
                        return color
                    }
                })
                return fixedHexFormat.map(color => hexToRgb(color))
            }
            // if rgb then extract r, g anb b values
            else if (options.inputFormat === 'rgb') {
                return options.colorArray.map(color => {
                    let [r, g, b] = [...splitSliceJoin(color, 4, -1).split(',')]
                    return {
                        r, g, b
                    }
                })
            }
            // if hsl then extract h, s and l values
            else if (options.inputFormat === 'hsl') {
                return options.colorArray.map(color => {
                    color = splitSliceJoin(color, 4, -1).split(',')
                    let h = color[0],
                        s = splitSliceJoin(color[1], 0, -1),
                        l = splitSliceJoin(color[2], 0, -1)
                    return {
                        h, s, l
                    }
                })
            }
        }

        const stopsGenerator = options => {

            let colorArray = options.colorArray

            // calculate start and end values of r,g,b,h,s and l
            const startEnd = (property) => colorArray.map(val => parseInt(val[property]))

            // calculate increment value
            const increment = (start, end) => (end - start) / (options.stops - 1)

            // calculate step values of r,g,b,h,s and l
            const stepVal = (property, index) => startEnd(property)[0] + Math.trunc(increment(...startEnd(property)) * index)

            if (options.inputFormat === 'hex' || options.inputFormat === 'rgb') {

                for (let i = 0; i < options.stops; i++) {
                    let [r, g, b] = [...['r', 'g', 'b'].map(char => stepVal(char, i))]
                    outputArray.push(`rgb(${r},${g},${b})`)
                }

            } else if (options.inputFormat === 'hsl') {

                for (let i = 0; i < options.stops; i++) {
                    let [h, s, l] = [...['h', 's', 'l'].map(char => stepVal(char, i))]
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