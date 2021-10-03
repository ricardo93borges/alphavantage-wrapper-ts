import axios from 'axios';
import { StockTimeSeries } from './stock-time-series/StockTimeSeries';

export type Config = {
  apikey: string;
};

class AlphaVantage {
  private baseURL = 'https://www.alphavantage.co';

  stockTimeSeries: StockTimeSeries;

  constructor({ apikey }: Config) {
    const api = axios.create({
      baseURL: this.baseURL,
      params: { apikey },
    });

    this.stockTimeSeries = new StockTimeSeries(api);
  }
}

export default AlphaVantage;
