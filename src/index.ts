import axios from 'axios';
import { API_URL } from './config';
import { StockTimeSeries } from './stock-time-series/StockTimeSeries';

export type Config = {
  apikey: string;
};

class AlphaVantage {
  stockTimeSeries: StockTimeSeries;

  constructor({ apikey }: Config) {
    const api = axios.create({
      baseURL: API_URL,
      params: { apikey },
    });

    this.stockTimeSeries = new StockTimeSeries(api);
  }
}

export default AlphaVantage;
