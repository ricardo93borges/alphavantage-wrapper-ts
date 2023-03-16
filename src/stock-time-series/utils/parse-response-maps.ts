import { Interval } from '@/enum'

export function getParseIntradayResponseMap(interval: Interval) {
  return {
    metadata: {
      information: '1. Information',
      symbol: '2. Symbol',
      lastRefreshed: '3. Last Refreshed',
      interval: '4. Interval',
      outputSize: '5. Output Size',
      timeZone: '6. Time Zone'
    },
    timeSeriesKey: `Time Series (${interval})`,
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      volume: '5. volume'
    }
  }
}

export function getParseDailyResponseMap() {
  return {
    metadata: {
      information: '1. Information',
      symbol: '2. Symbol',
      lastRefreshed: '3. Last Refreshed',
      outputSize: '4. Output Size',
      timeZone: '5. Time Zone'
    },
    timeSeriesKey: 'Time Series (Daily)',
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      volume: '5. volume'
    }
  }
}

export function getParseDailyAdjustedResponseMap() {
  return {
    metadata: {
      information: '1. Information',
      symbol: '2. Symbol',
      lastRefreshed: '3. Last Refreshed',
      outputSize: '4. Output Size',
      timeZone: '5. Time Zone'
    },
    timeSeriesKey: 'Time Series (Daily)',
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      adjustedClose: '5. adjusted close',
      volume: '6. volume',
      dividendAmount: '7. dividend amount',
      splitCoefficient: '8. split coefficient'
    }
  }
}

export function getParseWeeklyAdjustedResponseMap() {
  return {
    metadata: {
      information: '1. Information',
      symbol: '2. Symbol',
      lastRefreshed: '3. Last Refreshed',
      timeZone: '4. Time Zone'
    },
    timeSeriesKey: 'Weekly Adjusted Time Series',
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      adjustedClose: '5. adjusted close',
      volume: '6. volume',
      dividendAmount: '7. dividend amount'
    }
  }
}

export function getParseWeeklyResponseMap() {
  return {
    metadata: {
      information: '1. Information',
      symbol: '2. Symbol',
      lastRefreshed: '3. Last Refreshed',
      timeZone: '4. Time Zone'
    },
    timeSeriesKey: 'Weekly Time Series',
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      volume: '5. volume'
    }
  }
}

export function getParseMonthlyResponseMap() {
  return {
    metadata: {
      information: '1. Information',
      symbol: '2. Symbol',
      lastRefreshed: '3. Last Refreshed',
      timeZone: '4. Time Zone'
    },
    timeSeriesKey: 'Monthly Time Series',
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      volume: '5. volume'
    }
  }
}

export function getParseMonthlyAdjustedResponseMap() {
  return {
    metadata: {
      information: '1. Information',
      symbol: '2. Symbol',
      lastRefreshed: '3. Last Refreshed',
      timeZone: '4. Time Zone'
    },
    timeSeriesKey: 'Monthly Adjusted Time Series',
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      adjustedClose: '5. adjusted close',
      volume: '6. volume',
      dividendAmount: '7. dividend amount'
    }
  }
}
