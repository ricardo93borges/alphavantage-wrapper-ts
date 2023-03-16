import { DataType } from '@/enum'

export type WeeklyDTO = {
  symbol: string
  market: string
  datatype?: DataType
}
