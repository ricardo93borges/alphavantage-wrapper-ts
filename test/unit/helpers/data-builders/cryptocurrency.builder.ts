export type BuiltResponse = {
  [key: string]: object
}

export type BuiltSearchResponse = {
  bestMatches: object[]
}

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
        '9. Time Zone': 'UTC'
      },
      'Time Series Crypto (5min)': {
        '2021-10-28 23:20:00': {
          '1. open': '4276.53000',
          '2. high': '4279.85000',
          '3. low': '4272.61000',
          '4. close': '4279.47000',
          '5. volume': 205
        }
      }
    },
    data
  )

  return obj
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
        '7. Time Zone': 'UTC'
      },
      'Time Series (Digital Currency Monthly)': {
        '2021-10-29': {
          '1. open': '388985.64590600',
          '2. high': '407257.46014900',
          '3. low': '369602.78600000',
          '4. close': '392416.00977800',
          '5. volume': '205302.14371000'
        }
      }
    },
    data
  )

  return obj
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
        '7. Time Zone': 'UTC'
      },
      'Time Series (Digital Currency Weekly)': {
        '2021-10-29': {
          '1. open': '388985.64590600',
          '2. high': '407257.46014900',
          '3. low': '369602.78600000',
          '4. close': '392416.00977800',
          '5. volume': '205302.14371000'
        }
      }
    },
    data
  )

  return obj
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
        '7. Time Zone': 'UTC'
      },
      'Time Series (Digital Currency Daily)': {
        '2021-10-29': {
          '1. open': '388985.64590600',
          '2. high': '407257.46014900',
          '3. low': '369602.78600000',
          '4. close': '392416.00977800',
          '5. volume': '205302.14371000'
        }
      }
    },
    data
  )

  return obj
}
