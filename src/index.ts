import 'module-alias/register'
import { AlphaVantage, Config } from './alphavantage'
import { Interval } from './enum/interval.enum'
import { DataType } from './enum/datatype.enum'
import { OutputSize } from './enum/outputsize.enum'

export * as StockTimeSeries from './stock-time-series/index'
export * as Cryptocurrency from './cryptocurrency/index'
export * as FundamentalData from './fundamental-data/index'

export { Config, Interval, DataType, OutputSize }
export default AlphaVantage
