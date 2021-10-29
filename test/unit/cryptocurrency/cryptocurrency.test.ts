import axios, { AxiosInstance } from 'axios';
import { Cryptocurrency } from '../../../src/cryptocurrency/Cryptocurrency';
import { DataType } from '../../../src/enum/datatype.enum';
import { Function } from '../../../src/enum/function.enum';
import { Interval } from '../../../src/enum/interval.enum';
import {
  AlphaVantageRequestError,
  ParseResponseError,
} from '../../../src/errors';
import { OutputSize } from '../../../src/stock-time-series/enum/outputsize.enum';
import {
  givenIntradayResponse,
  givenMonthlyResponse,
} from '../helpers/data-builders/cryptocurrency.builder';

describe('Cryptocurrency', () => {
  let cryptocurrency: Cryptocurrency;
  let api: AxiosInstance;

  beforeEach(() => {
    api = axios.create({
      baseURL: 'http://api.com',
      params: { apikey: 'demo' },
    });

    cryptocurrency = new Cryptocurrency(api);
  });

  describe('#intraday', () => {
    it('should make a request to intraday endpoint', async () => {
      api.get = jest.fn().mockResolvedValue({ data: givenIntradayResponse() });

      const intradayDTO = {
        symbol: 'ETH',
        market: 'USD',
        interval: Interval.FIVE_MIN,
        outputsize: OutputSize.COMPACT,
        datatype: DataType.JSON,
      };

      await cryptocurrency.intraday(intradayDTO);

      expect(api.get).toBeCalledWith('/query', {
        params: { ...intradayDTO, function: Function.CRYPTO_INTRADAY },
      });
    });

    it('should return parsed intraday data', async () => {
      const interval = Interval.FIVE_MIN;

      api.get = jest.fn().mockResolvedValue({ data: givenIntradayResponse() });

      const intradayDTO = {
        symbol: 'ETH',
        market: 'USD',
        interval: Interval.FIVE_MIN,
        outputsize: OutputSize.COMPACT,
        datatype: DataType.JSON,
      };

      const result = await cryptocurrency.intraday(intradayDTO);

      expect(result.metadata.digitalCurrencyCode).toEqual('ETH');
      expect(result.metadata.digitalCurrencyName).toEqual('Ethereum');
      expect(result.metadata.interval).toEqual(interval);
      expect(result.metadata.outputSize).toEqual('Compact');
      expect(result.timeSeries['2021-10-28 23:20:00']).toEqual({
        open: '4276.53000',
        high: '4279.85000',
        low: '4272.61000',
        close: '4279.47000',
        volume: 205,
      });
    });

    it('should fail to parse intraday data', async () => {
      api.get = jest.fn().mockResolvedValue({});

      try {
        await cryptocurrency.intraday({
          symbol: 'ETH',
          market: 'USD',
          interval: Interval.FIVE_MIN,
        });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(ParseResponseError);
      }
    });

    it('should throw AlphaVantageRequestError because it fail to request intraday data', async () => {
      api.get = jest.fn().mockRejectedValue(new Error('some error'));

      try {
        await cryptocurrency.intraday({
          symbol: 'ETH',
          market: 'USD',
          interval: Interval.FIVE_MIN,
        });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(AlphaVantageRequestError);
      }
    });

    it('should return csv data', async () => {
      const csvData =
        'timestamp,open,high,low,close,volume\
        2021-10-29 00:10:00,4286.90000,4289.64000,4285.61000,4287.79000,428\
        2021-10-29 00:05:00,4282.25000,4300.00000,4282.25000,4286.55000,3238';

      api.get = jest.fn().mockResolvedValue({ data: csvData });

      const intradayDTO = {
        symbol: 'ETH',
        market: 'USD',
        interval: Interval.FIVE_MIN,
        outputsize: OutputSize.COMPACT,
        datatype: DataType.CSV,
      };

      const result = await cryptocurrency.intraday(intradayDTO);

      expect(result).toEqual(csvData);
    });
  });

  describe('#monthly', () => {
    it('should make a request to monthly endpoint', async () => {
      api.get = jest.fn().mockResolvedValue({ data: givenMonthlyResponse() });

      const monthlyDTO = {
        symbol: 'ETH',
        market: 'CNY',
        datatype: DataType.JSON,
      };

      await cryptocurrency.monthly(monthlyDTO);

      expect(api.get).toBeCalledWith('/query', {
        params: { ...monthlyDTO, function: Function.DIGITAL_CURRENCY_MONTHLY },
      });
    });

    it('should return parsed monthly data', async () => {
      api.get = jest.fn().mockResolvedValue({ data: givenMonthlyResponse() });

      const monthlyDTO = {
        symbol: 'ETH',
        market: 'CNY',
        datatype: DataType.JSON,
      };

      const result = await cryptocurrency.monthly(monthlyDTO);

      expect(result.metadata.digitalCurrencyCode).toEqual('ETH');
      expect(result.metadata.digitalCurrencyName).toEqual('Ethereum');
      expect(result.timeSeries['2021-10-29']).toEqual({
        openMarket: '19180.86322600',
        openUSD: '3000.62000000',
        highMarket: '28161.27765000',
        highUSD: '4405.50000000',
        lowMarket: '18979.18616100',
        lowUSD: '2969.07000000',
        closeMarket: '27845.56195300',
        closeUSD: '4356.11000000',
        volume: '13202580.62690000',
        marketCap: '13202580.62690000',
      });
    });

    it('should fail to parse monthly data', async () => {
      api.get = jest.fn().mockResolvedValue({});

      try {
        await cryptocurrency.monthly({
          symbol: 'ETH',
          market: 'USD',
        });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(ParseResponseError);
      }
    });

    it('should throw AlphaVantageRequestError because it fail to request monthly data', async () => {
      api.get = jest.fn().mockRejectedValue(new Error('some error'));

      try {
        await cryptocurrency.monthly({
          symbol: 'ETH',
          market: 'USD',
        });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(AlphaVantageRequestError);
      }
    });

    it('should return csv data', async () => {
      const csvData =
        'timestamp,open,high,low,close,volume\
        2021-10-29 00:10:00,4286.90000,4289.64000,4285.61000,4287.79000,428\
        2021-10-29 00:05:00,4282.25000,4300.00000,4282.25000,4286.55000,3238';

      api.get = jest.fn().mockResolvedValue({ data: csvData });

      const monthlyDTO = {
        symbol: 'ETH',
        market: 'USD',
        datatype: DataType.CSV,
      };

      const result = await cryptocurrency.monthly(monthlyDTO);

      expect(result).toEqual(csvData);
    });
  });
});
