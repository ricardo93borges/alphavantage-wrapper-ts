import axios from 'axios';
import { API_URL } from '../../../src/config';
import { Cryptocurrency } from '../../../src/cryptocurrency/Cryptocurrency';
import { Interval } from '../../../src/enum/interval.enum';
import { getApiKey } from '../../utils';

describe('Cryptocurrency', () => {
  const api = axios.create({
    baseURL: API_URL,
    params: { apikey: getApiKey() },
  });

  describe('#intraday', () => {
    it('should make a request to intraday endpoint', async () => {
      let cryptocurrency = new Cryptocurrency(api);

      let hasError = false;
      try {
        await cryptocurrency.intraday({
          symbol: 'ETH',
          market: 'USD',
          interval: Interval.SIXTY_MIN,
        });
      } catch (err) {
        console.error(err);
        hasError = true;
      }

      expect(hasError).toBe(false);
    });
  });

  describe('#monthly', () => {
    it('should make a request to monthly endpoint', async () => {
      let cryptocurrency = new Cryptocurrency(api);

      let hasError = false;
      try {
        await cryptocurrency.monthly({
          symbol: 'ETH',
          market: 'USD',
        });
      } catch (err) {
        console.error(err);
        hasError = true;
      }

      expect(hasError).toBe(false);
    });
  });
});
