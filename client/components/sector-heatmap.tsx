"use client";
import * as d3 from "d3";
import WindowLayout from "./window-layout";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Flame, TrendingUp, TrendingDown, BarChart3, ChevronLeft, ChevronRight, Search, ArrowUpDown } from "lucide-react";
import NoResults from "./ui/no-results";

interface Stock {
  symbol: string;
  change: number;
  volume: number;
  sector: string;
  price?: number;
  marketCap?: number;
}

interface Sector {
  sector: string;
  count: number;
  marketCap: number;
  avgChange: number;
  stocks: Stock[]
}
interface SectorStockHeatmapProps {
  sector: string;
  stocks: Stock[];
}

interface MarketHeatMapProps {
  data?: Stock[];
  sectorsPerPage?: number;
}

const colorScale = (avgChange: number) => {
  if (avgChange <= -5) return "#b91c1c";
  if (avgChange < 0) return "#f87171";
  if (avgChange === 0) return "#1f2937";
  if (avgChange < 5) return "#34d399";
  return "#059669";
};

const defaultData: Stock[] = [
  // 🟩 IT / Tech
  { symbol: "INFY", change: 2.34, volume: 1.8, sector: "IT", price: 1850.50, marketCap: 7.8 },
  { symbol: "TCS", change: 1.82, volume: 2.1, sector: "IT", price: 3850.25, marketCap: 14.2 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },

  // 🏦 Banking
  { symbol: "HDFCBANK", change: -0.72, volume: 2.9, sector: "Banking", price: 1650.80, marketCap: 12.4 },
  { symbol: "ICICIBANK", change: 0.63, volume: 3.5, sector: "Banking", price: 950.45, marketCap: 6.7 },
  { symbol: "SBIN", change: 1.04, volume: 3.9, sector: "Banking", price: 580.20, marketCap: 5.2 },

  // ⚡ Energy
  { symbol: "ONGC", change: -2.35, volume: 3.4, sector: "Energy", price: 185.60, marketCap: 2.3 },
  { symbol: "ADANIPOWER", change: 3.12, volume: 2.8, sector: "Energy", price: 425.30, marketCap: 1.6 },
  { symbol: "COALINDIA", change: -1.68, volume: 2.3, sector: "Energy", price: 245.80, marketCap: 1.5 },

  // 🏭 Manufacturing
  { symbol: "TATAMOTORS", change: 1.96, volume: 4.3, sector: "Manufacturing", price: 750.40, marketCap: 2.5 },
  { symbol: "ASHOKLEY", change: -0.45, volume: 1.7, sector: "Manufacturing", price: 125.90, marketCap: 0.8 },

  // 🚘 Auto
  { symbol: "MARUTI", change: 0.82, volume: 1.1, sector: "Auto", price: 10850.75, marketCap: 3.2 },
  { symbol: "BAJAJ-AUTO", change: -1.15, volume: 1.2, sector: "Auto", price: 4850.60, marketCap: 1.4 },

  // 🧴 FMCG
  { symbol: "ITC", change: 1.21, volume: 2.2, sector: "FMCG", price: 485.25, marketCap: 6.1 },
  { symbol: "HINDUNILVR", change: -0.84, volume: 1.8, sector: "FMCG", price: 2450.80, marketCap: 5.7 },

  // 🏗️ Infrastructure
  { symbol: "LNT", change: 2.94, volume: 2.7, sector: "Infrastructure", price: 3250.45, marketCap: 2.3 },
  { symbol: "DLF", change: -1.26, volume: 1.9, sector: "Infrastructure", price: 485.60, marketCap: 1.2 },

  // 🧪 Pharma
  { symbol: "SUNPHARMA", change: 0.62, volume: 2.4, sector: "Pharma", price: 1250.30, marketCap: 3.0 },
  { symbol: "CIPLA", change: -2.48, volume: 1.5, sector: "Pharma", price: 1250.90, marketCap: 1.0 },

  // 💰 Finance / NBFC
  { symbol: "BAJFINANCE", change: 2.37, volume: 3.2, sector: "Finance", price: 7250.40, marketCap: 4.5 },
  { symbol: "HDFCLIFE", change: -1.63, volume: 1.7, sector: "Finance", price: 650.25, marketCap: 1.3 },

  // 🛒 Retail
  { symbol: "DMART", change: 1.15, volume: 2.0, sector: "Retail", price: 4250.80, marketCap: 2.7 },
  { symbol: "TRENT", change: -0.96, volume: 1.4, sector: "Retail", price: 3250.60, marketCap: 0.9 },

  // ✈️ Aviation
  { symbol: "INDIGO", change: 3.45, volume: 2.9, sector: "Aviation", price: 2450.75, marketCap: 1.8 },
  { symbol: "SPICEJET", change: -1.83, volume: 1.2, sector: "Aviation", price: 45.30, marketCap: 0.3 },

  // 🏠 Real Estate
  { symbol: "GODREJPROP", change: -2.72, volume: 1.6, sector: "Real Estate", price: 1250.40, marketCap: 0.8 },
  { symbol: "OBEROIRLTY", change: 1.93, volume: 1.5, sector: "Real Estate", price: 1250.90, marketCap: 0.6 },

  // 📶 Telecom
  { symbol: "AIRTEL", change: 0.72, volume: 2.8, sector: "Telecom", price: 950.25, marketCap: 5.4 },
  { symbol: "VODAFONEIDEA", change: -1.24, volume: 3.1, sector: "Telecom", price: 12.80, marketCap: 0.6 },

  // 🧠 Education
  { symbol: "NIIT", change: 2.85, volume: 1.2, sector: "Education", price: 125.60, marketCap: 0.2 },
  { symbol: "CAREERPOINT", change: -0.56, volume: 0.8, sector: "Education", price: 485.40, marketCap: 0.1 },

  // 🔬 Chemicals
  { symbol: "TATACHEM", change: 1.42, volume: 2.0, sector: "Chemicals", price: 1250.75, marketCap: 1.2 },
  { symbol: "GUJALKALI", change: -1.98, volume: 1.4, sector: "Chemicals", price: 485.20, marketCap: 0.8 },

  // 🪙 Metals
  { symbol: "TATASTEEL", change: 3.18, volume: 3.5, sector: "Metals", price: 125.80, marketCap: 1.5 },
  { symbol: "JSWSTEEL", change: -2.14, volume: 2.9, sector: "Metals", price: 825.60, marketCap: 2.0 },

  // 🛰️ Defense
  { symbol: "HAL", change: 2.63, volume: 2.1, sector: "Defense", price: 3250.40, marketCap: 1.1 },
  { symbol: "BEL", change: -1.42, volume: 2.5, sector: "Defense", price: 125.90, marketCap: 0.3 },

  // 🌱 Agriculture
  { symbol: "UPL", change: -0.75, volume: 2.0, sector: "Agriculture", price: 485.30, marketCap: 0.7 },
  { symbol: "NATIONALFERT", change: 1.48, volume: 1.6, sector: "Agriculture", price: 95.80, marketCap: 0.2 },

  // 🧳 Tourism
  { symbol: "INDHOTEL", change: 2.05, volume: 2.2, sector: "Tourism", price: 425.60, marketCap: 0.5 },
  { symbol: "EIHOTEL", change: -1.02, volume: 1.3, sector: "Tourism", price: 125.40, marketCap: 0.3 },

  // 📈 Insurance
  { symbol: "SBI-LIFE", change: 1.76, volume: 1.9, sector: "Insurance", price: 1250.25, marketCap: 1.2 },
  { symbol: "ICICI-PRU", change: -0.68, volume: 1.5, sector: "Insurance", price: 485.80, marketCap: 0.8 },

  // 🔧 Engineering
  { symbol: "ABB", change: 3.12, volume: 2.4, sector: "Engineering", price: 3250.90, marketCap: 0.7 },
  { symbol: "THERMAX", change: -1.35, volume: 1.8, sector: "Engineering", price: 2250.60, marketCap: 0.5 },

  // 💡 Power Utilities
  { symbol: "NTPC", change: 1.94, volume: 3.1, sector: "Power", price: 225.40, marketCap: 2.2 },
  { symbol: "TATAPOWER", change: -0.92, volume: 2.7, sector: "Power", price: 285.80, marketCap: 0.9 },

  // 🚚 Logistics
  { symbol: "CONCOR", change: 2.41, volume: 2.3, sector: "Logistics", price: 725.60, marketCap: 0.4 },
  { symbol: "BLUEDART", change: -1.76, volume: 1.2, sector: "Logistics", price: 6250.40, marketCap: 0.3 },

  // 🧵 Textiles
  { symbol: "PAGEIND", change: -0.84, volume: 1.0, sector: "Textiles", price: 4250.80, marketCap: 0.2 },
  { symbol: "ARVIND", change: 1.25, volume: 1.4, sector: "Textiles", price: 85.30, marketCap: 0.1 },

  // 🍻 Beverages
  { symbol: "UBL", change: 0.86, volume: 1.5, sector: "Beverages", price: 1250.60, marketCap: 0.3 },
  { symbol: "RADICO", change: -1.14, volume: 1.0, sector: "Beverages", price: 125.90, marketCap: 0.1 },

  // 💍 Jewellery
  { symbol: "TITAN", change: 1.62, volume: 2.1, sector: "Jewellery", price: 3250.40, marketCap: 2.9 },
  { symbol: "RAJESHEXPO", change: -0.72, volume: 0.9, sector: "Jewellery", price: 125.80, marketCap: 0.1 },

  // 💊 Healthcare Services
  { symbol: "APOLLOHOSP", change: 1.28, volume: 1.8, sector: "Healthcare", price: 5250.60, marketCap: 0.7 },
  { symbol: "FORTIS", change: -1.06, volume: 1.3, sector: "Healthcare", price: 285.40, marketCap: 0.2 },

  // 🧰 Construction Materials
  { symbol: "ULTRACEMCO", change: 1.54, volume: 2.0, sector: "Cement", price: 8250.80, marketCap: 2.4 },
  { symbol: "AMBUJACEM", change: -0.92, volume: 1.7, sector: "Cement", price: 525.60, marketCap: 1.0 },

  // 🖥️ Electronics / Semiconductors
  { symbol: "DIXON", change: 3.12, volume: 1.9, sector: "Electronics", price: 4250.40, marketCap: 0.3 },
  { symbol: "MOTHERSON", change: -1.45, volume: 2.3, sector: "Electronics", price: 125.90, marketCap: 0.2 },

  // 📦 Packaging
  { symbol: "UFLEX", change: 1.21, volume: 1.1, sector: "Packaging", price: 485.60, marketCap: 0.1 },
  { symbol: "HUHTAMAKI", change: -0.88, volume: 0.9, sector: "Packaging", price: 225.40, marketCap: 0.1 },

  // 🛠️ Mining
  { symbol: "NMDC", change: 2.82, volume: 3.1, sector: "Mining", price: 185.80, marketCap: 0.5 },
  { symbol: "HINDZINC", change: -1.44, volume: 2.2, sector: "Mining", price: 325.60, marketCap: 0.4 },

  // 📡 Media & Entertainment
  { symbol: "ZEEL", change: -1.65, volume: 2.8, sector: "Media", price: 185.40, marketCap: 0.2 },
  { symbol: "SUNTV", change: 1.32, volume: 1.9, sector: "Media", price: 625.80, marketCap: 0.2 },

  // 🧾 Consulting / Services
  { symbol: "LTIM", change: 2.15, volume: 1.6, sector: "Consulting", price: 5250.60, marketCap: 0.8 },
  { symbol: "KPITTECH", change: -0.74, volume: 1.3, sector: "Consulting", price: 1250.40, marketCap: 0.2 },

  // 🌐 Internet / E-commerce
  { symbol: "ZOMATO", change: 3.48, volume: 4.0, sector: "Internet", price: 125.80, marketCap: 1.1 },
  { symbol: "NYKAA", change: -1.82, volume: 2.6, sector: "Internet", price: 185.60, marketCap: 0.4 },
];

// Component for individual stock heatmap within a sector
const SectorStockHeatmap: React.FC<SectorStockHeatmapProps> = ({ sector, stocks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Stock; direction: "asc" | "desc" } | null>({ key: "change", direction: "desc" });

  const stocksPerPage = 12;

  const { sectorMap, totalPages, paginatedStocks } = useMemo(() => {

    // Sorting
    if (sortConfig) {
      const { key, direction } = sortConfig;
      stocks.sort((a, b) => {
        let aVal: any = a[key];
        let bVal: any = b[key];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return direction === "asc" ? aVal - bVal : bVal - aVal;
        }

        return direction === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    const filtered = stocks.filter((s) => {
      const query = search.toLowerCase();

      // Combine all possible fields into one string
      const searchableText = [
        s.symbol,
        s.sector,
        s.change?.toString(),
        s.volume?.toString(),
        s.price?.toString(),
        s.marketCap?.toString(),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });


    const totalPages = Math.ceil(filtered.length / stocksPerPage);
    const start = (currentPage - 1) * stocksPerPage;
    const end = start + stocksPerPage;
    const paginatedStocks = filtered.slice(start, end);

    return { sectorMap: stocks, totalPages, paginatedStocks };
  }, [stocks, currentPage, stocksPerPage, search, sortConfig]);

  const handleSort = (key: keyof Stock) => {
    if (sortConfig?.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === "asc" ? "desc" : "asc" });
    } else {
      setSortConfig({ key, direction: "desc" });
    }
  };


  return (
    <div className="w-full overflow-visible">
      <div className="flex flex-col items-center justify-start mb-2 gap-2">
        <div className="flex items-center bg-[#10182A] rounded-sm px-2 py-1 w-full border border-gray-700">
          <Search className="w-3 h-3 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent text-gray-200 text-[10px] outline-none w-full placeholder-gray-500"
          />
        </div>
        <div className="flex items-start w-full justify-between gap-3 text-[10px] text-gray-400">
          <button onClick={() => handleSort("change")} className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
            Change <ArrowUpDown className="w-3 h-3" />
          </button>
          <button onClick={() => handleSort("marketCap")} className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
            MCap <ArrowUpDown className="w-3 h-3" />
          </button>
          <button onClick={() => handleSort("price")} className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
            Price <ArrowUpDown className="w-3 h-3" />
          </button>
          <button onClick={() => handleSort("volume")} className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
            Volume <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 overflow-visible">
        {paginatedStocks.map((stock) => (
          <Tooltip key={stock.symbol}>
            <TooltipTrigger asChild>
              <div
                className="rounded-sm px-2 py-2 cursor-pointer flex justify-between items-center"
                style={{ backgroundColor: colorScale(stock.change) }}
              >
                <span className="text-white text-[10px] font-semibold">{stock.symbol}</span>
                <span className="text-white text-[10px] font-bold">
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </span>
              </div>
            </TooltipTrigger>

            <TooltipContent
              side="right"
              align="center"
              className="text-[9px] bg-[#0f172a] border border-accent/30 rounded-sm shadow-lg p-2 min-w-[150px] max-w-xs"
            >
              <div className="uppercase font-semibold text-yellow-400">{stock.symbol}</div>
              <div className="mb-1">{sector}</div>
              <div className="flex justify-between border-t border-gray-700 pt-1">
                <span>Price</span>
                <span>₹{stock.price?.toFixed(2) || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>Change</span>
                <span
                  className={
                    stock.change >= 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"
                  }
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Volume</span>
                <span>{stock.volume.toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span>Market Cap</span>
                <span>{stock.marketCap?.toFixed(1)}M</span>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center text-gray-400 text-xs mt-2 px-2">
          <button
            disabled={currentPage === 1}
            className="text-accent disabled:text-gray-600"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>
          <span>
            Page <span className="text-accent">{currentPage}</span> of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            className="text-accent disabled:text-gray-600"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};


const SectorHeatMap: React.FC<MarketHeatMapProps> = ({
  data = defaultData,
  sectorsPerPage = 20,
}) => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Sector; direction: "asc" | "desc" } | null>({ key: "avgChange", direction: "desc" });

  const { sectorMap, totalPages, paginatedSectors } = useMemo(() => {
    const sectors = Object.entries(
      data.reduce((acc: Record<string, any>, stock) => {
        if (!acc[stock.sector]) acc[stock.sector] = { stocks: [] };
        acc[stock.sector].stocks.push(stock);
        return acc;
      }, {})
    ).map(([sector, info]: any) => ({
      sector,
      stocks: info.stocks,
      avgChange:
        info.stocks.reduce((sum: number, s: Stock) => sum + s.change, 0) /
        info.stocks.length,
      marketCap: info.stocks.reduce((sum: number, s: Stock) => sum + (s.marketCap || 0), 0),
      count: info.stocks.length,
    }));

    // Sorting
    if (sortConfig) {
      const { key, direction } = sortConfig;
      sectors.sort((a, b) => {
        let aVal: any = a[key];
        let bVal: any = b[key];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return direction === "asc" ? aVal - bVal : bVal - aVal;
        }

        return direction === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    const filtered = sectors.filter((s: Sector) => {
      const query = search.toLowerCase();

      // Combine top-level sector fields
      const sectorText = [
        s.sector,
        s.count?.toString(),
        s.marketCap?.toString(),
        s.avgChange?.toString(),
      ]
        .join(" ")
        .toLowerCase();

      // Combine all stock fields
      const stockText = s.stocks
        .map((st: Stock) =>
          [
            st.symbol,
            st.sector,
            st.change?.toString(),
            st.volume?.toString(),
            st.price?.toString(),
            st.marketCap?.toString(),
          ].join(" ")
        )
        .join(" ")
        .toLowerCase();

      // Final combined search text
      const searchableText = `${sectorText} ${stockText}`;

      return searchableText.includes(query);
    });


    const totalPages = Math.ceil(filtered.length / sectorsPerPage);
    const start = (currentPage - 1) * sectorsPerPage;
    const end = start + sectorsPerPage;
    const paginatedSectors = filtered.slice(start, end);

    return { sectorMap: sectors, totalPages, paginatedSectors };
  }, [data, currentPage, sectorsPerPage, search, sortConfig]);

  const handleSort = (key: keyof Sector) => {
    if (sortConfig?.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === "asc" ? "desc" : "asc" });
    } else {
      setSortConfig({ key, direction: "desc" });
    }
  };

  return (
    <WindowLayout title="Market Heatmap" icon={BarChart3}>
      <div className="flex items-center justify-start mb-2 gap-2">
        <div className="flex items-center bg-[#10182A] rounded-sm px-2 py-1 w-full border border-gray-700">
          <Search className="w-3 h-3 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search sectors..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent text-gray-200 text-[10px] outline-none w-full placeholder-gray-500"
          />
        </div>
        <div className="flex gap-3 text-[10px] text-gray-400">
          <button onClick={() => handleSort("avgChange")} className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
            Change <ArrowUpDown className="w-3 h-3" />
          </button>
          <button onClick={() => handleSort("marketCap")} className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
            MCap <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="relative w-full overflow-visible">
        {/* Heatmap grid */}
        <div className="grid grid-cols-5 gap-1 overflow-visible">
          {paginatedSectors.map((sectorInfo) => (
            <Tooltip key={sectorInfo.sector}>
              <TooltipTrigger asChild>
                <div
                  className="rounded-sm p-2 cursor-pointer flex flex-col items-center justify-center"
                  style={{ backgroundColor: colorScale(sectorInfo.avgChange) }}
                  onClick={() =>
                    setSelectedSector(
                      selectedSector === sectorInfo.sector ? null : sectorInfo.sector
                    )
                  }
                >
                  <div className="text-white text-[10px] font-semibold uppercase">
                    {sectorInfo.sector.length > 5
                      ? sectorInfo.sector.slice(0, 5)
                      : sectorInfo.sector}
                  </div>
                  <div className="text-[9px] font-bold mt-1">
                    {sectorInfo.avgChange >= 0 ? "+" : ""}
                    {sectorInfo.avgChange.toFixed(2)}%
                  </div>
                </div>
              </TooltipTrigger>

              <TooltipContent
                side="top"
                align="center"
                className="text-[9px] bg-[#0f172a] border border-accent/30 rounded-sm shadow-lg p-2 min-w-[150px] max-w-xs"
              >
                <div className="uppercase font-semibold text-yellow-400 mb-1">
                  {sectorInfo.sector}
                </div>
                <div className="flex justify-between gap-2 border-t border-gray-700 pt-1">
                  <span>Stocks</span>
                  <span>
                    {sectorInfo.stocks
                      .slice(0, 2)
                      .map((s: Stock) => s.symbol)
                      .join(",")}...
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Change</span>
                  <span
                    className={
                      sectorInfo.avgChange >= 0
                        ? "text-green-500 font-bold"
                        : "text-red-500 font-bold"
                    }
                  >
                    {sectorInfo.avgChange >= 0 ? "+" : ""}
                    {sectorInfo.avgChange.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Stocks</span>
                  <span>{sectorInfo.count}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Market Cap</span>
                  <span>{sectorInfo.marketCap?.toFixed(1)}M</span>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center text-[10px] text-gray-300 px-3 py-2 border-t border-gray-800 bg-[#0B1220]/90 mt-2">
          <button
            className="flex items-center gap-1 text-accent disabled:text-gray-600"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            <ChevronLeft className="w-3 h-3" /> Prev
          </button>

          <div className="text-gray-400">
            Page <span className="text-accent">{currentPage}</span> of {totalPages || 1}
          </div>

          <button
            className="flex items-center gap-1 text-accent disabled:text-gray-600"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Sector Details */}
      <WindowLayout className="mt-2" title="Sector Stocks Heatmap" icon={BarChart3} fit={true}>
        {selectedSector ? (
          <div>
            <SectorStockHeatmap
              sector={selectedSector}
              stocks={sectorMap.find((s) => s.sector === selectedSector)?.stocks || []}
            />
          </div>
        ) :
          <div className="flex flex-col gap-1 w-full text-center text-[9px] text-gray-400 border p-1 rounded-sm">
            <span className="text-[10px] font-semibold">
              Sector Stock Heatmap
            </span>
            <span>
              Select a sector to view its stock's heatmap...
            </span>
          </div>
        }
      </WindowLayout>
    </WindowLayout>
  );
};





export default SectorHeatMap;
