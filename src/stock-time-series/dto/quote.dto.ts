import { DataType } from '../../enum/datatype.enum';

export type QuoteDTO = {
  symbol: string;
  datatype?: DataType;
};
