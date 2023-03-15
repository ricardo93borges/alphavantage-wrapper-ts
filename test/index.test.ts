import AlphaVantage from '../src'
import { StockTimeSeries } from '../src/stock-time-series/StockTimeSeries'

describe('#AlphaVantage', () => {
  it('should instantiate AlphaVantage class without errors', () => {
    let hasError = false
    try {
      new AlphaVantage({ apikey: 'demo' })
    } catch (err) {
      hasError = true
    }
    expect(hasError).toBe(false)
  })

  it('should instantiate AlphaVantage class with categories', () => {
    const alphavantage = new AlphaVantage({ apikey: 'demo' })
    expect(alphavantage.stockTimeSeries).toBeInstanceOf(StockTimeSeries)
  })
})
