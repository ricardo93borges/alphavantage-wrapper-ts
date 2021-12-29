export type IntradayMetadata = {
  information: string;
  symbol: string;
  lastRefreshed: string;
  interval: string;
  outputSize: string;
  timeZone: string;
};

export type IntradayTimeSeries = {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type IntradayResponse = {
  metadata: IntradayMetadata;
  timeSeries: { [key: string]: IntradayTimeSeries };
};
