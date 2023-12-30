import { DataType } from '../../enum'

export type MonthlyDTO = {
  symbol: string
  market: string
  datatype?: DataType
}
