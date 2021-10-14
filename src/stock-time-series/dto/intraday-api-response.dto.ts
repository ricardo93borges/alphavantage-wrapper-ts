export type APIResponseMetadata = {
  [key: string]: string;
};

export type APIResponseTimeSeries = {
  [key: string]: APIResponseTimeSeriesItem;
};

export type APIResponseTimeSeriesItem = {
  [key: string]: string;
};

export type IntradayAPIResponse = {
  [key: string]: APIResponseMetadata | APIResponseTimeSeries;
};
