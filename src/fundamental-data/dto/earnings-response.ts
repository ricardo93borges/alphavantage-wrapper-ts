export type AnnualEarnings = {
  fiscalDateEnding: string;
  reportedEPS: string;
};

export type QuarterlyEarnings = {
  fiscalDateEnding: string;
  reportedDate: string;
  reportedEPS: string;
  estimatedEPS: string;
  surprise: string;
  surprisePercentage: string;
};

export type EarningsResponse = {
  symbol: string;
  annualEarnings: AnnualEarnings[];
  quarterlyEarnings: QuarterlyEarnings[];
};
