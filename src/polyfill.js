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
})();