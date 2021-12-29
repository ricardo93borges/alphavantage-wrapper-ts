export type IntradayMetadata = {
  information: string;
  digitalCurrencyCode: string;
  digitalCurrencyName: string;
  marketCode: string;
  marketName: string;
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
  volume: number;
};

export type IntradayResponse = {
  metadata: IntradayMetadata;
  timeSeries: { [key: string]: IntradayTimeSeries };
};
