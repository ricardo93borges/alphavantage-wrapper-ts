export type WeeklyMetadata = {
  information: string;
  symbol: string;
  lastRefreshed: string;
  timeZone: string;
};

export type WeeklyTimeSeries = {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type WeeklyResponse = {
  metadata: WeeklyMetadata;
  timeSeries: { [key: string]: WeeklyTimeSeries };
};
