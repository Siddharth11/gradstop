import gradstop from './src/main';

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
});
