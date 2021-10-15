export type SearchAPIResponseItemDTO = {
  [key: string]: string;
};

export type SearchAPIResponseDTO = {
  bestMatches: SearchAPIResponseItemDTO[];
};
