const mathTrunc = (() => {
  if (Math.trunc) {
    return Math.trunc;
  }
  return function(x) {
    return x === 0 ? x : x < 0 ? Math.ceil(x) : Math.floor(x);
  };
})();

export const handleErrors = options => {
  const { inputFormat, stops, colorArray } = options;

  if (typeof inputFormat !== 'string') {
    throw 'inputFormat should be a string';
  }

  const supportedFormats = ['hex', 'rgb', 'hsl'];
  const isValidFormat =
    supportedFormats.indexOf(inputFormat.toLowerCase()) !== -1;
  if (!isValidFormat) {
    throw 'Invalid inputFormat value, supported: hex, rgb and hsl';
  }

  if (!Number.isInteger(stops)) {
    throw 'stops should be an integer';
  }

  if (
    !Array.isArray(colorArray) ||
    !colorArray.every(item => typeof item === 'string')
  ) {
    throw 'colorArray should be an array of color strings';
  }

  if (stops < colorArray.length) {
    throw 'Number of stops cannot be less than colorArray.length';
  }

};

const hexToRgb = hex => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
    [, r, g, b] = result.map(val => parseInt(val, 16));
  return result ? { r, g, b } : null;
};

const splitSliceJoin = (string, start, end) =>
  string
    .split('')
    .slice(start, end)
    .join('');

// if hex and defined as #fff then convert it to standard 7 letter format #ffffff
const fixedHexFormat = arr =>
  arr.map(c => {
    if (c.length === 4) {
      return `#${c[1] + c[1] + c[2] + c[2] + c[3] + c[3]}`;
    } else if (c.length === 7) {
      return c;
    }
  });

// get r,g,b,h,s and l with Bezier interpolation
// https://www.cl.cam.ac.uk/teaching/2000/AGraphHCI/SMEG/node3.html
// Check issue #3 for more info
export const propBezInterpolate = (charArr, colArr, x) => {
  let y = 1 - x;
  let v;
  return charArr.map(c => {
    if (colArr.length === 2) {
      v = y * colArr[0][c] + x * colArr[1][c];
    } else if (colArr.length === 3) {
      v =
        y ** 2 * colArr[0][c] +
        2 * y * x * colArr[1][c] +
        x ** 2 * colArr[2][c];
    } else if (colArr.length === 4) {
      v =
        y ** 3 * colArr[0][c] +
        3 * y ** 2 * x * colArr[1][c] +
        3 * y * x ** 2 * colArr[2][c] +
        x ** 3 * colArr[3][c];
    }
    return mathTrunc(v);
  });
};

export const extractHEX = arr => fixedHexFormat(arr).map(c => hexToRgb(c));

export const extractRGB = arr =>
  arr.map(c => {
    let [r, g, b] = splitSliceJoin(c, 4, -1).split(',');
    return { r, g, b };
  });

export const extractHSL = arr =>
  arr.map(c => {
    c = splitSliceJoin(c, 4, -1).split(',');
    let h = c[0];
    let s = splitSliceJoin(c[1], 0, -1);
    let l = splitSliceJoin(c[2], 0, -1);
    return { h, s, l };
  });

export const returnRGBStr = arr => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;

export const returnHSLStr = arr => `hsl(${arr[0]}, ${arr[1]}%, ${arr[2]}%)`;
