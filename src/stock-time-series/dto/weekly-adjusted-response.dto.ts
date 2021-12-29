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

export type WeeklyAdjustedResponse = {
  metadata: WeeklyAdjustedMetadata;
  timeSeries: { [key: string]: WeeklyAdjustedTimeSeries };
};
