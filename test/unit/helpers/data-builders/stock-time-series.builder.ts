export type BuiltResponse = {
  [key: string]: object;
};

export type BuiltSearchResponse = {
  bestMatches: object[];
};

export function givenIntradayResponse(data?: BuiltResponse): BuiltResponse {
  const obj = Object.assign(
    {
      'Meta Data': {
        '1. Information':
          'Intraday (5min) open, high, low, close prices and volume',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2021-10-01 18:15:00',
        '4. Interval': '5min',
        '5. Output Size': 'Compact',
        '6. Time Zone': 'US/Eastern',
      },
      'Time Series (5min)': {
        '2021-10-01 18:15:00': {
          '1. open': '143.5500',
          '2. high': '143.5500',
          '3. low': '143.5500',
          '4. close': '143.5500',
          '5. volume': '100',
        },
      },
    },
    data,
  );

  return obj;
}

export function givenSearchResponse(
  data?: BuiltSearchResponse,
): BuiltSearchResponse {
  const obj = Object.assign(
    {
      bestMatches: [
        {
          '1. symbol': 'TSCO.LON',
          '2. name': 'Tesco PLC',
          '3. type': 'Equity',
          '4. region': 'United Kingdom',
          '5. marketOpen': '08:00',
          '6. marketClose': '16:30',
          '7. timezone': 'UTC+01',
          '8. currency': 'GBX',
          '9. matchScore': '0.7273',
        },
      ],
    },
    data,
  );

  return obj;
}

export function givenDailyResponse(data?: BuiltResponse): BuiltResponse {
  const obj = Object.assign(
    {
      'Meta Data': {
        '1. Information': 'Daily Prices (open, high, low, close) and Volumes',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2022-10-07',
        '4. Output Size': 'Compact',
        '5. Time Zone': 'US/Eastern',
      },
      'Time Series (Daily)': {
        '2022-10-07': {
          '1. open': '121.5000',
          '2. high': '121.8016',
          '3. low': '118.0700',
          '4. close': '118.8200',
          '5. volume': '4499672',
        },
      },
    },
    data,
  );

  return obj;
}

export function givenDailyAdjustedResponse(
  data?: BuiltResponse,
): BuiltResponse {
  const obj = Object.assign(
    {
      'Meta Data': {
        '1. Information': 'Daily Time Series with Splits and Dividend Events',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2021-10-15',
        '4. Output Size': 'Compact',
        '5. Time Zone': 'US/Eastern',
      },
      'Time Series (Daily)': {
        '2021-10-15': {
          '1. open': '143.39',
          '2. high': '144.85',
          '3. low': '142.79',
          '4. close': '144.61',
          '5. adjusted close': '144.61',
          '6. volume': '3170857',
          '7. dividend amount': '0.0000',
          '8. split coefficient': '1.0',
        },
      },
    },
    data,
  );

  return obj;
}

export function givenWeeklyAdjustedResponse(
  data?: BuiltResponse,
): BuiltResponse {
  const obj = Object.assign(
    {
      'Meta Data': {
        '1. Information': 'Weekly Adjusted Prices and Volumes',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2021-10-18',
        '4. Time Zone': 'US/Eastern',
      },
      'Weekly Adjusted Time Series': {
        '2021-10-18': {
          '1. open': '144.0000',
          '2. high': '144.9400',
          '3. low': '141.7590',
          '4. close': '142.3200',
          '5. adjusted close': '142.3200',
          '6. volume': '6077861',
          '7. dividend amount': '0.0000',
        },
      },
    },
    data,
  );

  return obj;
}

export function givenWeeklyResponse(data?: BuiltResponse): BuiltResponse {
  const obj = Object.assign(
    {
      'Meta Data': {
        '1. Information': 'Weekly Prices (open, high, low, close) and Volumes',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2022-10-07',
        '4. Time Zone': 'US/Eastern',
      },
      'Weekly Time Series': {
        '2022-10-07': {
          '1. open': '120.1600',
          '2. high': '126.4600',
          '3. low': '118.0700',
          '4. close': '118.8200',
          '5. volume': '21614952',
        },
      },
    },
    data,
  );

  return obj;
}

export function givenMonthlyAdjustedResponse(
  data?: BuiltResponse,
): BuiltResponse {
  const obj = Object.assign(
    {
      'Meta Data': {
        '1. Information': 'Monthly Adjusted Prices and Volumes',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2021-10-19',
        '4. Time Zone': 'US/Eastern',
      },
      'Monthly Adjusted Time Series': {
        '2021-10-19': {
          '1. open': '141.0000',
          '2. high': '146.0000',
          '3. low': '139.6600',
          '4. close': '141.9800',
          '5. adjusted close': '141.9800',
          '6. volume': '60532033',
          '7. dividend amount': '0.0000',
        },
      },
    },
    data,
  );

  return obj;
}
