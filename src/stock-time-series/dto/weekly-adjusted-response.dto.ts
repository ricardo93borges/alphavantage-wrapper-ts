export type WeeklyAdjustedMetadata = {
  information: string;
  symbol: string;
  lastRefreshed: string;
  timeZone: string;
};

export type WeeklyAdjustedTimeSeries = {
  open: string;
  high: string;
  low: string;
  close: string;
  adjustedClose: string;
  volume: string;
  dividendAmount: string;
};

export type WeeklyAdjustedResponseDTO = {
  metadata: WeeklyAdjustedMetadata;
  timeSeries: { [key: string]: WeeklyAdjustedTimeSeries };
};
