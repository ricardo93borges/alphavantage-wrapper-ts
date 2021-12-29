export type SearchAPIResponseItemDTO = {
  [key: string]: string;
};

export type SearchAPIResponse = {
  bestMatches: SearchAPIResponseItemDTO[];
};
