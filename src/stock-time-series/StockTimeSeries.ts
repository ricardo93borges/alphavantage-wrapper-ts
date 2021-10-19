import { AxiosInstance } from 'axios';
import { DataType } from '..';
import { Category } from '../Category';
import { Function } from '../enum/function.enum';
import { Interval } from '../enum/interval.enum';
import { AlphaVantageRequestError, ParseResponseError } from '../errors';
import {
  DailyAdjustedResponseDTO,
  DailyAdjustedTimeSeries,
} from './dto/daily-adjusted-response.dto';
import { DailyAdjustedDTO } from './dto/daily-adjusted.dto';
import {
  APIResponseMetadata,
  APIResponseTimeSeriesItem,
  TimeSeriesAPIResponse,
} from './dto/time-series-api-response.dto';
import {
  IntradayResponseDTO,
  IntradayTimeSeries,
} from './dto/intraday-response.dto';
import { IntradayDTO } from './dto/intraday.dto';
import { SearchAPIResponseDTO } from './dto/search-api-response.dto';
import { SearchResponseDTO } from './dto/search-response.dto';
import { SearchDTO } from './dto/search.dto';
import { WeeklyAdjustedDTO } from './dto/weekly-adjusted.dto';
import {
  WeeklyAdjustedResponseDTO,
  WeeklyAdjustedTimeSeries,
} from './dto/weekly-adjusted-response.dto';

export class StockTimeSeries extends Category {
  constructor(api: AxiosInstance) {
    super(api);
  }

  protected parseIntradayResponse(
    data: TimeSeriesAPIResponse,
    interval: Interval,
  ): IntradayResponseDTO {
    try {
      const apiResponseMetadata = data['Meta Data'] as APIResponseMetadata;
      const metadata = {
        information: apiResponseMetadata['1. Information'],
        symbol: apiResponseMetadata['2. Symbol'],
        lastRefreshed: apiResponseMetadata['3. Last Refreshed'],
        interval: apiResponseMetadata['4. Interval'],
        outputSize: apiResponseMetadata['5. Output Size'],
        timeZone: apiResponseMetadata['6. Time Zone'],
      };

      const timeSeriesKeys = Object.keys(data[`Time Series (${interval})`]);
      let timeSeries: { [key: string]: IntradayTimeSeries } = {};

      for (let i = 0; i < timeSeriesKeys.length; i++) {
        let key = timeSeriesKeys[i];
        let timeSeriesItem = data[`Time Series (${interval})`][
          key
        ] as APIResponseTimeSeriesItem;

        timeSeries[key] = {
          open: timeSeriesItem['1. open'],
          high: timeSeriesItem['2. high'],
          low: timeSeriesItem['3. low'],
          close: timeSeriesItem['4. close'],
          volume: timeSeriesItem['5. volume'],
        };
      }

      return { metadata, timeSeries };
    } catch (err) {
      throw new ParseResponseError('fail to parse intraday response', err);
    }
  }

  protected parseDailyAdjustedResponse(
    data: TimeSeriesAPIResponse,
  ): DailyAdjustedResponseDTO {
    try {
      const apiResponseMetadata = data['Meta Data'] as APIResponseMetadata;
      const metadata = {
        information: apiResponseMetadata['1. Information'],
        symbol: apiResponseMetadata['2. Symbol'],
        lastRefreshed: apiResponseMetadata['3. Last Refreshed'],
        outputSize: apiResponseMetadata['4. Output Size'],
        timeZone: apiResponseMetadata['5. Time Zone'],
      };

      const timeSeriesKeys = Object.keys(data['Time Series (Daily)']);
      let timeSeries: { [key: string]: DailyAdjustedTimeSeries } = {};

      for (let i = 0; i < timeSeriesKeys.length; i++) {
        let key = timeSeriesKeys[i];
        let timeSeriesItem = data['Time Series (Daily)'][
          key
        ] as APIResponseTimeSeriesItem;

        timeSeries[key] = {
          open: timeSeriesItem['1. open'],
          high: timeSeriesItem['2. high'],
          low: timeSeriesItem['3. low'],
          close: timeSeriesItem['4. close'],
          adjustedClose: timeSeriesItem['5. adjusted close'],
          volume: timeSeriesItem['6. volume'],
          dividendAmount: timeSeriesItem['7. dividend amount'],
          splitCoefficient: timeSeriesItem['8. split coefficient'],
        };
      }

      return { metadata, timeSeries };
    } catch (err) {
      throw new ParseResponseError(
        'fail to parse daily adjusted response',
        err,
      );
    }
  }

  protected parseWeeklyAdjustedResponse(
    data: TimeSeriesAPIResponse,
  ): WeeklyAdjustedResponseDTO {
    try {
      const apiResponseMetadata = data['Meta Data'] as APIResponseMetadata;
      const metadata = {
        information: apiResponseMetadata['1. Information'],
        symbol: apiResponseMetadata['2. Symbol'],
        lastRefreshed: apiResponseMetadata['3. Last Refreshed'],
        timeZone: apiResponseMetadata['5. Time Zone'],
      };

      const timeSeriesKeys = Object.keys(data['Weekly Adjusted Time Series']);
      let timeSeries: { [key: string]: WeeklyAdjustedTimeSeries } = {};

      for (let i = 0; i < timeSeriesKeys.length; i++) {
        let key = timeSeriesKeys[i];
        let timeSeriesItem = data['Weekly Adjusted Time Series'][
          key
        ] as APIResponseTimeSeriesItem;

        timeSeries[key] = {
          open: timeSeriesItem['1. open'],
          high: timeSeriesItem['2. high'],
          low: timeSeriesItem['3. low'],
          close: timeSeriesItem['4. close'],
          adjustedClose: timeSeriesItem['5. adjusted close'],
          volume: timeSeriesItem['6. volume'],
          dividendAmount: timeSeriesItem['7. dividend amount'],
        };
      }

      return { metadata, timeSeries };
    } catch (err) {
      throw new ParseResponseError(
        'fail to parse weekly adjusted response',
        err,
      );
    }
  }

  protected parseSearchResponse(
    data: SearchAPIResponseDTO,
  ): SearchResponseDTO[] {
    try {
      return data['bestMatches'].map((match) => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: match['3. type'],
        region: match['4. region'],
        marketOpen: match['5. marketOpen'],
        marketClose: match['6. marketClose'],
        timezone: match['7. timezone'],
        currency: match['8. currency'],
        matchScore: match['9. matchScore'],
      }));
    } catch (err) {
      throw new ParseResponseError('fail to parse search response', err);
    }
  }

  async intraday(intradayDTO: IntradayDTO): Promise<IntradayResponseDTO> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...intradayDTO, function: Function.TIME_SERIES_INTRADAY },
      });

      if (intradayDTO.datatype === DataType.CSV) {
        return data;
      }

      return this.parseIntradayResponse(data, intradayDTO.interval);
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError('fail to get intraday data', err);
    }
  }

  async search(searchDTO: SearchDTO): Promise<SearchResponseDTO[]> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...searchDTO, function: Function.SYMBOL_SEARCH },
      });

      if (searchDTO.datatype === DataType.CSV) {
        return data;
      }

      return this.parseSearchResponse(data);
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError('fail to get search data', err);
    }
  }

  async dailyAdjusted(
    dailyAdjustedDTO: DailyAdjustedDTO,
  ): Promise<DailyAdjustedResponseDTO> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...dailyAdjustedDTO,
          function: Function.TIME_SERIES_DAILY_ADJUSTED,
        },
      });

      if (dailyAdjustedDTO.datatype === DataType.CSV) {
        return data;
      }

      return this.parseDailyAdjustedResponse(data);
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError(
        'fail to get daily adjusted data',
        err,
      );
    }
  }

  async weeklyAdjusted(
    weeklyAdjustedDTO: WeeklyAdjustedDTO,
  ): Promise<WeeklyAdjustedResponseDTO> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...weeklyAdjustedDTO,
          function: Function.TIME_SERIES_WEEKLY_ADJUSTED,
        },
      });

      if (weeklyAdjustedDTO.datatype === DataType.CSV) {
        return data;
      }

      return this.parseWeeklyAdjustedResponse(data);
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError(
        'fail to get weekly adjusted data',
        err,
      );
    }
  }
}
