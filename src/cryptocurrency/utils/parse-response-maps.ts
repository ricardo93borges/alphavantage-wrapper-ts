import { Interval } from '../../enum'

export type CryptoResponseMap = {
  metadata: {
    [key: string]: string
  }
  timeSeriesKey: string
  timeSeries: {
    [key: string]: string
  }
}

export function getParseIntradayResponseMap(
  interval: Interval
): CryptoResponseMap {
  return {
    metadata: {
      information: '1. Information',
      digitalCurrencyCode: '2. Digital Currency Code',
      digitalCurrencyName: '3. Digital Currency Name',
      marketCode: '4. Market Code',
      marketName: '5. Market Name',
      lastRefreshed: '6. Last Refreshed',
      interval: '7. Interval',
      outputSize: '8. Output Size',
      timeZone: '9. Time Zone'
    },
    timeSeriesKey: `Time Series Crypto (${interval})`,
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      volume: '5. volume'
    }
  }
}

export function getParseMonthlyResponseMap(): CryptoResponseMap {
  return {
    metadata: {
      information: '1. Information',
      digitalCurrencyCode: '2. Digital Currency Code',
      digitalCurrencyName: '3. Digital Currency Name',
      marketCode: '4. Market Code',
      marketName: '5. Market Name',
      lastRefreshed: '6. Last Refreshed',
      timeZone: '7. Time Zone'
    },
    timeSeriesKey: 'Time Series (Digital Currency Monthly)',
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      volume: '5. volume'
    }
  }
}

export function getParseWeeklyResponseMap(): CryptoResponseMap {
  return {
    metadata: {
      information: '1. Information',
      digitalCurrencyCode: '2. Digital Currency Code',
      digitalCurrencyName: '3. Digital Currency Name',
      marketCode: '4. Market Code',
      marketName: '5. Market Name',
      lastRefreshed: '6. Last Refreshed',
      timeZone: '7. Time Zone'
    },
    timeSeriesKey: 'Time Series (Digital Currency Weekly)',
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      volume: '5. volume'
    }
  }
}

export function getParseDailyResponseMap(): CryptoResponseMap {
  return {
    metadata: {
      information: '1. Information',
      digitalCurrencyCode: '2. Digital Currency Code',
      digitalCurrencyName: '3. Digital Currency Name',
      marketCode: '4. Market Code',
      marketName: '5. Market Name',
      lastRefreshed: '6. Last Refreshed',
      timeZone: '7. Time Zone'
    },
    timeSeriesKey: 'Time Series (Digital Currency Daily)',
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      volume: '5. volume'
    }
  }
}
