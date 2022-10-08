import { DataType } from '../../enum/datatype.enum';
import { OutputSize } from '../../enum/outputsize.enum';

export type DailyDTO = {
  symbol: string;
  outputsize?: OutputSize;
  datatype?: DataType;
};
