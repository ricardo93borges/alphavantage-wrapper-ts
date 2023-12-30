import 'module-alias/register'
import { AlphaVantage, Config } from './alphavantage'

export * from './enum'
export * as StockTimeSeries from './stock-time-series/index'
export * as Cryptocurrency from './cryptocurrency/index'
export * as FundamentalData from './fundamental-data/index'

export { Config }
export default AlphaVantage
