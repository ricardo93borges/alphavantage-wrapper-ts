import axios, { AxiosInstance } from 'axios';
import { DataType } from '../../src/enum/datatype.enum';
import { Interval } from '../../src/enum/interval.enum';
import { AlphaVantageRequestError } from '../../src/errors';
import { OutputSize } from '../../src/stock-time-series/enum/outputsize.enum';
import { StockTimeSeries } from '../../src/stock-time-series/StockTimeSeries';

describe('#StockTimeSeries', () => {
  let stockTimeSeries: StockTimeSeries;
  let api: AxiosInstance;

  beforeEach(() => {
    api = axios.create({
      baseURL: 'http://api.com',
      params: { apikey: 'demo' },
    });

    stockTimeSeries = new StockTimeSeries(api);
  });

  describe('#intraday', () => {
    it('should instantiate AlphaVantage class without errors', async () => {
      const intradayData = {
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

      api.get = jest.fn().mockResolvedValue({ data: intradayData });

      const intradayDTO = {
        symbol: 'IBM',
        interval: Interval.FIVE_MIN,
        adjusted: true,
        outputsize: OutputSize.COMPACT,
        datatype: DataType.JSON,
      };

      const result = await stockTimeSeries.intraday(intradayDTO);

      expect(result.metadata.symbol).toEqual('IBM');
      expect(result.metadata.interval).toEqual(Interval.FIVE_MIN);
      expect(result.metadata.outputSize).toEqual('Compact');
      expect(result.timeSeries['2021-10-01 18:15:00']).toEqual({
        open: '143.5500',
        high: '143.5500',
        low: '143.5500',
        close: '143.5500',
        volume: '100',
      });
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
  });
});
