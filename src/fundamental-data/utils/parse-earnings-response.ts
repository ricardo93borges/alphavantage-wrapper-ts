import { ParseResponseError } from '@/errors'
import { AnnualEarnings, EarningsResponse, QuarterlyEarnings } from '../dto'

export type EarningsAPIResponseDTO = {
  [key: string]: { [key: string]: string }[]
}

function parseAnnualEarnings(
  annualEarnings: { [key: string]: string }[]
): AnnualEarnings[] {
  return annualEarnings.map((value) => {
    return {
      fiscalDateEnding: value['fiscalDateEnding'],
      reportedEPS: value['reportedEPS']
    }
  })
}

function parseQuarterlyEarnings(
  quarterlyEarnings: { [key: string]: string }[]
): QuarterlyEarnings[] {
  return quarterlyEarnings.map((value) => {
    return {
      fiscalDateEnding: value['fiscalDateEnding'],
      reportedDate: value['reportedDate'],
      reportedEPS: value['reportedEPS'],
      estimatedEPS: value['estimatedEPS'],
      surprise: value['surprise'],
      surprisePercentage: value['surprisePercentage']
    }
  })
}

export function parseEarningsResponse(
  response: EarningsAPIResponseDTO
): EarningsResponse {
  try {
    return {
      symbol: response['symbol'].toString(),
      annualEarnings: parseAnnualEarnings(response['annualEarnings']),
      quarterlyEarnings: parseQuarterlyEarnings(response['quarterlyEarnings'])
    }
  } catch (err) {
    throw new ParseResponseError('fail to parse earnings response', err)
  }
}
