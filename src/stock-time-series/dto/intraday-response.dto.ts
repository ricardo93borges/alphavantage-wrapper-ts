export type Metadata = {
  information: string;
  symbol: string;
  lastRefreshed: string;
  interval: string;
  outputSize: string;
  timeZone: string;
};

export type TimeSeries = {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type IntradayResponseDTO = {
  metadata: Metadata;
  timeSeries: { [key: string]: TimeSeries };
};
