import { AxiosInstance } from 'axios'
import { DataType } from '..'
import { Category } from '../Category'
import { Function } from '../enum/function.enum'
import { AlphaVantageRequestError, ParseResponseError } from '../errors'
import { DailyResponse } from './dto/daily-response.dto'
import { DailyDTO } from './dto/daily.dto'
import { IntradayResponse } from './dto/intraday-response.dto'
import { IntradayDTO } from './dto/intraday.dto'
import { MonthlyResponse } from './dto/monthly-response.dto'
import { MonthlyDTO } from './dto/monthly.dto'
import { WeeklyResponse } from './dto/weekly-response.dto'
import { WeeklyDTO } from './dto/weekly.dto'
import parseResponse from './utils/parse-response'
import {
  getParseDailyResponseMap,
  getParseIntradayResponseMap,
  getParseMonthlyResponseMap,
  getParseWeeklyResponseMap
} from './utils/parse-response-maps'

export class Cryptocurrency extends Category {
  constructor(api: AxiosInstance) {
    super(api)
  }

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
        getParseMonthlyResponseMap(monthlyDTO.market),
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
        getParseWeeklyResponseMap(weeklyDTO.market),
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
        getParseDailyResponseMap(dailyDTO.market),
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
