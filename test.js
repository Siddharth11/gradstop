import gradstop from './src';
import * as utils from './src/utils';

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

  describe('outputs correct color values according to bezier interpolation', () => {
    describe('for hex', () => {
      it('with 2 items in color array', () => {
        expect(gradstop(options)).toEqual([
          'rgb(52, 56, 56)',
          'rgb(39, 97, 105)',
          'rgb(26, 139, 154)',
          'rgb(13, 181, 203)',
          'rgb(0, 223, 252)',
        ]);
      });

      it('with 3 items in color array', () => {
        const newOptions = {
          ...options,
          colorArray: ['#343838', '#fff', '#00DFFC'],
        };
        expect(gradstop(newOptions)).toEqual([
          'rgb(52, 56, 56)',
          'rgb(124, 141, 142)',
          'rgb(140, 197, 204)',
          'rgb(98, 224, 240)',
          'rgb(0, 223, 252)',
        ]);
      });
      it('with 4 items in color array', () => {
        const newOptions = {
          ...options,
          colorArray: ['#343838', '#fff', '#fff', '#00DFFC'],
        };
        expect(gradstop(newOptions)).toEqual([
          'rgb(52, 56, 56)',
          'rgb(165, 170, 171)',
          'rgb(197, 226, 229)',
          'rgb(144, 238, 250)',
          'rgb(0, 223, 252)',
        ]);
      });
    });

    describe('for rgb', () => {
      it('with 2 items in color array', () => {
        const newOptions = {
          inputFormat: 'rgb',
          colorArray: ['rgb(52, 56, 56)', 'rgb(0, 223, 252)'],
        };
        expect(gradstop(newOptions)).toEqual([
          'rgb(52, 56, 56)',
          'rgb(39, 97, 105)',
          'rgb(26, 139, 154)',
          'rgb(13, 181, 203)',
          'rgb(0, 223, 252)',
        ]);
      });

      it('with 3 items in color array', () => {
        const newOptions = {
          inputFormat: 'rgb',
          colorArray: [
            'rgb(52, 56, 56)',
            'rgb(255, 255, 255)',
            'rgb(0, 223, 252)',
          ],
        };
        expect(gradstop(newOptions)).toEqual([
          'rgb(52, 56, 56)',
          'rgb(124, 141, 142)',
          'rgb(140, 197, 204)',
          'rgb(98, 224, 240)',
          'rgb(0, 223, 252)',
        ]);
      });

      it('with 4 items in color array', () => {
        const newOptions = {
          inputFormat: 'rgb',
          colorArray: [
            'rgb(52, 56, 56)',
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
            'rgb(0, 223, 252)',
          ],
        };
        expect(gradstop(newOptions)).toEqual([
          'rgb(52, 56, 56)',
          'rgb(165, 170, 171)',
          'rgb(197, 226, 229)',
          'rgb(144, 238, 250)',
          'rgb(0, 223, 252)',
        ]);
      });
    });

    describe('for hsl', () => {
      it('with 2 items in color array', () => {
        const newOptions = {
          inputFormat: 'hsl',
          colorArray: ['hsl(180, 4%, 21%)', 'hsl(187, 100%, 49%)'],
        };
        expect(gradstop(newOptions)).toEqual([
          'hsl(180, 4%, 21%)',
          'hsl(181, 28%, 28%)',
          'hsl(183, 52%, 35%)',
          'hsl(185, 76%, 42%)',
          'hsl(187, 100%, 49%)',
        ]);
      });

      it('with 3 items in color array', () => {
        const newOptions = {
          inputFormat: 'hsl',
          colorArray: [
            'hsl(180, 4%, 21%)',
            'hsl(0, 0%, 100%)',
            'hsl(187, 100%, 49%)',
          ],
        };
        expect(gradstop(newOptions)).toEqual([
          'hsl(180, 4%, 21%)',
          'hsl(112, 8%, 52%)',
          'hsl(91, 26%, 67%)',
          'hsl(116, 56%, 66%)',
          'hsl(187, 100%, 49%)',
        ]);
      });

      it('with 4 items in color array', () => {
        const newOptions = {
          inputFormat: 'hsl',
          colorArray: [
            'hsl(180, 4%, 21%)',
            'hsl(0, 0%, 100%)',
            'hsl(0, 0%, 100%)',
            'hsl(187, 100%, 49%)',
          ],
        };
        expect(gradstop(newOptions)).toEqual([
          'hsl(180, 4%, 21%)',
          'hsl(78, 3%, 65%)',
          'hsl(45, 13%, 83%)',
          'hsl(81, 42%, 77%)',
          'hsl(187, 100%, 49%)',
        ]);
      });
    });
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

describe('utility function', () => {
  it('hexToRgb converts a hex string to rgb object', () => {
    expect(utils.hexToRgb('#343838')).toEqual({ r: 52, g: 56, b: 56 });
  });

  it('standardizeHexValues converts an array of shorthand hex strings into standard format', () => {
    expect(utils.standardizeHexValues(['#343', '#eae'])).toEqual([
      '#334433',
      '#eeaaee',
    ]);
  });

  it('extractHEX takes an array of hex strings and generates an array of rgb objects', () => {
    expect(utils.extractHEX(['#343838', '#00DFFC'])).toEqual([
      { r: 52, g: 56, b: 56 },
      { r: 0, g: 223, b: 252 },
    ]);
  });

  it('extractRGB takes an array of rgb strings and generates an array of rgb objects', () => {
    expect(utils.extractRGB(['rgb(52, 56, 56)', 'rgb(0, 223, 252)'])).toEqual([
      { r: 52, g: 56, b: 56 },
      { r: 0, g: 223, b: 252 },
    ]);
  });

  it('extractHSL takes an array of hsl strings and generates an array of hsl objects', () => {
    expect(
      utils.extractHSL(['hsl(180, 4%, 21%)', 'hsl(187, 100%, 49%)'])
    ).toEqual([{ h: 180, s: 4, l: 21 }, { h: 187, s: 100, l: 49 }]);
  });

  it('getRGBString takes an rgb object and returns an rgb string', () => {
    expect(utils.getRGBString({ r: 52, g: 56, b: 56 })).toEqual(
      'rgb(52, 56, 56)'
    );
  });

  it('getHSLString takes an hsl object and returns an hsl string', () => {
    expect(utils.getHSLString({ h: 180, s: 4, l: 21 })).toEqual(
      'hsl(180, 4%, 21%)'
    );
  });
});
