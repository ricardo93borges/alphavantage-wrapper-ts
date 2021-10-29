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
        '1. Information': 'Crypto Intraday (5min) Time Series',
        '2. Digital Currency Code': 'ETH',
        '3. Digital Currency Name': 'Ethereum',
        '4. Market Code': 'USD',
        '5. Market Name': 'United States Dollar',
        '6. Last Refreshed': '2021-10-28 23:20:00',
        '7. Interval': '5min',
        '8. Output Size': 'Compact',
        '9. Time Zone': 'UTC',
      },
      'Time Series Crypto (5min)': {
        '2021-10-28 23:20:00': {
          '1. open': '4276.53000',
          '2. high': '4279.85000',
          '3. low': '4272.61000',
          '4. close': '4279.47000',
          '5. volume': 205,
        },
      },
    },
    data,
  );

  return obj;
}
