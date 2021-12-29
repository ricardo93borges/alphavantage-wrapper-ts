export type DailyMetadata = {
  information: string;
  digitalCurrencyCode: string;
  digitalCurrencyName: string;
  marketCode: string;
  marketName: string;
  lastRefreshed: string;
  timeZone: string;
};

export type DailyTimeSeries = {
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

export type DailyResponse = {
  metadata: DailyMetadata;
  timeSeries: { [key: string]: DailyTimeSeries };
};
