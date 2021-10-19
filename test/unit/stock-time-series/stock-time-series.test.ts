import axios, { AxiosInstance } from 'axios';
import { DataType } from '../../../src/enum/datatype.enum';
import { Function } from '../../../src/enum/function.enum';
import { Interval } from '../../../src/enum/interval.enum';
import {
  AlphaVantageRequestError,
  ParseResponseError,
} from '../../../src/errors';
import { OutputSize } from '../../../src/stock-time-series/enum/outputsize.enum';
import { StockTimeSeries } from '../../../src/stock-time-series/StockTimeSeries';

describe('StockTimeSeries', () => {
  let stockTimeSeries: StockTimeSeries;
  let api: AxiosInstance;
  let intradayData = {};
  let searchData = {};
  let dailyAdjustedData = {};
  let weeklyAdjustedData = {};

  beforeEach(() => {
    api = axios.create({
      baseURL: 'http://api.com',
      params: { apikey: 'demo' },
    });

    stockTimeSeries = new StockTimeSeries(api);

    intradayData = {
      'Meta Data': {
        '1. Information':
          'Intraday (5min) open, high, low, close prices and volume',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2021-10-01 18:15:00',
        '4. Interval': '5min',
        '5. Output Size': 'Compact',
        '6. Time Zone': 'US/Eastern',
      },
      'Time Series (5min)': {
        '2021-10-01 18:15:00': {
          '1. open': '143.5500',
          '2. high': '143.5500',
          '3. low': '143.5500',
          '4. close': '143.5500',
          '5. volume': '100',
        },
      },
    };

    searchData = {
      bestMatches: [
        {
          '1. symbol': 'TSCO.LON',
          '2. name': 'Tesco PLC',
          '3. type': 'Equity',
          '4. region': 'United Kingdom',
          '5. marketOpen': '08:00',
          '6. marketClose': '16:30',
          '7. timezone': 'UTC+01',
          '8. currency': 'GBX',
          '9. matchScore': '0.7273',
        },
      ],
    };

    dailyAdjustedData = {
      'Meta Data': {
        '1. Information': 'Daily Time Series with Splits and Dividend Events',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2021-10-15',
        '4. Output Size': 'Compact',
        '5. Time Zone': 'US/Eastern',
      },
      'Time Series (Daily)': {
        '2021-10-15': {
          '1. open': '143.39',
          '2. high': '144.85',
          '3. low': '142.79',
          '4. close': '144.61',
          '5. adjusted close': '144.61',
          '6. volume': '3170857',
          '7. dividend amount': '0.0000',
          '8. split coefficient': '1.0',
        },
      },
    };

    weeklyAdjustedData = {
      'Meta Data': {
        '1. Information': 'Weekly Adjusted Prices and Volumes',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2021-10-18',
        '4. Time Zone': 'US/Eastern',
      },
      'Weekly Adjusted Time Series': {
        '2021-10-18': {
          '1. open': '144.0000',
          '2. high': '144.9400',
          '3. low': '141.7590',
          '4. close': '142.3200',
          '5. adjusted close': '142.3200',
          '6. volume': '6077861',
          '7. dividend amount': '0.0000',
        },
      },
    };
  });

  describe('#intraday', () => {
    it('should make a request to intraday endpoint', async () => {
      api.get = jest.fn().mockResolvedValue({ data: intradayData });

      const intradayDTO = {
        interval: Interval.FIVE_MIN,
        symbol: 'IBM',
        adjusted: true,
        outputsize: OutputSize.COMPACT,
        datatype: DataType.JSON,
      };

      await stockTimeSeries.intraday(intradayDTO);

      expect(api.get).toBeCalledWith('/query', {
        params: { ...intradayDTO, function: Function.TIME_SERIES_INTRADAY },
      });
    });

    it('should return parsed intraday data', async () => {
      const interval = Interval.FIVE_MIN;

      api.get = jest.fn().mockResolvedValue({ data: intradayData });

      const intradayDTO = {
        interval,
        symbol: 'IBM',
        adjusted: true,
        outputsize: OutputSize.COMPACT,
        datatype: DataType.JSON,
      };

      const result = await stockTimeSeries.intraday(intradayDTO);

      expect(result.metadata.symbol).toEqual('IBM');
      expect(result.metadata.interval).toEqual(interval);
      expect(result.metadata.outputSize).toEqual('Compact');
      expect(result.timeSeries['2021-10-01 18:15:00']).toEqual({
        open: '143.5500',
        high: '143.5500',
        low: '143.5500',
        close: '143.5500',
        volume: '100',
      });
    });

    it('should fail to parse intraday data', async () => {
      api.get = jest.fn().mockResolvedValue({});

      try {
        await stockTimeSeries.intraday({
          symbol: 'IBM',
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
        await stockTimeSeries.intraday({
          symbol: 'IBM',
          interval: Interval.FIVE_MIN,
        });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(AlphaVantageRequestError);
      }
    });

    it('should return csv data', async () => {
      const interval = Interval.FIVE_MIN;

      const csvData =
        'timestamp,open,high,low,close,volume\
      2021-10-13 18:25:00,140.8000,140.8000,140.8000,140.8000,107\
      2021-10-13 17:35:00,140.8000,140.8000,140.8000,140.8000,200';

      api.get = jest.fn().mockResolvedValue({ data: csvData });

      const intradayDTO = {
        interval,
        symbol: 'IBM',
        adjusted: true,
        outputsize: OutputSize.COMPACT,
        datatype: DataType.CSV,
      };

      const result = await stockTimeSeries.intraday(intradayDTO);

      expect(result).toEqual(csvData);
    });
  });

  describe('#search', () => {
    it('should make a request to search endpoint', async () => {
      api.get = jest.fn().mockResolvedValue({ data: searchData });

      const searchDTO = {
        keywords: 'IBM',
        datatype: DataType.JSON,
      };

      await stockTimeSeries.search(searchDTO);

      expect(api.get).toBeCalledWith('/query', {
        params: { ...searchDTO, function: Function.SYMBOL_SEARCH },
      });
    });

    it('should return parsed search data', async () => {
      api.get = jest.fn().mockResolvedValue({ data: searchData });

      const searchDTO = {
        keywords: 'TSCO',
        datatype: DataType.JSON,
      };

      const result = await stockTimeSeries.search(searchDTO);

      expect(result).toEqual([
        {
          symbol: 'TSCO.LON',
          name: 'Tesco PLC',
          type: 'Equity',
          region: 'United Kingdom',
          marketOpen: '08:00',
          marketClose: '16:30',
          timezone: 'UTC+01',
          currency: 'GBX',
          matchScore: '0.7273',
        },
      ]);
    });

    it('should fail to parse search data', async () => {
      api.get = jest.fn().mockResolvedValue({});

      try {
        await stockTimeSeries.search({ keywords: 'TSCO' });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(ParseResponseError);
      }
    });

    it('should fail to request to search endpoint', async () => {
      api.get = jest.fn().mockRejectedValue(new Error());

      try {
        await stockTimeSeries.search({ keywords: 'TSCO' });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(AlphaVantageRequestError);
      }
    });

    it('should return csv data', async () => {
      const csvData =
        'symbol,name,type,region,marketOpen,marketClose,timezone,currency,matchScore\
      BA,Boeing Company,Equity,United States,09:30,16:00,UTC-04,USD,1.0000\
      BAB,Invesco Taxable Municipal Bond ETF,ETF,United States,09:30,16:00,UTC-04,USD,0.8000';

      api.get = jest.fn().mockResolvedValue({ data: csvData });

      const searchDTO = {
        keywords: 'TSCO',
        datatype: DataType.CSV,
      };

      const result = await stockTimeSeries.search(searchDTO);

      expect(result).toEqual(csvData);
    });
  });

  describe('#dailyAdjusted', () => {
    it('should make a request to daily adjusted endpoint', async () => {
      api.get = jest.fn().mockResolvedValue({ data: dailyAdjustedData });

      const dailyAdjustedDTO = {
        symbol: 'IBM',
        outputsize: OutputSize.COMPACT,
        datatype: DataType.JSON,
      };

      await stockTimeSeries.dailyAdjusted(dailyAdjustedDTO);

      expect(api.get).toBeCalledWith('/query', {
        params: {
          ...dailyAdjustedDTO,
          function: Function.TIME_SERIES_DAILY_ADJUSTED,
        },
      });
    });

    it('should return parsed daily adjusted data', async () => {
      api.get = jest.fn().mockResolvedValue({ data: dailyAdjustedData });

      const dailyAdjustedDTO = {
        symbol: 'IBM',
        outputsize: OutputSize.COMPACT,
        datatype: DataType.JSON,
      };

      const result = await stockTimeSeries.dailyAdjusted(dailyAdjustedDTO);

      expect(result.metadata.symbol).toEqual('IBM');
      expect(result.metadata.outputSize).toEqual('Compact');
      expect(result.timeSeries['2021-10-15']).toEqual({
        open: '143.39',
        high: '144.85',
        low: '142.79',
        close: '144.61',
        adjustedClose: '144.61',
        volume: '3170857',
        dividendAmount: '0.0000',
        splitCoefficient: '1.0',
      });
    });

    it('should fail to parse daily adjusted data', async () => {
      api.get = jest.fn().mockResolvedValue({});

      try {
        await stockTimeSeries.dailyAdjusted({
          symbol: 'IBM',
        });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(ParseResponseError);
      }
    });

    it('should throw AlphaVantageRequestError because it fail to request daily adjusted data', async () => {
      api.get = jest.fn().mockRejectedValue(new Error('some error'));

      try {
        await stockTimeSeries.dailyAdjusted({
          symbol: 'IBM',
        });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(AlphaVantageRequestError);
      }
    });

    it('should return csv data', async () => {
      const csvData =
        'timestamp,open,high,low,close,adjusted_close,volume,dividend_amount,split_coefficient\
        2021-10-15,143.39,144.85,142.79,144.61,144.61,3170857,0.0000,1.0\
        2021-10-14,141.04,143.92,141.01,143.39,143.39,4217305,0.0000,1.0';

      api.get = jest.fn().mockResolvedValue({ data: csvData });

      const dailyAdjustedDTO = {
        symbol: 'IBM',
        outputsize: OutputSize.COMPACT,
        datatype: DataType.CSV,
      };

      const result = await stockTimeSeries.dailyAdjusted(dailyAdjustedDTO);

      expect(result).toEqual(csvData);
    });
  });

  describe('#weeklyAdjusted', () => {
    it('should make a request to weekly adjusted endpoint', async () => {
      api.get = jest.fn().mockResolvedValue({ data: weeklyAdjustedData });

      const weeklyAdjustedDTO = {
        symbol: 'IBM',
        datatype: DataType.JSON,
      };

      await stockTimeSeries.weeklyAdjusted(weeklyAdjustedDTO);

      expect(api.get).toBeCalledWith('/query', {
        params: {
          ...weeklyAdjustedDTO,
          function: Function.TIME_SERIES_WEEKLY_ADJUSTED,
        },
      });
    });

    it('should return parsed weekly adjusted data', async () => {
      api.get = jest.fn().mockResolvedValue({ data: weeklyAdjustedData });

      const weeklyAdjustedDTO = {
        symbol: 'IBM',
        datatype: DataType.JSON,
      };

      const result = await stockTimeSeries.weeklyAdjusted(weeklyAdjustedDTO);

      expect(result.metadata.symbol).toEqual('IBM');
      expect(result.timeSeries['2021-10-18']).toEqual({
        open: '144.0000',
        high: '144.9400',
        low: '141.7590',
        close: '142.3200',
        adjustedClose: '142.3200',
        volume: '6077861',
        dividendAmount: '0.0000',
      });
    });

    it('should fail to parse weekly adjusted data', async () => {
      api.get = jest.fn().mockResolvedValue({});

      try {
        await stockTimeSeries.weeklyAdjusted({
          symbol: 'IBM',
        });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(ParseResponseError);
      }
    });

    it('should throw AlphaVantageRequestError because it fail to request weekly adjusted data', async () => {
      api.get = jest.fn().mockRejectedValue(new Error('some error'));

      try {
        await stockTimeSeries.weeklyAdjusted({
          symbol: 'IBM',
        });
        fail('should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(AlphaVantageRequestError);
      }
    });

    it('should return csv data', async () => {
      const csvData =
        'timestamp,open,high,low,close,adjusted_close,volume,dividend_amount,split_coefficient\
        2021-10-15,143.39,144.85,142.79,144.61,144.61,3170857,0.0000,1.0\
        2021-10-14,141.04,143.92,141.01,143.39,143.39,4217305,0.0000,1.0';

      api.get = jest.fn().mockResolvedValue({ data: csvData });

      const dailyAdjustedDTO = {
        symbol: 'IBM',
        datatype: DataType.CSV,
      };

      const result = await stockTimeSeries.weeklyAdjusted(dailyAdjustedDTO);

      expect(result).toEqual(csvData);
    });
  });
});
