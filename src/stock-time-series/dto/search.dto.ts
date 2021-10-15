import { DataType } from '../../enum/datatype.enum';

export type SearchDTO = {
  keywords: string;
  datatype?: DataType;
};
