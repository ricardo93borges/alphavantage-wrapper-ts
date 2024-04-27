export type DailyMetadata = {
  information: string
  digitalCurrencyCode: string
  digitalCurrencyName: string
  marketCode: string
  marketName: string
  lastRefreshed: string
  timeZone: string
}

export type DailyTimeSeries = {
  open: string
  high: string
  low: string
  close: string
  volume: string
}

export type DailyResponse = {
  metadata: DailyMetadata
  timeSeries: { [key: string]: DailyTimeSeries }
}
