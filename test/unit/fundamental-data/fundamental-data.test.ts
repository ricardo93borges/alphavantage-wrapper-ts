import axios, { AxiosInstance } from 'axios'
import { Function } from '@/enum'
import { AlphaVantageRequestError, ParseResponseError } from '@/errors'
import { FundamentalData } from '@/fundamental-data/FundamentalData'
import {
  givenCompanyOverviewResponse,
  givenEarningsResponse
} from '../helpers/data-builders/fundamental-data.builder'

describe('StockTimeSeries', () => {
  let fundamentalData: FundamentalData
  let api: AxiosInstance

  beforeEach(() => {
    api = axios.create({
      baseURL: 'http://api.com',
      params: { apikey: 'demo' }
    })

    fundamentalData = new FundamentalData(api)
  })

  describe('#companyOverview', () => {
    it('should make a request to company overview endpoint', async () => {
      api.get = jest
        .fn()
        .mockResolvedValue({ data: givenCompanyOverviewResponse() })

      const companyOverviewDTO = {
        symbol: 'IBM'
      }

      await fundamentalData.companyOverview(companyOverviewDTO)

      expect(api.get).toBeCalledWith('/query', {
        params: {
          ...companyOverviewDTO,
          function: Function.OVERVIEW
        }
      })
    })

    it('should return parsed company overview data', async () => {
      api.get = jest
        .fn()
        .mockResolvedValue({ data: givenCompanyOverviewResponse() })

      const result = await fundamentalData.companyOverview({ symbol: 'IBM' })

      expect(result).toEqual({
        symbol: 'IBM',
        assetType: 'Common Stock',
        name: 'International Business Machines Corporation',
        description: 'description',
        CIK: '51143',
        exchange: 'NYSE',
        currency: 'USD',
        country: 'USA',
        sector: 'TECHNOLOGY',
        industry: 'COMPUTER & OFFICE EQUIPMENT',
        address: '1 NEW ORCHARD ROAD, ARMONK, NY, US',
        fiscalYearEnd: 'December',
        latestQuarter: '2021-09-30',
        marketCapitalization: '114446615000',
        EBITDA: '16436000000',
        PERatio: '24.17',
        PEGRatio: '1.469',
        bookValue: '24.78',
        dividendPerShare: '6.54',
        dividendYield: '0.0511',
        EPS: '5.28',
        revenuePerShareTTM: '83.23',
        profitMargin: '0.064',
        operatingMarginTTM: '0.13',
        returnOnAssetsTTM: '0.0406',
        returnOnEquityTTM: '0.214',
        revenueTTM: '74461004000',
        grossProfitTTM: '35575000000',
        dilutedEPSTTM: '5.28',
        quarterlyEarningsGrowthYOY: '-0.338',
        quarterlyRevenueGrowthYOY: '0.003',
        analystTargetPrice: '151.12',
        trailingPE: '24.17',
        forwardPE: '10.74',
        priceToSalesRatioTTM: '1.537',
        priceToBookRatio: '5.16',
        EVToRevenue: '2.223',
        EVToEBITDA: '12.76',
        beta: '1.181',
        fiftyTwoWeekHigh: '151.1',
        fiftyTwoWeekLow: '100.73',
        fiftyDayMovingAverage: '138.74',
        twoHundredDayMovingAverage: '141.54',
        sharesOutstanding: '896320000',
        sharesFloat: '895521000',
        sharesShort: '25805200',
        sharesShortPriorMonth: '25087600',
        shortRatio: '7.16',
        shortPercentOutstanding: '0.03',
        shortPercentFloat: '0.0288',
        percentInsiders: '0.133',
        percentInstitutions: '57.78',
        forwardAnnualDividendRate: '6.56',
        forwardAnnualDividendYield: '0.0513',
        payoutRatio: '0.58',
        dividendDate: '2021-09-10',
        exDividendDate: '2021-08-09',
        lastSplitFactor: '2:1',
        lastSplitDate: '1999-05-27'
      })
    })

    it('should fail to parse company overview data', async () => {
      api.get = jest.fn().mockResolvedValue({})

      try {
        await fundamentalData.companyOverview({
          symbol: 'IBM'
        })
        fail('should have thrown an error')
      } catch (err) {
        expect(err).toBeInstanceOf(ParseResponseError)
      }
    })

    it('should throw AlphaVantageRequestError because it fail to request company overview data', async () => {
      api.get = jest.fn().mockRejectedValue(new Error('some error'))

      try {
        await fundamentalData.companyOverview({
          symbol: 'IBM'
        })
        fail('should have thrown an error')
      } catch (err) {
        expect(err).toBeInstanceOf(AlphaVantageRequestError)
      }
    })
  })

  describe('#earnings', () => {
    it('should make a request to earnings endpoint', async () => {
      api.get = jest.fn().mockResolvedValue({ data: givenEarningsResponse() })

      const earningsDTO = {
        symbol: 'IBM'
      }

      await fundamentalData.earnings(earningsDTO)

      expect(api.get).toBeCalledWith('/query', {
        params: {
          ...earningsDTO,
          function: Function.EARNINGS
        }
      })
    })

    it('should return parsed earnings data', async () => {
      api.get = jest.fn().mockResolvedValue({ data: givenEarningsResponse() })

      const result = await fundamentalData.earnings({ symbol: 'IBM' })

      expect(result).toEqual({
        symbol: 'IBM',
        annualEarnings: [
          { fiscalDateEnding: '2022-09-30', reportedEPS: '3.71' },
          { fiscalDateEnding: '2021-12-31', reportedEPS: '9.97' }
        ],
        quarterlyEarnings: [
          {
            fiscalDateEnding: '2022-06-30',
            reportedDate: '2022-07-18',
            reportedEPS: '2.31',
            estimatedEPS: '2.27',
            surprise: '0.04',
            surprisePercentage: '1.7621'
          },
          {
            fiscalDateEnding: '2022-03-31',
            reportedDate: '2022-04-19',
            reportedEPS: '1.4',
            estimatedEPS: '1.38',
            surprise: '0.02',
            surprisePercentage: '1.4493'
          }
        ]
      })
    })

    it('should fail to parse earnings data', async () => {
      api.get = jest.fn().mockResolvedValue({})

      try {
        await fundamentalData.earnings({
          symbol: 'IBM'
        })
        fail('should have thrown an error')
      } catch (err) {
        expect(err).toBeInstanceOf(ParseResponseError)
      }
    })

    it('should throw AlphaVantageRequestError because it fail to request earnings data', async () => {
      api.get = jest.fn().mockRejectedValue(new Error('some error'))

      try {
        await fundamentalData.earnings({
          symbol: 'IBM'
        })
        fail('should have thrown an error')
      } catch (err) {
        expect(err).toBeInstanceOf(AlphaVantageRequestError)
      }
    })
  })
})
