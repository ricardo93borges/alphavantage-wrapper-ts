import { DataType, Function } from '@/enum'
import { Category } from '@/Category'

import { AlphaVantageRequestError, ParseResponseError } from '@/errors'
import {
  MonthlyAdjustedResponse,
  MonthlyAdjustedDTO,
  WeeklyAdjustedDTO,
  SearchDTO,
  DailyAdjustedResponse,
  DailyAdjustedDTO,
  IntradayResponse,
  IntradayDTO,
  SearchResponse,
  WeeklyAdjustedResponse,
  DailyDTO,
  DailyResponse,
  WeeklyDTO,
  WeeklyResponse,
  MonthlyDTO,
  MonthlyResponse,
  QuoteDTO,
  QuoteResponse
} from './dto'
import {
  getParseDailyAdjustedResponseMap,
  getParseDailyResponseMap,
  getParseIntradayResponseMap,
  getParseMonthlyAdjustedResponseMap,
  getParseMonthlyResponseMap,
  getParseWeeklyAdjustedResponseMap,
  getParseWeeklyResponseMap,
  parseResponse,
  parseSearchResponse,
  parseQuoteResponse
} from './utils'

export class StockTimeSeries extends Category {
  async intraday(intradayDTO: IntradayDTO): Promise<IntradayResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...intradayDTO, function: Function.TIME_SERIES_INTRADAY }
      })

      if (intradayDTO.datatype === DataType.CSV) {
        return data
      }

      return parseResponse(
        getParseIntradayResponseMap(intradayDTO.interval),
        data
      ) as IntradayResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError('fail to get intraday data', err)
    }
  }

  async search(searchDTO: SearchDTO): Promise<SearchResponse[]> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...searchDTO, function: Function.SYMBOL_SEARCH }
      })

      if (searchDTO.datatype === DataType.CSV) {
        return data
      }

      return parseSearchResponse(data)
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError('fail to get search data', err)
    }
  }

  async daily(dailyDTO: DailyDTO): Promise<DailyResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...dailyDTO,
          function: Function.TIME_SERIES_DAILY
        }
      })

      if (dailyDTO.datatype === DataType.CSV) {
        return data
      }

      return parseResponse(getParseDailyResponseMap(), data) as DailyResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError('fail to get daily data', err)
    }
  }

  async dailyAdjusted(
    dailyAdjustedDTO: DailyAdjustedDTO
  ): Promise<DailyAdjustedResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...dailyAdjustedDTO,
          function: Function.TIME_SERIES_DAILY_ADJUSTED
        }
      })

      if (dailyAdjustedDTO.datatype === DataType.CSV) {
        return data
      }

      return parseResponse(
        getParseDailyAdjustedResponseMap(),
        data
      ) as DailyAdjustedResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError('fail to get daily adjusted data', err)
    }
  }

  async weekly(weeklyDTO: WeeklyDTO): Promise<WeeklyResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...weeklyDTO,
          function: Function.TIME_SERIES_WEEKLY
        }
      })

      if (weeklyDTO.datatype === DataType.CSV) {
        return data
      }
      return parseResponse(getParseWeeklyResponseMap(), data) as WeeklyResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError('fail to get weekly data', err)
    }
  }

  async weeklyAdjusted(
    weeklyAdjustedDTO: WeeklyAdjustedDTO
  ): Promise<WeeklyAdjustedResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...weeklyAdjustedDTO,
          function: Function.TIME_SERIES_WEEKLY_ADJUSTED
        }
      })

      if (weeklyAdjustedDTO.datatype === DataType.CSV) {
        return data
      }
      return parseResponse(
        getParseWeeklyAdjustedResponseMap(),
        data
      ) as WeeklyAdjustedResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError(
        'fail to get weekly adjusted data',
        err
      )
    }
  }

  async monthly(monthlyDTO: MonthlyDTO): Promise<MonthlyResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...monthlyDTO,
          function: Function.TIME_SERIES_MONTHLY
        }
      })

      if (monthlyDTO.datatype === DataType.CSV) {
        return data
      }

      return parseResponse(
        getParseMonthlyResponseMap(),
        data
      ) as MonthlyResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError('fail to get monthly data', err)
    }
  }

  async monthlyAdjusted(
    monthlyAdjustedDTO: MonthlyAdjustedDTO
  ): Promise<MonthlyAdjustedResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: {
          ...monthlyAdjustedDTO,
          function: Function.TIME_SERIES_MONTHLY_ADJUSTED
        }
      })

      if (monthlyAdjustedDTO.datatype === DataType.CSV) {
        return data
      }

      return parseResponse(
        getParseMonthlyAdjustedResponseMap(),
        data
      ) as MonthlyAdjustedResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError(
        'fail to get monthly adjusted data',
        err
      )
    }
  }

  async quote(quoteDTO: QuoteDTO): Promise<QuoteResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...quoteDTO, function: Function.GLOBAL_QUOTE }
      })

      if (quoteDTO.datatype === DataType.CSV) {
        return data
      }

      return parseQuoteResponse(data)
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError('fail to get quote data', err)
    }
  }
}
