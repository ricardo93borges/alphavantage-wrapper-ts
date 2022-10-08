import { DataType } from '../../enum/datatype.enum';

export type WeeklyDTO = {
  symbol: string;
  datatype?: DataType;
};
