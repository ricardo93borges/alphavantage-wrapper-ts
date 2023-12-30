import { ParseResponseError } from '../../errors'
import { StockTimeSeriesResponseMap } from './parse-response-maps'

export type ParsedResponseMetadata = {
  [key: string]: string
}

export type ParsedResponseTimeSeries = {
  [key: string]: { [key: string]: string }
}

type StockTimeSeriesResponse = {
  [key: string]: {
    [key: string]: any
  }
}

export function parseResponse(
  map: StockTimeSeriesResponseMap,
  response: StockTimeSeriesResponse
) {
  try {
    const metadata: ParsedResponseMetadata = {}
    const timeSeries: ParsedResponseTimeSeries = {}

    Object.keys(map.metadata).forEach((key) => {
      metadata[key] = response['Meta Data'][map.metadata[key]]
    })

    const timeSeriesKeys = Object.keys(response[map.timeSeriesKey])

    for (const date of timeSeriesKeys) {
      timeSeries[date] = {}
      Object.keys(map.timeSeries).forEach((key) => {
        timeSeries[date][key] =
          response[map.timeSeriesKey][date][map.timeSeries[key]]
      })
    }

    return { timeSeries, metadata }
  } catch (err) {
    throw new ParseResponseError('fail to parse response', err)
  }
}
