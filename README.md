# Alphavantage Wrapper TS

[![Coverage Status](https://coveralls.io/repos/github/ricardo93borges/alphavantage/badge.svg?branch=develop)](https://coveralls.io/github/ricardo93borges/alphavantage?branch=develop) [![CI](https://github.com/ricardo93borges/alphavantage/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/ricardo93borges/alphavantage/actions/workflows/main.yml) ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![issues](https://img.shields.io/github/issues/ricardo93borges/alphavantage-wrapper-ts) ![forks](https://img.shields.io/github/forks/ricardo93borges/alphavantage-wrapper-ts) ![stars](https://img.shields.io/github/stars/ricardo93borges/alphavantage-wrapper-ts)
![npm](https://img.shields.io/npm/v/alphavantage-wrapper-ts) ![npm downloads](https://img.shields.io/npm/dw/alphavantage-wrapper-ts) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[Alpha Vantage API](https://www.alphavantage.co/documentation/) wrapper in TypeScript.

## Table of Contents

- [Alphavantage Wrapper TS](#alphavantage-wrapper-ts)
  - [Table of Contents](#table-of-contents)
  - [Contributing](#contributing)
  - [License](#license)
  - [Getting started](#getting-started)
  - [Stock Time Series](#stock-time-series)
    - [Intraday](#intraday)
    - [Search](#search)
    - [Daily](#daily)
    - [Daily Adjusted](#daily-adjusted)
    - [Weekly](#weekly)
    - [Weekly Adjusted](#weekly-adjusted)
    - [Monthly](#monthly)
    - [Monthly Adjusted](#monthly-adjusted)
    - [Quote Endpoint](#quote-endpoint)
  - [Fundamental data](#fundamental-data)
    - [Company Overview](#company-overview)
    - [Earnings](#earnings)
    - [Listing status](#listing-status)
  - [Cryptocurrencies](#cryptocurrencies)
    - [Intraday](#intraday-1)
    - [Monthly](#monthly-1)
    - [Weekly](#weekly-1)
    - [Daily](#daily-1)
  - [Enums](#enums)
  - [If found this useful somehow](#if-found-this-useful-somehow)

## Contributing

This library is in development, and all contributions are welcome, refer to [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This is an open source project under the MIT license, see LICENSE.md for additional information.

## Getting started

```js
import AlphaVantage, {
  Interval,
  DataType,
  StockTimeSeries,
} from 'alphavantage-wrapper-ts';

const av = new AlphaVantage({ apikey: 'your API key' });

av.stockTimeSeries
  .intraday({ symbol: 'IBM', interval: Interval.SIXTY_MIN })
  .then((data) => console.log(data));

// OR

async function intraday(): Promise<StockTimeSeries.IntradayResponse> {
  const response = await av.stockTimeSeries.intraday({
    symbol: 'IBM',
    interval: Interval.SIXTY_MIN,
  });
  return response;
}
```

## Stock Time Series

### Intraday

```js
av.stockTimeSeries
  .intraday({ symbol: 'IBM', interval: Interval.SIXTY_MIN })
  .then((data) => console.log(data))
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
    digitalCurrencyCode: string;
    digitalCurrencyName: string;
    marketCode: string;
    marketName: string;
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
    datatype: DataType.JSON
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
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

---

### Daily

```js
av.stockTimeSeries.daily({ symbol: 'IBM' }).then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **outputsize**: (optional) By default, outputsize=compact. Strings compact and full are accepted with the following specifications: compact returns only the latest 100 data points in the intraday time series; full returns the full-length intraday time series. The "compact" option is recommended if you would like to reduce the data size of each API call.
3. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
{
  metadata: {
    information: string;
    symbol: string;
    lastRefreshed: string;
    outputSize: string;
    timeZone: string;
  }
  timeSeries: {
      '<date>': {
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
      },
      '<date>': {
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

### Daily Adjusted

```js
av.stockTimeSeries
  .dailyAdjusted({ symbol: 'IBM' })
  .then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **outputsize**: (optional) By default, outputsize=compact. Strings compact and full are accepted with the following specifications: compact returns only the latest 100 data points in the intraday time series; full returns the full-length intraday time series. The "compact" option is recommended if you would like to reduce the data size of each API call.
3. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
{
  metadata: {
    information: string;
    symbol: string;
    lastRefreshed: string;
    outputSize: string;
    timeZone: string;
  }
  timeSeries: {
      '<date>': {
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
        adjustedClose: string;
        dividendAmount: string;
        splitCoefficient: string;
      },
      '<date>': {
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
        adjustedClose: string;
        dividendAmount: string;
        splitCoefficient: string;
      },
      ...
    }
}
```

---

### Weekly

```js
av.stockTimeSeries.weekly({ symbol: 'IBM' }).then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
{
  metadata: {
    information: string;
    symbol: string;
    lastRefreshed: string;
    timeZone: string;
  }
  timeSeries: {
      '<date>': {
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
      },
      '<date>': {
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

### Weekly Adjusted

```js
av.stockTimeSeries
  .weeklyAdjusted({ symbol: 'IBM' })
  .then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
{
  metadata: {
    information: string;
    symbol: string;
    lastRefreshed: string;
    timeZone: string;
  }
  timeSeries: {
      '<date>': {
        open: string;
        high: string;
        low: string;
        close: string;
        adjustedClose: string;
        volume: string;
        dividendAmount: string;
      },
      '<date>': {
        open: string;
        high: string;
        low: string;
        close: string;
        adjustedClose: string;
        volume: string;
        dividendAmount: string;
      },
      ...
    }
}
```

---

### Monthly

```js
av.stockTimeSeries.monthly({ symbol: 'IBM' }).then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
{
  metadata: {
    information: string;
    symbol: string;
    lastRefreshed: string;
    timeZone: string;
  }
  timeSeries: {
      '<date>': {
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
      },
      '<date>': {
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

### Monthly Adjusted

```js
av.stockTimeSeries
  .monthlyAdjusted({ symbol: 'IBM' })
  .then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
{
  metadata: {
    information: string;
    symbol: string;
    lastRefreshed: string;
    timeZone: string;
  }
  timeSeries: {
      '<date>': {
        open: string;
        high: string;
        low: string;
        close: string;
        adjustedClose: string;
        volume: string;
        dividendAmount: string;
      },
      '<date>': {
        open: string;
        high: string;
        low: string;
        close: string;
        adjustedClose: string;
        volume: string;
        dividendAmount: string;
      },
      ...
    }
}
```

---

### Quote Endpoint

```js
av.stockTimeSeries.quote({ symbol: 'IBM' }).then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the quote data in JSON format; csv returns the quote data as a CSV (comma separated value) file.

**Response**

```js
{
  symbol: string
  open: string
  high: string
  low: string
  price: string
  volume: string
  latestTradingDay: string
  previousClose: string
  change: string
  changePercent: string
}
```

---

## Fundamental data

### Company Overview

```js
av.fundamentalData
  .companyOverview({ symbol: 'IBM' })
  .then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM

**Response**

```js
{
  symbol: string
  assetType: string
  name: string
  description: string
  CIK: string
  exchange: string
  currency: string
  country: string
  sector: string
  industry: string
  address: string
  fiscalYearEnd: string
  latestQuarter: string
  marketCapitalization: string
  EBITDA: string
  PERatio: string
  PEGRatio: string
  bookValue: string
  dividendPerShare: string
  dividendYield: string
  EPS: string
  revenuePerShareTTM: string
  profitMargin: string
  operatingMarginTTM: string
  returnOnAssetsTTM: string
  returnOnEquityTTM: string
  revenueTTM: string
  grossProfitTTM: string
  dilutedEPSTTM: string
  quarterlyEarningsGrowthYOY: string
  quarterlyRevenueGrowthYOY: string
  analystTargetPrice: string
  trailingPE: string
  forwardPE: string
  priceToSalesRatioTTM: string
  priceToBookRatio: string
  EVToRevenue: string
  EVToEBITDA: string
  beta: string
  fiftyTwoWeekHigh: string
  fiftyTwoWeekLow: string
  fiftyDayMovingAverage: string
  twoHundredDayMovingAverage: string
  sharesOutstanding: string
  sharesFloat: string
  sharesShort: string
  sharesShortPriorMonth: string
  shortRatio: string
  shortPercentOutstanding: string
  shortPercentFloat: string
  percentInsiders: string
  percentInstitutions: string
  forwardAnnualDividendRate: string
  forwardAnnualDividendYield: string
  payoutRatio: string
  dividendDate: string
  exDividendDate: string
  lastSplitFactor: string
  lastSplitDate: string
}
```

---

### Earnings

```js
av.fundamentalData.earnings({ symbol: 'IBM' }).then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM

**Response**

```js
{
  symbol: string;
  annualEarnings: [
    {
      fiscalDateEnding:string;
      reportedEPS:string;
    },
    {
      fiscalDateEnding:string;
      reportedEPS:string;
    }
  ],
  quarterlyEarnings: [
    {
      fiscalDateEnding:string;
      reportedDate:string;
      reportedEPS:string;
      estimatedEPS:string;
      surprise:string;
      surprisePercentage:string;
    },
    {
      fiscalDateEnding:string;
      reportedDate:string;
      reportedEPS:string;
      estimatedEPS:string;
      surprise:string;
      surprisePercentage:string;
    }
  ]
}
```

### Listing status

```js
av.fundamentalData
  .listingStatus({ state: ListingState.ACTIVE, date: '2014-07-10' })
  .then((data) => console.log(data))
```

**Parameters**

1. **state**: (Optional) By default, `state=active` and the API will return a list of actively traded stocks and ETFs. Set `state=delisted` to query a list of delisted assets.
2. **date**: (Optional) If no date is set, the API endpoint will return a list of active or delisted symbols as of the latest trading day. If a date is set, the API endpoint will "travel back" in time and return a list of active or delisted symbols on that particular date in history. Any YYYY-MM-DD date later than 2010-01-01 is supported

**Response**

CSV

```
symbol,name,exchange,assetType,ipoDate,delistingDate,status
A,Agilent Technologies Inc,NYSE,Stock,1999-11-18,null,Active
...
```

---

## Cryptocurrencies

### Intraday

```js
av.cryptocurrency
  .intraday({ symbol: 'ETH', market: 'USD', interval: Interval.SIXTY_MIN })
  .then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **interval**: Time interval between two consecutive data points in the time series. The following values are supported: 1min, 5min, 15min, 30min, 60min.
3. **market**: The exchange market of your choice. It can be any of the market in the market list. For example: market=USD.
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

### Monthly

```js
av.cryptocurrency
  .monthly({ symbol: 'ETH', market: 'CNY' })
  .then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **market**: The exchange market of your choice. It can be any of the market in the market list. For example: market=USD.
3. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
{
  metadata: {
    information: string;
    digitalCurrencyCode: string;
    digitalCurrencyName: string;
    marketCode: string;
    marketName: string;
    lastRefreshed: string;
    timeZone: string;
  }
  timeSeries: {
      '<datetime>': {
          openMarket: string;
          openUSD: string;
          highMarket: string;
          highUSD: string;
          lowMarket: string;
          lowUSD: string;
          closeMarket: string;
          closeUSD: string;
          volume: string;
          marketCap: string;
      },
      '<datetime>': {
          openMarket: string;
          openUSD: string;
          highMarket: string;
          highUSD: string;
          lowMarket: string;
          lowUSD: string;
          closeMarket: string;
          closeUSD: string;
          volume: string;
          marketCap: string;
      },
      ...
    }
}
```

### Weekly

```js
av.cryptocurrency
  .weekly({ symbol: 'ETH', market: 'CNY' })
  .then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **market**: The exchange market of your choice. It can be any of the market in the market list. For example: market=USD.
3. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
{
  metadata: {
    information: string;
    digitalCurrencyCode: string;
    digitalCurrencyName: string;
    marketCode: string;
    marketName: string;
    lastRefreshed: string;
    timeZone: string;
  }
  timeSeries: {
      '<datetime>': {
          openMarket: string;
          openUSD: string;
          highMarket: string;
          highUSD: string;
          lowMarket: string;
          lowUSD: string;
          closeMarket: string;
          closeUSD: string;
          volume: string;
          marketCap: string;
      },
      '<datetime>': {
          openMarket: string;
          openUSD: string;
          highMarket: string;
          highUSD: string;
          lowMarket: string;
          lowUSD: string;
          closeMarket: string;
          closeUSD: string;
          volume: string;
          marketCap: string;
      },
      ...
    }
}
```

### Daily

```js
av.cryptocurrency
  .daily({ symbol: 'ETH', market: 'CNY' })
  .then((data) => console.log(data))
```

**Parameters**

1. **symbol**: The name of the equity of your choice. For example: symbol=IBM
2. **market**: The exchange market of your choice. It can be any of the market in the market list. For example: market=USD.
3. **datatype**: (optional) By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

**Response**

```js
{
  metadata: {
    information: string;
    digitalCurrencyCode: string;
    digitalCurrencyName: string;
    marketCode: string;
    marketName: string;
    lastRefreshed: string;
    timeZone: string;
  }
  timeSeries: {
      '<datetime>': {
          openMarket: string;
          openUSD: string;
          highMarket: string;
          highUSD: string;
          lowMarket: string;
          lowUSD: string;
          closeMarket: string;
          closeUSD: string;
          volume: string;
          marketCap: string;
      },
      '<datetime>': {
          openMarket: string;
          openUSD: string;
          highMarket: string;
          highUSD: string;
          lowMarket: string;
          lowUSD: string;
          closeMarket: string;
          closeUSD: string;
          volume: string;
          marketCap: string;
      },
      ...
    }
}
```

## Enums

```ts
enum DataType {
  JSON = 'json',
  CSV = 'csv'
}
```

```ts
enum Interval {
  ONE_MIN = '1min',
  FIVE_MIN = '5min',
  FIFTEEN_MIN = '15min',
  THIRTY_MIN = '30min',
  SIXTY_MIN = '60min'
}
```

```ts
enum OutputSize {
  COMPACT = 'compact',
  FULL = 'full'
}
```

---

## If found this useful somehow

<a href="https://www.buymeacoffee.com/ricardoborges" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
