import axios from 'axios';
import { API_URL } from '../../../src/config';
import { Interval } from '../../../src/enum/interval.enum';
import { StockTimeSeries } from '../../../src/stock-time-series/StockTimeSeries';
import { getApiKey } from '../../utils';

describe('StockTimeSeries', () => {
  const api = axios.create({
    baseURL: API_URL,
    params: { apikey: getApiKey() },
  });

  describe('#intraday', () => {
    it('should make a request to intraday endpoint', async () => {
      let stockTimeSeries = new StockTimeSeries(api);

      let hasError = false;
      try {
        await stockTimeSeries.intraday({
          symbol: 'IBM',
          interval: Interval.SIXTY_MIN,
        });
      } catch (err) {
        console.error(err);
        hasError = true;
      }

      expect(hasError).toBe(false);
    });
  });

  describe('#search', () => {
    it('should make a request to search endpoint', async () => {
      let stockTimeSeries = new StockTimeSeries(api);

      let hasError = false;
      try {
        await stockTimeSeries.search({
          keywords: 'IBM',
        });
      } catch (err) {
        console.error(err);
        hasError = true;
      }

      expect(hasError).toBe(false);
    });
  });

  describe('#dailyAdjusted', () => {
    it('should make a request to daily adjusted endpoint', async () => {
      let stockTimeSeries = new StockTimeSeries(api);

      let hasError = false;
      try {
        await stockTimeSeries.dailyAdjusted({
          symbol: 'IBM',
        });
      } catch (err) {
        console.error(err);
        hasError = true;
      }

      expect(hasError).toBe(false);
    });
  });

  describe('#weeklyAdjusted', () => {
    it('should make a request to weekly adjusted endpoint', async () => {
      let stockTimeSeries = new StockTimeSeries(api);

      let hasError = false;
      try {
        await stockTimeSeries.weeklyAdjusted({
          symbol: 'IBM',
        });
      } catch (err) {
        console.error(err);
        hasError = true;
      }

      expect(hasError).toBe(false);
    });
  });
});
