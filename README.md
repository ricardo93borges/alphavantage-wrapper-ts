# Alphavantage Wrapper TS ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![Coverage Status](https://coveralls.io/repos/github/ricardo93borges/alphavantage/badge.svg?branch=develop)](https://coveralls.io/github/ricardo93borges/alphavantage?branch=develop) [![CI](https://github.com/ricardo93borges/alphavantage/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/ricardo93borges/alphavantage/actions/workflows/main.yml)

Alpha Vantage API wrapper in TypeScript.

## Contributing

This library is in development, and all contributions are welcome, refer to [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This is an open source project under the MIT license, see LICENSE.md for additional information.

## Getting started

```js
import AlphaVantage, { Interval, DataType } from 'alphavantage-wrapper-ts';

const av = new AlphaVantage({ apikey: 'your API key' });

av.stockTimeSeries
  .intraday({ symbol: 'IBM', interval: Interval.SIXTY_MIN })
  .then((data) => console.log(data));
```

## Stock Time Series

### Intraday

```js
av.stockTimeSeries
  .intraday({ symbol: 'IBM', interval: Interval.SIXTY_MIN })
  .then((data) => console.log(data));
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **interval**: Time interval between two consecutive data points in the time series. The following values are supported: 1min, 5min, 15min, 30min, 60min.
3. **adjusted**: (optional) By default, adjusted=true and the output time series is adjusted by historical split and dividend events. Set adjusted=false to query raw (as-traded) intraday values.
4. **outputsize**: (optional) By default, outputsize=compact. Strings compact and full are accepted with the following specifications: compact returns only the latest 100 data points in the intraday time series; full returns the full-length intraday time series. The "compact" option is recommended if you would like to reduce the data size of each API call.
5. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
{
  metadata: {
    information: string;
    symbol: string;
    lastRefreshed: string;
    interval: string;
    outputSize: string;
    timeZone: string;
  }
  timeSeries: {
      '<datetime>': {
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
      },
      '<datetime>': {
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
      },
      ...
    }
}
```

---

### Search

```js
av.stockTimeSeries
  .search({
    keywords: 'microsoft',
    datatype: DataType.JSON,
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

**Parameters**

1. **keywords**: A text string of your choice. For example: `microsoft`
2. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
[
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'Equity',
    region: 'United States',
    marketOpen: '09:30',
    marketClose: '16:00',
    timezone: 'UTC-04',
    currency: 'USD',
    matchScore: '0.6154',
  },
  {
    symbol: 'MSF.DEX',
    name: 'Microsoft Corporation',
    type: 'Equity',
    region: 'XETRA',
    marketOpen: '08:00',
    marketClose: '20:00',
    timezone: 'UTC+02',
    currency: 'EUR',
    matchScore: '0.6000',
  },
  ...
];
```

## Enums

```ts
enum DataType {
  JSON = 'json',
  CSV = 'csv',
}
```

```ts
enum Interval {
  ONE_MIN = '1min',
  FIVE_MIN = '5min',
  FIFTEEN_MIN = '15min',
  THIRTY_MIN = '30min',
  SIXTY_MIN = '60min',
}
```

```ts
enum OutputSize {
  COMPACT = 'compact',
  FULL = 'full',
}
```
