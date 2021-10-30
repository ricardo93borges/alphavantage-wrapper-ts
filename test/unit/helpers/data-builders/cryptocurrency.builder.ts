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

export function givenMonthlyResponse(data?: BuiltResponse): BuiltResponse {
  const obj = Object.assign(
    {
      'Meta Data': {
        '1. Information': 'Monthly Prices and Volumes for Digital Currency',
        '2. Digital Currency Code': 'ETH',
        '3. Digital Currency Name': 'Ethereum',
        '4. Market Code': 'CNY',
        '5. Market Name': 'Chinese Yuan',
        '6. Last Refreshed': '2021-10-29 00:00:00',
        '7. Time Zone': 'UTC',
      },
      'Time Series (Digital Currency Monthly)': {
        '2021-10-29': {
          '1a. open (CNY)': '19180.86322600',
          '1b. open (USD)': '3000.62000000',
          '2a. high (CNY)': '28161.27765000',
          '2b. high (USD)': '4405.50000000',
          '3a. low (CNY)': '18979.18616100',
          '3b. low (USD)': '2969.07000000',
          '4a. close (CNY)': '27845.56195300',
          '4b. close (USD)': '4356.11000000',
          '5. volume': '13202580.62690000',
          '6. market cap (USD)': '13202580.62690000',
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
        '1. Information': 'Weekly Prices and Volumes for Digital Currency',
        '2. Digital Currency Code': 'BTC',
        '3. Digital Currency Name': 'Bitcoin',
        '4. Market Code': 'CNY',
        '5. Market Name': 'Chinese Yuan',
        '6. Last Refreshed': '2021-10-29 00:00:00',
        '7. Time Zone': 'UTC',
      },
      'Time Series (Digital Currency Weekly)': {
        '2021-10-29': {
          '1a. open (CNY)': '388985.64590600',
          '1b. open (USD)': '60852.22000000',
          '2a. high (CNY)': '407257.46014900',
          '2b. high (USD)': '63710.63000000',
          '3a. low (CNY)': '369602.78600000',
          '3b. low (USD)': '57820.00000000',
          '4a. close (CNY)': '392416.00977800',
          '4b. close (USD)': '61388.86000000',
          '5. volume': '205302.14371000',
          '6. market cap (USD)': '205302.14371000',
        },
      },
    },
    data,
  );

  return obj;
}

export function givenDailyResponse(data?: BuiltResponse): BuiltResponse {
  const obj = Object.assign(
    {
      'Meta Data': {
        '1. Information': 'Daily Prices and Volumes for Digital Currency',
        '2. Digital Currency Code': 'BTC',
        '3. Digital Currency Name': 'Bitcoin',
        '4. Market Code': 'CNY',
        '5. Market Name': 'Chinese Yuan',
        '6. Last Refreshed': '2021-10-29 00:00:00',
        '7. Time Zone': 'UTC',
      },
      'Time Series (Digital Currency Daily)': {
        '2021-10-29': {
          '1a. open (CNY)': '387219.32557000',
          '1b. open (USD)': '60575.90000000',
          '2a. high (CNY)': '396961.83000000',
          '2b. high (USD)': '62100.00000000',
          '3a. low (CNY)': '384655.43796300',
          '3b. low (USD)': '60174.81000000',
          '4a. close (CNY)': '392416.00977800',
          '4b. close (USD)': '61388.86000000',
          '5. volume': '5049.96165000',
          '6. market cap (USD)': '5049.96165000',
        },
      },
    },
    data,
  );

  return obj;
}
