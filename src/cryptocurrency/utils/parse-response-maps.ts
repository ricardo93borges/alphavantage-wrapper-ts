import { Interval } from '../..';

export function getParseIntradayResponseMap(interval: Interval) {
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
      timeZone: '9. Time Zone',
    },
    timeSeriesKey: `Time Series Crypto (${interval})`,
    timeSeries: {
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close',
      volume: '5. volume',
    },
  };
}

export function getParseMonthlyResponseMap(market: string) {
  return {
    metadata: {
      information: '1. Information',
      digitalCurrencyCode: '2. Digital Currency Code',
      digitalCurrencyName: '3. Digital Currency Name',
      marketCode: '4. Market Code',
      marketName: '5. Market Name',
      lastRefreshed: '6. Last Refreshed',
      timeZone: '7. Time Zone',
    },
    timeSeriesKey: 'Time Series (Digital Currency Monthly)',
    timeSeries: {
      openMarket: `1a. open (${market})`,
      openUSD: '1b. open (USD)',
      highMarket: `2a. high (${market})`,
      highUSD: '2b. high (USD)',
      lowMarket: `3a. low (${market})`,
      lowUSD: '3b. low (USD)',
      closeMarket: `4a. close (${market})`,
      closeUSD: '4b. close (USD)',
      volume: '5. volume',
      marketCap: '6. market cap (USD)',
    },
  };
}
