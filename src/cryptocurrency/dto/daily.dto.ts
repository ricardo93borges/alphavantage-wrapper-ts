import { DataType } from '../..';

export type DailyDTO = {
  symbol: string;
  market: string;
  datatype?: DataType;
};
