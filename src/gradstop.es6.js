(function(glob) {
    function GradStop(options) {
        options = objectAssign({}, this.options, options)

        if (options.stops < options.colorArray.length) {
            throw "Number of stops cannot be less than colorArray.length"
        }
        return this.computeStops(options)
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
                [, r, g, b] = result.map(val => parseInt(val, 16))
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
                    let [r, g, b] = splitSliceJoin(color)(4)(-1).split(',')
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

            // get r,g,b,h,s and l with Bezier interpolation 
            // https://www.cl.cam.ac.uk/teaching/2000/AGraphHCI/SMEG/node3.html
            // Check issue #3 for more info
            const propBezInterpolate = charArr => colArr => x => {
                let y = 1 - x
                return charArr.map(c => {
                    if (colArr.length == 2) {
                        v = (y * colArr[0][c]) + (x * colArr[1][c])
                    } else if (colArr.length == 3) {
                        v = ((y ** 2) * colArr[0][c]) + (2 * y * x * colArr[1][c]) + ((x ** 2) * colArr[2][c])
                    } else if (colArr.length == 4) {
                        v = ((y ** 3) * colArr[0][c]) + (3 * (y ** 2) * x * colArr[1][c]) + (3 * y * (x ** 2) * colArr[2][c]) + ((x ** 3) * colArr[3][c])
                    }
                    return Math.trunc(v)
                })
            }

            const inc = 1.0 / (options.stops - 1)

            let t = 0

            for (let i = 0; i < options.stops; i++) {

                if (options.inputFormat == 'hex' || options.inputFormat == 'rgb') {
                    let [r, g, b] = propBezInterpolate(['r', 'g', 'b'])(colorArray)(t)
                    outputArray.push(`rgb(${r}, ${g}, ${b})`)
                } else if (options.inputFormat == 'hsl') {
                    let [h, s, l] = propBezInterpolate(['h', 's', 'l'])(colorArray)(t)
                    outputArray.push(`hsl(${h}, ${s}%, ${l}%)`)
                }
                t += inc
            }
        }
        options.colorArray = init(options)
        stopsGenerator(options)

        return outputArray
    }

    // drop 'new' keyword
    glob.gradStop = options => new GradStop(options)

})(typeof window !== 'undefined' ? window : global)