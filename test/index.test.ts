import AlphaVantage from '../src';

describe('#AlphaVantage', () => {
  it('should instantiate AlphaVantage class without errors', () => {
    let hasError = false;
    try {
      new AlphaVantage({ apiKey: 'demo' });
    } catch (err) {
      hasError = true;
    }
    expect(hasError).toBe(false);
  });
});
