import axios, { AxiosInstance } from 'axios';

export type Config = {
  apiKey: string;
};

class AlphaVantage {
  private api: AxiosInstance;
  private apiKey: string;

  constructor({ apiKey }: Config) {
    this.apiKey = apiKey;
    this.api = axios.create({
      baseURL: 'https://www.alphavantage.co',
    });
  }
}

export default AlphaVantage;
