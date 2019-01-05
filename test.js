import gradstop from './src';

describe('gradstop', () => {
  let options;

  beforeEach(() => {
    options = {
      stops: 5,
      inputFormat: 'hex',
      colorArray: ['#343838', '#00DFFC'],
    };
  });

  it('outputs correct length of color array', () => {
    expect(gradstop(options)).toHaveLength(options.stops);
  });

  it('outputs correct color values according to bezier interpolation', () => {
    expect(gradstop(options)).toEqual([
      'rgb(52, 56, 56)',
      'rgb(39, 97, 105)',
      'rgb(26, 139, 154)',
      'rgb(13, 181, 203)',
      'rgb(0, 223, 252)',
    ]);
  });

  describe('throws error', () => {
    it('if "inputFormat" has an invalid type', () => {
      const invalidOptions = { ...options, inputFormat: 5 };
      expect(() => gradstop(invalidOptions)).toThrow(
        'inputFormat should be a string'
      );
    });

    it('if "inputFormat" is an invalid string', () => {
      const invalidOptions = { ...options, inputFormat: 'rgba' };
      expect(() => gradstop(invalidOptions)).toThrow(
        'Invalid inputFormat value, supported: hex, rgb and hsl'
      );
    });

    it('if "stops" is not an integer', () => {
      const invalidOptions = { ...options, stops: 4.5 };
      expect(() => gradstop(invalidOptions)).toThrow(
        'stops should be an integer'
      );
    });

    it('if "colorArray" is not an array of strings', () => {
      const invalidOptions = {
        ...options,
        colorArray: ['rgb(0, 223, 252)', 123],
      };
      expect(() => gradstop(invalidOptions)).toThrow(
        'colorArray should be an array of color strings'
      );
    });

    it('if "stops" is less than the length of "colorArray"', () => {
      const invalidOptions = {
        ...options,
        stops: 2,
        colorArray: [
          'rgb(52, 56, 56)',
          'rgb(39, 97, 105)',
          'rgb(26, 139, 154)',
        ],
      };
      expect(() => gradstop(invalidOptions)).toThrow(
        'Number of stops cannot be less than colorArray.length'
      );
    });
  });
});
