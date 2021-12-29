export type WeeklyMetadata = {
  information: string;
  digitalCurrencyCode: string;
  digitalCurrencyName: string;
  marketCode: string;
  marketName: string;
  lastRefreshed: string;
  timeZone: string;
};

export type WeeklyTimeSeries = {
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

export type WeeklyResponse = {
  metadata: WeeklyMetadata;
  timeSeries: { [key: string]: WeeklyTimeSeries };
};
