import { DataType } from '../../enum/datatype.enum';

export type WeeklyAdjustedDTO = {
  symbol: string;
  datatype?: DataType;
};
