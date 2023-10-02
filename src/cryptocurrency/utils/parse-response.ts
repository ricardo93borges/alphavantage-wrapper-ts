import { ParseResponseError } from '@/errors'
import { CryptoResponseMap } from './parse-response-maps'

export type ParsedResponseMetadata = {
  [key: string]: string
}

export type ParsedResponseTimeSeries = {
  [key: string]: { [key: string]: string }
}

export type ParsedResponse = {
  metadata: ParsedResponseMetadata
  timeSeries: ParsedResponseTimeSeries
}

type StockTimeSeriesResponse = {
  [key: string]: {
    [key: string]: any
  }
}

export function parseResponse(
  map: CryptoResponseMap,
  response: StockTimeSeriesResponse
): ParsedResponse {
  try {
    const metadata: ParsedResponseMetadata = {}
    const timeSeries: ParsedResponseTimeSeries = {}

    Object.keys(map.metadata).forEach((key) => {
      metadata[key] = response['Meta Data'][map.metadata[key]] as string
    })

    const timeSeriesKeys = Object.keys(response[map.timeSeriesKey])

    for (const date of timeSeriesKeys) {
      timeSeries[date] = {}
      Object.keys(map.timeSeries).forEach((key) => {
        const mapTimeSeriesKey = map.timeSeries[key]
        timeSeries[date][key] =
          response[map.timeSeriesKey][date][mapTimeSeriesKey]
      })
    }

    return { metadata, timeSeries }
  } catch (err) {
    throw new ParseResponseError('fail to parse response', err)
  }
}
