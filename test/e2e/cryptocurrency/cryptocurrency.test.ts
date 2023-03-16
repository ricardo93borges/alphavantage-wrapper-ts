import axios from 'axios'
import { API_URL } from '@/config'
import { Cryptocurrency } from '@/cryptocurrency/Cryptocurrency'
import { Interval } from '@/enum/'
import { getApiKey } from '../../utils'

describe('Cryptocurrency', () => {
  const api = axios.create({
    baseURL: API_URL,
    params: { apikey: getApiKey() }
  })

  describe('#intraday', () => {
    it('should make a request to intraday endpoint', async () => {
      const cryptocurrency = new Cryptocurrency(api)

      let hasError = false
      try {
        await cryptocurrency.intraday({
          symbol: 'ETH',
          market: 'USD',
          interval: Interval.SIXTY_MIN
        })
      } catch (err) {
        console.error(err)
        hasError = true
      }

      expect(hasError).toBe(false)
    })
  })

  describe('#monthly', () => {
    it('should make a request to monthly endpoint', async () => {
      const cryptocurrency = new Cryptocurrency(api)

      let hasError = false
      try {
        await cryptocurrency.monthly({
          symbol: 'ETH',
          market: 'USD'
        })
      } catch (err) {
        console.error(err)
        hasError = true
      }

      expect(hasError).toBe(false)
    })
  })

  describe('#weekly', () => {
    it('should make a request to weekly endpoint', async () => {
      const cryptocurrency = new Cryptocurrency(api)

      let hasError = false
      try {
        await cryptocurrency.weekly({
          symbol: 'ETH',
          market: 'USD'
        })
      } catch (err) {
        console.error(err)
        hasError = true
      }

      expect(hasError).toBe(false)
    })
  })

  describe('#daily', () => {
    it('should make a request to daily endpoint', async () => {
      const cryptocurrency = new Cryptocurrency(api)

      let hasError = false
      try {
        await cryptocurrency.daily({
          symbol: 'ETH',
          market: 'USD'
        })
      } catch (err) {
        console.error(err)
        hasError = true
      }

      expect(hasError).toBe(false)
    })
  })
})
