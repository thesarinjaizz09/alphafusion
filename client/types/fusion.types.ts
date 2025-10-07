interface ExchangeInfoType {
    name: string;
    country: string;
    flag: string;
    timezone: string;
    currency: string;
    marketStatus: string;
    listedCompanies: string;
    marketCap: string;
    dailyVolume: string;
    topSector: string;
    topStocks: string[];
    mainIndices: string[];
    regulator: string;
    exchangeType: string;
    tradingHours: string;
    website: string;
    dataReliability: string;
}

export type { ExchangeInfoType };