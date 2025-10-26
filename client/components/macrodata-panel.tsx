"use client";

import { Shapes } from "lucide-react";
import WindowLayout from "./window-layout";
import DynamicTable from "./global/dynamic-table";

const MacroDataPanel = () => {
    // --- Data ---
    const macroDataMock = [
        // FX & indices
        { id: "DXY", Name: "DXY (USD Index)", Value: 106.82, Unit: "", Change24h: "+0.22%", sparkline: [106.3, 106.5, 106.7, 106.82], Note: "USD strength", source: "ECB/Market" },
        { id: "EURUSD", Name: "EUR / USD", Value: 1.0725, Unit: "USD", Change24h: "-0.18%", sparkline: [1.078, 1.075, 1.073, 1.0725], source: "FX" },
        { id: "USDINR", Name: "USD / INR", Value: 83.12, Unit: "INR", Change24h: "-0.21%", sparkline: [83.20, 83.15, 83.10, 83.12], source: "RBI" },
        { id: "USDJPY", Name: "USD / JPY", Value: 155.32, Unit: "JPY", Change24h: "+0.35%", sparkline: [154.9, 155.0, 155.1, 155.32], source: "BOJ/FX" },

        // Commodities
        { id: "GOLD", Name: "Gold (XAU)", Value: 1960.50, Unit: "USD/oz", Change24h: "+0.45%", sparkline: [1940, 1950, 1955, 1960.5], Note: "Safe-haven", source: "COMEX" },
        { id: "SILVER", Name: "Silver (XAG)", Value: 24.60, Unit: "USD/oz", Change24h: "+0.90%", sparkline: [23.9, 24.2, 24.4, 24.6], source: "COMEX" },
        { id: "WTI", Name: "Crude Oil (WTI)", Value: 91.23, Unit: "USD/bbl", Change24h: "-0.18%", sparkline: [91.5, 91.4, 91.2, 91.23], source: "NYMEX" },
        { id: "BRENT", Name: "Crude Oil (Brent)", Value: 95.53, Unit: "USD/bbl", Change24h: "-0.10%", sparkline: [95.7, 95.6, 95.5, 95.53] },
        { id: "COPPER", Name: "Copper", Value: 3.95, Unit: "USD/lb", Change24h: "+0.8%", sparkline: [3.88, 3.9, 3.93, 3.95] },
        { id: "NATGAS", Name: "Natural Gas", Value: 3.65, Unit: "USD/MMBtu", Change24h: "+2.1%", sparkline: [3.4, 3.5, 3.6, 3.65] },

        // Volatility / Risk
        { id: "VIX", Name: "VIX (Equity Vol)", Value: 17.8, Unit: "", Change24h: "+8.2%", sparkline: [16.5, 16.8, 17.2, 17.8], Note: "elevated risk", source: "CBOE" },
        { id: "MOVE", Name: "MOVE (Bond Vol)", Value: 96.3, Unit: "", Change24h: "+1.6%", sparkline: [95.0, 95.5, 96.0, 96.3], source: "Market" },

        // Interest rates & yields
        { id: "US10Y", Name: "US 10y Yield", Value: 4.42, Unit: "%", Change24h: "+4 bps", sparkline: [4.35, 4.38, 4.40, 4.42], source: "UST" },
        { id: "US2Y", Name: "US 2y Yield", Value: 4.87, Unit: "%", Change24h: "+2 bps", sparkline: [4.80, 4.82, 4.85, 4.87] },
        { id: "IN10Y", Name: "India 10y Yield", Value: 7.24, Unit: "%", Change24h: "+1 bp", sparkline: [7.21, 7.22, 7.23, 7.24], source: "India Govt" },
        { id: "YieldCurve", Name: "10y-2y Slope (US)", Value: -45, Unit: "bps", Change24h: "-3 bps", sparkline: [-40, -42, -44, -45] },

        // Policy rates
        { id: "FED_RATE", Name: "Fed Funds (Target)", Value: 5.50, Unit: "%", Change24h: "unch", source: "Federal Reserve" },
        { id: "RBI_REPO", Name: "RBI Repo Rate", Value: 6.50, Unit: "%", Change24h: "unch", source: "RBI" },
        { id: "ECB_RATE", Name: "ECB Deposit Rate", Value: 4.00, Unit: "%", Change24h: "unch", source: "ECB" },

        // Macro releases (key leading/coincident)
        { id: "US_NFP", Name: "US Nonfarm Payrolls (MoM)", Value: 150000, Unit: "jobs", Change24h: "vs est 145k", sparkline: [150000], source: "BLS" },
        { id: "US_UNEMP", Name: "US Unemployment Rate", Value: 3.8, Unit: "%", Change24h: "-0.1 pt", source: "BLS" },
        { id: "US_CPI", Name: "US CPI (YoY)", Value: 3.4, Unit: "%", Change24h: "-0.1 pt", source: "BLS" },
        { id: "CORE_CPI", Name: "US Core CPI (YoY)", Value: 3.6, Unit: "%", source: "BLS" },
        { id: "US_GDP", Name: "US GDP (QoQ, annualized)", Value: 2.1, Unit: "%", Change24h: "Q3 preliminary", source: "BEA" },
        { id: "PMI_MFG", Name: "Global PMI (Manufacturing)", Value: 49.6, Unit: "index", Change24h: "-0.4", source: "Markit/ISM" },
        { id: "PMI_SRV", Name: "Global PMI (Services)", Value: 51.2, Unit: "index", source: "Markit/ISM" },

        // Consumption & confidence
        { id: "RETAIL", Name: "Retail Sales (MoM)", Value: 0.4, Unit: "%", Change24h: "vs est 0.3%", source: "Census/BLS" },
        { id: "CONS_CONF", Name: "Consumer Confidence (Conf. Board)", Value: 101.5, Unit: "index", Change24h: "-1.2", source: "Conference Board" },
        { id: "UMICH_SENT", Name: "UMich Consumer Sentiment", Value: 67.8, Unit: "index", source: "UMich" },

        // Production & housing
        { id: "IND_PROD", Name: "Industrial Production (YoY)", Value: 1.8, Unit: "%", source: "Census" },
        { id: "HOUSING_STARTS", Name: "Housing Starts", Value: 1.29, Unit: "Mn annualized", Change24h: "-2%", source: "Census" },

        // Credit / spreads / flows
        { id: "HY_OAS", Name: "High Yield OAS", Value: 420, Unit: "bps", Change24h: "+5 bps", source: "BofA" },
        { id: "CDS_IG", Name: "IG CDS (5y)", Value: 72, Unit: "bps", Change24h: "+1 bp", source: "Markit" },
        { id: "ETF_FLOWS", Name: "Global Equity ETF Flows", Value: -1.2, Unit: "USD bn (7d)", Change24h: "-0.2", Note: "outflows", source: "EPFR" },
        { id: "FII_DII", Name: "FII / DII Net Flows (INR Cr)", Value: 5320, Unit: "INR Cr (wk)", Change24h: "", source: "Exchange" },

        // FX reserves / trade
        { id: "TRADE_BAL", Name: "Trade Balance (USD)", Value: -12.3, Unit: "USD bn (MoM)", Change24h: "", source: "Census/BoP" },
        { id: "FX_RESERVES", Name: "FX Reserves", Value: 560, Unit: "USD bn", Change24h: "-1.2%", source: "Central Bank" },

        // Crypto (cross-asset)
        { id: "BTC_USD", Name: "Bitcoin", Value: 56000, Unit: "USD", Change24h: "+2.5%", sparkline: [54200, 54800, 55500, 56000], source: "Coinbase" },

        // Technical macro gauges (composite)
        { id: "LEADING_INDEX", Name: "Composite Leading Index", Value: 101.2, Unit: "index", Change24h: "-0.1", source: "Conference Board" },
        { id: "CPI_PCE_CORE", Name: "US Core PCE (YoY)", Value: 2.9, Unit: "%", source: "BEA" },
    ];

    const headers = [
        "id",
        "Name",
        "Value",
        "Unit",
        "Change24h",
        "Note",
    ];

    return (
        <WindowLayout title="Macro Insights" icon={Shapes}>
            <DynamicTable
                headers={headers}
                data={macroDataMock}
                title="Macro's Insights"
                rowsPerPageProps={10}
            />
        </WindowLayout>
    );
};

export default MacroDataPanel;
