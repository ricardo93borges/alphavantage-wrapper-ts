import { Category } from '../Category'
import { Function } from '../enum'
import { AlphaVantageRequestError, ParseResponseError } from '../errors'
import {
  CompanyOverviewResponse,
  CompanyOverviewDTO,
  EarningsDTO,
  EarningsResponse
} from './dto/'
import { parseCompanyOverviewResponse, parseEarningsResponse } from './utils/'
import { ListingStatusDTO } from './dto/listing-status.dto'

export class FundamentalData extends Category {
  async companyOverview(
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

  async earnings(earningsDTO: EarningsDTO): Promise<EarningsResponse> {
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

  async listingStatus(listingStatusDTO?: ListingStatusDTO): Promise<string> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...listingStatusDTO, function: Function.LISTING_STATUS }
      })

      return data
    } catch (err) {
      throw new AlphaVantageRequestError('fail to get listing status', err)
    }
  }
}
