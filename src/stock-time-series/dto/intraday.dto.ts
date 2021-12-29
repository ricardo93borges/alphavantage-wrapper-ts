import { DataType } from '../../enum/datatype.enum';
import { Interval } from '../../enum/interval.enum';
import { OutputSize } from '../../enum/outputsize.enum';

export type IntradayDTO = {
  symbol: string;
  interval: Interval;
  adjusted?: boolean;
  outputsize?: OutputSize;
  datatype?: DataType;
};
