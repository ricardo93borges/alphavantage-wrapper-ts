import { ParseResponseError } from '@/errors'
import { QuoteResponse } from '../dto/'

type QuoteResponseData = {
  [key: string]: {
    [key: string]: string
  }
}

export function parseQuoteResponse(data: QuoteResponseData): QuoteResponse {
  try {
    const globalQuote = data['Global Quote']
    return {
      symbol: globalQuote['01. symbol'],
      open: globalQuote['02. open'],
      high: globalQuote['03. high'],
      low: globalQuote['04. low'],
      price: globalQuote['05. price'],
      volume: globalQuote['06. volume'],
      latestTradingDay: globalQuote['07. latest trading day'],
      previousClose: globalQuote['08. previous close'],
      change: globalQuote['09. change'],
      changePercent: globalQuote['10. change percent']
    }
  } catch (err) {
    throw new ParseResponseError('fail to parse quote response', err)
  }
}
