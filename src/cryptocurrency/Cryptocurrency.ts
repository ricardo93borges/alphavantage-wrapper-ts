import { Category } from '../Category'
import { Function, DataType } from '../enum'
import { AlphaVantageRequestError, ParseResponseError } from '../errors'
import {
  DailyResponse,
  DailyDTO,
  IntradayResponse,
  IntradayDTO,
  MonthlyResponse,
  MonthlyDTO,
  WeeklyResponse,
  WeeklyDTO
} from './dto/'
import {
  parseResponse,
  getParseDailyResponseMap,
  getParseIntradayResponseMap,
  getParseMonthlyResponseMap,
  getParseWeeklyResponseMap
} from './utils/'

export class Cryptocurrency extends Category {
  async intraday(intradayDTO: IntradayDTO): Promise<IntradayResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...intradayDTO, function: Function.CRYPTO_INTRADAY }
      })

      if (intradayDTO.datatype === DataType.CSV) {
        return data
      }

      return parseResponse(
        getParseIntradayResponseMap(intradayDTO.interval),
        data
      ) as unknown as IntradayResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError(
        'fail to get cryptocurrency intraday data',
        err
      )
    }
  }

  async monthly(monthlyDTO: MonthlyDTO): Promise<MonthlyResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...monthlyDTO, function: Function.DIGITAL_CURRENCY_MONTHLY }
      })

      if (monthlyDTO.datatype === DataType.CSV) {
        return data
      }

      return parseResponse(
        getParseMonthlyResponseMap(),
        data
      ) as unknown as MonthlyResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError(
        'fail to get cryptocurrency monthly data',
        err
      )
    }
  }

  async weekly(weeklyDTO: WeeklyDTO): Promise<WeeklyResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...weeklyDTO, function: Function.DIGITAL_CURRENCY_WEEKLY }
      })

      if (weeklyDTO.datatype === DataType.CSV) {
        return data
      }

      return parseResponse(
        getParseWeeklyResponseMap(),
        data
      ) as unknown as WeeklyResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError(
        'fail to get cryptocurrency weekly data',
        err
      )
    }
  }

  async daily(dailyDTO: DailyDTO): Promise<DailyResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...dailyDTO, function: Function.DIGITAL_CURRENCY_DAILY }
      })

      if (dailyDTO.datatype === DataType.CSV) {
        return data
      }

      return parseResponse(
        getParseDailyResponseMap(),
        data
      ) as unknown as DailyResponse
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError(
        'fail to get cryptocurrency daily data',
        err
      )
    }
  }
}
