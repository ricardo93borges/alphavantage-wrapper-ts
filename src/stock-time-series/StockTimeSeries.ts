import { AxiosInstance } from 'axios';
import { DataType } from '..';
import { Category } from '../Category';
import { Function } from '../enum/function.enum';
import { AlphaVantageRequestError, ParseResponseError } from '../errors';
import { DailyAdjustedResponse } from './dto/daily-adjusted-response.dto';
import { DailyAdjustedDTO } from './dto/daily-adjusted.dto';
import { IntradayResponse } from './dto/intraday-response.dto';
import { IntradayDTO } from './dto/intraday.dto';
import { SearchResponse } from './dto/search-response.dto';
import { SearchDTO } from './dto/search.dto';
import { WeeklyAdjustedDTO } from './dto/weekly-adjusted.dto';
import { MonthlyAdjustedDTO } from './dto/monthly-adjusted.dto';
import { MonthlyAdjustedResponse } from './dto/monthly-adjusted-response.dto';
import {
  getParseDailyAdjustedResponseMap,
  getParseDailyResponseMap,
  getParseIntradayResponseMap,
  getParseMonthlyAdjustedResponseMap,
  getParseMonthlyResponseMap,
  getParseWeeklyAdjustedResponseMap,
  getParseWeeklyResponseMap,
} from './utils/parse-response-maps';
import parseResponse from './utils/parse-response';
import parseSearchResponse from './utils/parse-search-response';
import { WeeklyAdjustedResponse } from './dto/weekly-adjusted-response.dto';
import { DailyDTO } from './dto/daily.dto';
import { DailyResponse } from './dto/daily-response.dto';
import { WeeklyDTO } from './dto/weekly.dto';
import { WeeklyResponse } from './dto/weekly-response.dto';
import { MonthlyDTO } from './dto/monthly.dto';
import { MonthlyResponse } from './dto/monthly-response.dto';
import { QuoteDTO } from './dto/quote.dto';
import { QuoteResponse } from './dto/quote-response.dto';
import parseQuoteResponse from './utils/parse-quote-response';

export class StockTimeSeries extends Category {
  constructor(api: AxiosInstance) {
    super(api);
  }

  async intraday(intradayDTO: IntradayDTO): Promise<IntradayResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...intradayDTO, function: Function.TIME_SERIES_INTRADAY },
      });

      if (intradayDTO.datatype === DataType.CSV) {
        return data;
      }

      return parseResponse(
        getParseIntradayResponseMap(intradayDTO.interval),
        data,
      ) as IntradayResponse;
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError('fail to get intraday data', err);
    }
  }

  async search(searchDTO: SearchDTO): Promise<SearchResponse[]> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...searchDTO, function: Function.SYMBOL_SEARCH },
      });

      if (searchDTO.datatype === DataType.CSV) {
        return data;
      }

      return parseSearchResponse(data);
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError('fail to get search data', err);
    }
  }

  async daily(dailyDTO: DailyDTO): Promise<DailyResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...dailyDTO,
          function: Function.TIME_SERIES_DAILY,
        },
      });

      if (dailyDTO.datatype === DataType.CSV) {
        return data;
      }

      return parseResponse(getParseDailyResponseMap(), data) as DailyResponse;
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError('fail to get daily data', err);
    }
  }

  async dailyAdjusted(
    dailyAdjustedDTO: DailyAdjustedDTO,
  ): Promise<DailyAdjustedResponse> {
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

      return parseResponse(
        getParseDailyAdjustedResponseMap(),
        data,
      ) as DailyAdjustedResponse;
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError(
        'fail to get daily adjusted data',
        err,
      );
    }
  }

  async weekly(weeklyDTO: WeeklyDTO): Promise<WeeklyResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...weeklyDTO,
          function: Function.TIME_SERIES_WEEKLY,
        },
      });

      if (weeklyDTO.datatype === DataType.CSV) {
        return data;
      }
      return parseResponse(getParseWeeklyResponseMap(), data) as WeeklyResponse;
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError('fail to get weekly data', err);
    }
  }

  async weeklyAdjusted(
    weeklyAdjustedDTO: WeeklyAdjustedDTO,
  ): Promise<WeeklyAdjustedResponse> {
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
      return parseResponse(
        getParseWeeklyAdjustedResponseMap(),
        data,
      ) as WeeklyAdjustedResponse;
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError(
        'fail to get weekly adjusted data',
        err,
      );
    }
  }

  async monthly(monthlyDTO: MonthlyDTO): Promise<MonthlyResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...monthlyDTO,
          function: Function.TIME_SERIES_MONTHLY,
        },
      });

      if (monthlyDTO.datatype === DataType.CSV) {
        return data;
      }

      return parseResponse(
        getParseMonthlyResponseMap(),
        data,
      ) as MonthlyResponse;
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError('fail to get monthly data', err);
    }
  }

  async monthlyAdjusted(
    monthlyAdjustedDTO: MonthlyAdjustedDTO,
  ): Promise<MonthlyAdjustedResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...monthlyAdjustedDTO,
          function: Function.TIME_SERIES_MONTHLY_ADJUSTED,
        },
      });

      if (monthlyAdjustedDTO.datatype === DataType.CSV) {
        return data;
      }

      return parseResponse(
        getParseMonthlyAdjustedResponseMap(),
        data,
      ) as MonthlyAdjustedResponse;
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError(
        'fail to get monthly adjusted data',
        err,
      );
    }
  }

  async quote(quoteDTO: QuoteDTO): Promise<QuoteResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...quoteDTO, function: Function.GLOBAL_QUOTE },
      });

      if (quoteDTO.datatype === DataType.CSV) {
        return data;
      }

      return parseQuoteResponse(data);
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError('fail to get quote data', err);
    }
  }
}
