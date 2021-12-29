export type MonthlyMetadata = {
  information: string;
  digitalCurrencyCode: string;
  digitalCurrencyName: string;
  marketCode: string;
  marketName: string;
  lastRefreshed: string;
  timeZone: string;
};

export type MonthlyTimeSeries = {
  openMarket: string;
  openUSD: string;
  highMarket: string;
  highUSD: string;
  lowMarket: string;
  lowUSD: string;
  closeMarket: string;
  closeUSD: string;
  volume: string;
  marketCap: string;
};

export type MonthlyResponse = {
  metadata: MonthlyMetadata;
  timeSeries: { [key: string]: MonthlyTimeSeries };
};
