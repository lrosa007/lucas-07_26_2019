import formatter from '../formatter';

describe('formatter', () => {
  it('return abbreviated byte sizes', () => {
    expect(formatter(1000)).toBe('1kb');
  });
});
