export type DailyAdjustedMetadata = {
  information: string;
  symbol: string;
  lastRefreshed: string;
  outputSize: string;
  timeZone: string;
};

export type DailyAdjustedTimeSeries = {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  adjustedClose: string;
  dividendAmount: string;
  splitCoefficient: string;
};

export type DailyAdjustedResponse = {
  metadata: DailyAdjustedMetadata;
  timeSeries: { [key: string]: DailyAdjustedTimeSeries };
};
