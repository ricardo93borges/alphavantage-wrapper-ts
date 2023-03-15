import { AxiosInstance } from 'axios'
import { Category } from '../Category'
import { Function } from '../enum/function.enum'
import { AlphaVantageRequestError, ParseResponseError } from '../errors'
import { CompanyOverviewResponse } from './dto/company-overview-response'
import { CompanyOverviewDTO } from './dto/company-overview.dto'
import parseCompanyOverviewResponse from './utils/parse-company-overview-response'
import { EarningsDTO } from './dto/earnings.dto'
import { EarningsResponse } from './dto/earnings-response'
import parseEarningsResponse from './utils/parse-earnings-response'

export class FundamentalData extends Category {
  constructor (api: AxiosInstance) {
    super(api)
  }

  async companyOverview (
    companyOverviewDTO: CompanyOverviewDTO
  ): Promise<CompanyOverviewResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...companyOverviewDTO, function: Function.OVERVIEW }
      })

      return parseCompanyOverviewResponse(data)
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError(
        'fail to get company overview data',
        err
      )
    }
  }

  async earnings (earningsDTO: EarningsDTO): Promise<EarningsResponse> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...earningsDTO, function: Function.EARNINGS }
      })

      return parseEarningsResponse(data)
    } catch (err) {
      if (err instanceof ParseResponseError) throw err

      throw new AlphaVantageRequestError('fail to get earnings data', err)
    }
  }
}
