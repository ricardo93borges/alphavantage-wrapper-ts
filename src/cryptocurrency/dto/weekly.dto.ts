import { DataType } from '../..';

export type WeeklyDTO = {
  symbol: string;
  market: string;
  datatype?: DataType;
};
