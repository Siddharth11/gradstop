(function(glob) {
    function GradStop(options) {
        options = objectAssign({}, this.options, options)

        if (options.stops < options.colorArray.length) {
            throw "Number of stops cannot be less than colorArray.length"
        }

        let len = options.colorArray.length

        if (len === 2) {
            return this.computeStops(options)
        } else if (len === 3) {
            let s = options.stops,
                colArr1 = options.colorArray.slice(0, 2),
                colArr2 = options.colorArray.slice(1).reverse()

            // even stops
            if (s % 2 === 0) {
                var newStops = (s / 2) + 1,
                    i = 1
            } 
            // odd stops
            else {
                var newStops = (s + 1) / 2,
                    i = 0
            }
            let part1 = objectAssign({}, options, {
                    stops: newStops,
                    colorArray: colArr1
                }),
                part2 = objectAssign({}, options, {
                    stops: newStops,
                    colorArray: colArr2
                })
            return [...this.computeStops(part1).slice(0, -1), ...this.computeStops(part2).reverse().slice(i)]
        } else {
            throw "colorArray only supports length 2 and 3"
        }
    }

    // GradStop options
    GradStop.prototype.options = {
        // input color options: hex, rgb or hsl
        inputFormat: 'hex',
        // number of equidistant color stops (cannot be less than colorArray.length)
        stops: 5,
        // input color array (currently supports only 2)
        colorArray: ['#fff', '#000']
    }

    // computeStops
    GradStop.prototype.computeStops = options => {

        let outputArray = []

        // utlils
        const hexToRgb = hex => {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
                [, r, g, b] = [...result.map(val => parseInt(val, 16))]
            return result ? { r, g, b } : null
        }

        const splitSliceJoin = string => start => end => string.split('').slice(start, end).join('')

        // if hex and defined as #fff then convert it to standard 7 letter format #ffffff
        const init = options => {

            if (options.inputFormat === 'hex') {
                let fixedHexFormat = options.colorArray.map(color => {
                    if (color.length === 4) {
                        return `#${color[1] + color[1] + color[2] + color[2] + color[3] + color[3]}`
                    } else if (color.length === 7) {
                        return color
                    }
                })
                return fixedHexFormat.map(color => hexToRgb(color))
            }
            // if rgb then extract r, g anb b values
            else if (options.inputFormat === 'rgb') {
                return options.colorArray.map(color => {
                    let [r, g, b] = [...splitSliceJoin(color)(4)(-1).split(',')]
                    return { r, g, b }
                })
            }
            // if hsl then extract h, s and l values
            else if (options.inputFormat === 'hsl') {
                return options.colorArray.map(color => {
                    color = splitSliceJoin(color)(4)(-1).split(',')
                    let h = color[0],
                        s = splitSliceJoin(color[1])(0)(-1),
                        l = splitSliceJoin(color[2])(0)(-1)
                    return { h, s, l }
                })
            }
        }

        const stopsGenerator = options => {

            let colorArray = options.colorArray

            // calculate start and end values of r,g,b,h,s and l
            const startEnd = property => colorArray.map(val => parseInt(val[property]))

            // calculate increment value
            const increment = (start, end) => (end - start) / (options.stops - 1)

            // calculate step values of r,g,b,h,s and l
            const stepVal = property => index => startEnd(property)[0] + mathTrunc(increment(...startEnd(property)) * index)

            if (options.inputFormat === 'hex' || options.inputFormat === 'rgb') {

                for (let i = 0; i < options.stops; i++) {
                    let [r, g, b] = [...['r', 'g', 'b'].map(char => stepVal(char)(i))]
                    outputArray.push(`rgb(${r},${g},${b})`)
                }
            } else if (options.inputFormat === 'hsl') {

                for (let i = 0; i < options.stops; i++) {
                    let [h, s, l] = [...['h', 's', 'l'].map(char => stepVal(char)(i))]
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