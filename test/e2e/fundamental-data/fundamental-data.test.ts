import axios from 'axios'
import { API_URL } from '@/config'
import { FundamentalData } from '@/fundamental-data/FundamentalData'
import { getApiKey } from '../../utils'

describe('FundamentalData', () => {
  const api = axios.create({
    baseURL: API_URL,
    params: { apikey: getApiKey() }
  })

  describe('#companyOverview', () => {
    it('should make a request to company overview endpoint', async () => {
      const fundamentalData = new FundamentalData(api)

      let hasError = false
      try {
        await fundamentalData.companyOverview({
          symbol: 'IBM'
        })
      } catch (err) {
        console.error(err)
        hasError = true
      }

      expect(hasError).toBe(false)
    })
  })

  describe('#earnings', () => {
    it('should make a request to earnings endpoint', async () => {
      const fundamentalData = new FundamentalData(api)

      let hasError = false
      try {
        await fundamentalData.earnings({
          symbol: 'IBM'
        })
      } catch (err) {
        console.error(err)
        hasError = true
      }

      expect(hasError).toBe(false)
    })
  })

  describe('#listingStatus', () => {
    it('should make a request to listing status endpoint', async () => {
      const fundamentalData = new FundamentalData(api)

      let hasError = false
      try {
        await fundamentalData.listingStatus()
      } catch (err) {
        console.error(err)
        hasError = true
      }

      expect(hasError).toBe(false)
    })
  })
})
