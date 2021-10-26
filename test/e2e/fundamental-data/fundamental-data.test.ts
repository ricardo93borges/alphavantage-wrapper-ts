import axios from 'axios';
import { API_URL } from '../../../src/config';
import { FundamentalData } from '../../../src/fundamental-data/FundamentalData';
import { getApiKey } from '../../utils';

describe('FundamentalData', () => {
  const api = axios.create({
    baseURL: API_URL,
    params: { apikey: getApiKey() },
  });

  describe('#companyOverview', () => {
    it('should make a request to company overview endpoint', async () => {
      let fundamentalData = new FundamentalData(api);

      let hasError = false;
      try {
        await fundamentalData.companyOverview({
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
