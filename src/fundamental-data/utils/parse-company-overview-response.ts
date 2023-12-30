import { ParseResponseError } from '../../errors'
import { CompanyOverviewResponse } from '../dto/'

export type CompanyOverviewAPIResponseDTO = {
  [key: string]: string
}

export function parseCompanyOverviewResponse(
  response: CompanyOverviewAPIResponseDTO
): CompanyOverviewResponse {
  try {
    return {
      symbol: response['Symbol'],
      assetType: response['AssetType'],
      name: response['Name'],
      description: response['Description'],
      CIK: response['CIK'],
      exchange: response['Exchange'],
      currency: response['Currency'],
      country: response['Country'],
      sector: response['Sector'],
      industry: response['Industry'],
      address: response['Address'],
      fiscalYearEnd: response['FiscalYearEnd'],
      latestQuarter: response['LatestQuarter'],
      marketCapitalization: response['MarketCapitalization'],
      EBITDA: response['EBITDA'],
      PERatio: response['PERatio'],
      PEGRatio: response['PEGRatio'],
      bookValue: response['BookValue'],
      dividendPerShare: response['DividendPerShare'],
      dividendYield: response['DividendYield'],
      EPS: response['EPS'],
      revenuePerShareTTM: response['RevenuePerShareTTM'],
      profitMargin: response['ProfitMargin'],
      operatingMarginTTM: response['OperatingMarginTTM'],
      returnOnAssetsTTM: response['ReturnOnAssetsTTM'],
      returnOnEquityTTM: response['ReturnOnEquityTTM'],
      revenueTTM: response['RevenueTTM'],
      grossProfitTTM: response['GrossProfitTTM'],
      dilutedEPSTTM: response['DilutedEPSTTM'],
      quarterlyEarningsGrowthYOY: response['QuarterlyEarningsGrowthYOY'],
      quarterlyRevenueGrowthYOY: response['QuarterlyRevenueGrowthYOY'],
      analystTargetPrice: response['AnalystTargetPrice'],
      trailingPE: response['TrailingPE'],
      forwardPE: response['ForwardPE'],
      priceToSalesRatioTTM: response['PriceToSalesRatioTTM'],
      priceToBookRatio: response['PriceToBookRatio'],
      EVToRevenue: response['EVToRevenue'],
      EVToEBITDA: response['EVToEBITDA'],
      beta: response['Beta'],
      fiftyTwoWeekHigh: response['52WeekHigh'],
      fiftyTwoWeekLow: response['52WeekLow'],
      fiftyDayMovingAverage: response['50DayMovingAverage'],
      twoHundredDayMovingAverage: response['200DayMovingAverage'],
      sharesOutstanding: response['SharesOutstanding'],
      sharesFloat: response['SharesFloat'],
      sharesShort: response['SharesShort'],
      sharesShortPriorMonth: response['SharesShortPriorMonth'],
      shortRatio: response['ShortRatio'],
      shortPercentOutstanding: response['ShortPercentOutstanding'],
      shortPercentFloat: response['ShortPercentFloat'],
      percentInsiders: response['PercentInsiders'],
      percentInstitutions: response['PercentInstitutions'],
      forwardAnnualDividendRate: response['ForwardAnnualDividendRate'],
      forwardAnnualDividendYield: response['ForwardAnnualDividendYield'],
      payoutRatio: response['PayoutRatio'],
      dividendDate: response['DividendDate'],
      exDividendDate: response['ExDividendDate'],
      lastSplitFactor: response['LastSplitFactor'],
      lastSplitDate: response['LastSplitDate']
    }
  } catch (err) {
    throw new ParseResponseError('fail to parse search response', err)
  }
}
