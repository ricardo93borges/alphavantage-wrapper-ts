export type MonthlyMetadata = {
  information: string
  digitalCurrencyCode: string
  digitalCurrencyName: string
  marketCode: string
  marketName: string
  lastRefreshed: string
  timeZone: string
}

export type MonthlyTimeSeries = {
  open: string
  high: string
  low: string
  close: string
  volume: string
}

export type MonthlyResponse = {
  metadata: MonthlyMetadata
  timeSeries: { [key: string]: MonthlyTimeSeries }
}
