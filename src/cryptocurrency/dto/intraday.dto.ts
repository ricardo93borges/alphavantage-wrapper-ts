import { DataType, Interval, OutputSize } from '../..';

export type IntradayDTO = {
  symbol: string;
  market: string;
  interval: Interval;
  outputsize?: OutputSize;
  datatype?: DataType;
};
