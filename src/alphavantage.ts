import axios from 'axios'
import { API_URL } from './config'
import { StockTimeSeries } from './stock-time-series/StockTimeSeries'
import { FundamentalData } from './fundamental-data/FundamentalData'
import { Cryptocurrency } from './cryptocurrency/Cryptocurrency'

export type Config = {
  apikey: string
}

export class AlphaVantage {
  stockTimeSeries: StockTimeSeries
  fundamentalData: FundamentalData
  cryptocurrency: Cryptocurrency

  constructor({ apikey }: Config) {
    const api = axios.create({
      baseURL: API_URL,
      params: { apikey }
    })

    this.stockTimeSeries = new StockTimeSeries(api)
    this.fundamentalData = new FundamentalData(api)
    this.cryptocurrency = new Cryptocurrency(api)
  }
}
