export type MonthlyAdjustedMetadata = {
  information: string;
  symbol: string;
  lastRefreshed: string;
  timeZone: string;
};

export type MonthlyAdjustedTimeSeries = {
  open: string;
  high: string;
  low: string;
  close: string;
  adjustedClose: string;
  volume: string;
  dividendAmount: string;
};

export type MonthlyAdjustedResponse = {
  metadata: MonthlyAdjustedMetadata;
  timeSeries: { [key: string]: MonthlyAdjustedTimeSeries };
};
