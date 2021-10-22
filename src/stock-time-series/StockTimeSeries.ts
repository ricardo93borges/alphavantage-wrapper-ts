import { AxiosInstance } from 'axios';
import { DataType } from '..';
import { Category } from '../Category';
import { Function } from '../enum/function.enum';
import { AlphaVantageRequestError, ParseResponseError } from '../errors';
import { DailyAdjustedResponseDTO } from './dto/daily-adjusted-response.dto';
import { DailyAdjustedDTO } from './dto/daily-adjusted.dto';
import { IntradayResponseDTO } from './dto/intraday-response.dto';
import { IntradayDTO } from './dto/intraday.dto';
import { SearchResponseDTO } from './dto/search-response.dto';
import { SearchDTO } from './dto/search.dto';
import { WeeklyAdjustedDTO } from './dto/weekly-adjusted.dto';
import { MonthlyAdjustedDTO } from './dto/monthly-adjusted.dto';
import { MonthlyAdjustedResponseDTO } from './dto/monthly-adjusted-response.dto';
import {
  getParseDailyAdjustedResponseMap,
  getParseIntradayResponseMap,
  getParseMonthlyAdjustedResponseMap,
  getParseWeeklyAdjustedResponseMap,
} from './utils/parse-response-maps';
import parseResponse from './utils/parse-response';
import parseSearchResponse from './utils/parse-search-response';
import { WeeklyAdjustedResponseDTO } from './dto/weekly-adjusted-response.dto';

export class StockTimeSeries extends Category {
  constructor(api: AxiosInstance) {
    super(api);
  }

  async intraday(intradayDTO: IntradayDTO): Promise<IntradayResponseDTO> {
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
      ) as IntradayResponseDTO;
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

      return parseSearchResponse(data);
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

      return parseResponse(
        getParseDailyAdjustedResponseMap(),
        data,
      ) as DailyAdjustedResponseDTO;
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
      return parseResponse(
        getParseWeeklyAdjustedResponseMap(),
        data,
      ) as MonthlyAdjustedResponseDTO;
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError(
        'fail to get weekly adjusted data',
        err,
      );
    }
  }

  async monthlyAdjusted(
    monthlyAdjustedDTO: MonthlyAdjustedDTO,
  ): Promise<MonthlyAdjustedResponseDTO> {
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
      ) as MonthlyAdjustedResponseDTO;
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError(
        'fail to get monthly adjusted data',
        err,
      );
    }
  }
}
