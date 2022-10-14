export type DailyMetadata = {
  information: string;
  symbol: string;
  lastRefreshed: string;
  outputSize: string;
  timeZone: string;
};

export type DailyTimeSeries = {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type DailyResponse = {
  metadata: DailyMetadata;
  timeSeries: { [key: string]: DailyTimeSeries };
};
