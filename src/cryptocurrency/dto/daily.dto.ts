import { DataType } from '../../enum'

export type DailyDTO = {
  symbol: string
  market: string
  datatype?: DataType
}
