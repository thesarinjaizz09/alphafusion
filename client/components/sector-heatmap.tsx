"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { Flame, TrendingUp, TrendingDown, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import WindowLayout from "./window-layout";

interface Stock {
  symbol: string;
  change: number;
  volume: number;
  sector: string;
  price?: number;
  marketCap?: number;
}

interface MarketHeatMapProps {
  data?: Stock[];
  sectorsPerPage?: number;
}

const defaultData: Stock[] = [
  // 🟩 IT / Tech
  { symbol: "INFY", change: 2.34, volume: 1.8, sector: "IT", price: 1850.50, marketCap: 7.8 },
  { symbol: "TCS", change: 1.82, volume: 2.1, sector: "IT", price: 3850.25, marketCap: 14.2 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT", price: 1250.75, marketCap: 3.1 },
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
const SectorStockHeatmap: React.FC<{ sector: string; stocks: Stock[] }> = ({ sector, stocks }) => {
  const stockSvgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!stockSvgRef.current || stocks.length === 0) return;
    const parent = stockSvgRef.current.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = Math.min(200, Math.max(100, stocks.length * 25 + 40));

    const svg = d3.select(stockSvgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    // Color scale for individual stocks
    const colorScale = d3.scaleLinear<string>()
      .domain([-5, -2.5, 0, 2.5, 5])
      .range([
        "#dc2626", // Deep red for strong negative
        "#f87171", // Light red for moderate negative
        "#1f2937", // Dark gray for neutral
        "#34d399", // Light green for moderate positive
        "#059669"  // Deep green for strong positive
      ]);

    const cellHeight = 20;
    const cellPadding = 2;
    const cellWidth = (width - cellPadding * 2) / 2; // Two columns

    // Create tooltip for individual stocks
    const stockTooltip = d3
      .select(parent)
      .append("div")
      .attr("class", "stock-tooltip")
      .style("position", "absolute")
      .style("background", "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)")
      .style("color", "#f8fafc")
      .style("padding", "8px")
      .style("border", "1px solid #334155")
      .style("border-radius", "8px")
      .style("box-shadow", "0 10px 15px -3px rgba(0, 0, 0, 0.3)")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("font-size", "9px")
      .style("font-family", "Inter, system-ui, sans-serif")
      .style("z-index", "1000");

    stocks.forEach((stock, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = cellPadding + col * (cellWidth + cellPadding);
      const y = cellPadding + row * (cellHeight + cellPadding);

      const g = svg.append("g").attr("transform", `translate(${x},${y})`);

      // Stock cell
      const rect = g.append("rect")
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("rx", 4)
        .attr("ry", 4)
        .style("fill", colorScale(stock.change))
        .style("stroke", "#374151")
        .style("stroke-width", "1px")
        .style("cursor", "pointer");

      // Stock symbol
      g.append("text")
        .attr("x", 8)
        .attr("y", cellHeight / 2 + 3)
        .attr("fill", "#f8fafc")
        .attr("font-size", "9px")
        .attr("font-weight", "600")
        .attr("font-family", "Inter, system-ui, sans-serif")
        .text(stock.symbol);

      // Change percentage
      g.append("text")
        .attr("x", cellWidth - 8)
        .attr("y", cellHeight / 2 + 3)
        .attr("text-anchor", "end")
        .attr("fill", stock.change >= 0 ? "#10b981" : "#ef4444")
        .attr("font-size", "8px")
        .attr("font-weight", "700")
        .attr("font-family", "Inter, system-ui, sans-serif")
        .text(`${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%`);

      // Add tooltip functionality
      rect
        .on("mouseover", (event) => {
          stockTooltip
            .html(`
              <div style="margin-bottom: 8px;">
                <div style="font-size: 10px; font-weight: 600; color: #fbbf24; margin-bottom: 4px;">
                  ${stock.symbol}
                </div>
                <div style="font-size: 9px; color: #94a3b8;">
                  ${sector} Sector
                </div>
              </div>
              
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <div>
                  <div style="font-size: 9px; color: #94a3b8; margin-bottom: 2px;">Change</div>
                  <div style="font-size: 9px; font-weight: 700; color: ${stock.change >= 0 ? '#10b981' : '#ef4444'};">
                    ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div style="font-size: 9px; color: #94a3b8; margin-bottom: 2px;">Price</div>
                  <div style="font-size: 9px; font-weight: 600; color: #f8fafc;">
                    ₹${stock.price?.toFixed(2) || 'N/A'}
                  </div>
                </div>
              </div>
              
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <div style="font-size: 9px; color: #94a3b8; margin-bottom: 2px;">Volume</div>
                  <div style="font-size: 9px; font-weight: 600; color: #f8fafc;">
                    ${stock.volume.toFixed(1)}M
                  </div>
                </div>
                <div>
                  <div style="font-size: 9px; color: #94a3b8; margin-bottom: 2px;">Market Cap</div>
                  <div style="font-size: 9px; font-weight: 600; color: #f8fafc;">
                    ₹${stock.marketCap?.toFixed(1) || 'N/A'}T
                  </div>
                </div>
              </div>
            `)
            .style("opacity", 1);

          // Position tooltip
          const tooltipWidth = 200;
          const tooltipHeight = 120;
          const containerRect = parent.getBoundingClientRect();
          const mouseX = event.clientX;
          const mouseY = event.clientY;

          const relativeX = mouseX - containerRect.left;
          const relativeY = mouseY - containerRect.top;

          let tooltipX = relativeX + 15;
          let tooltipY = relativeY - 10;

          // Keep tooltip within bounds
          if (tooltipX + tooltipWidth > parent.clientWidth) {
            tooltipX = relativeX - tooltipWidth - 15;
          }
          if (tooltipY + tooltipHeight > parent.clientHeight) {
            tooltipY = relativeY - tooltipHeight - 10;
          }
          if (tooltipY < 0) {
            tooltipY = 10;
          }
          if (tooltipX < 0) {
            tooltipX = 10;
          }

          stockTooltip
            .style("left", tooltipX + "px")
            .style("top", tooltipY + "px");
        })
        .on("mouseout", () => {
          stockTooltip.style("opacity", 0);
        });
    });

    // Cleanup function
    return () => {
      stockTooltip.remove();
    };
  }, [stocks, sector]);

  if (stocks.length === 0) {
    return (
      <div className="text-[8px] text-gray-400 text-center py-4">
        No stocks available for {sector} sector
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-[9px] text-gray-400 mb-2">
        {stocks.length} stocks in {sector} sector
      </div>
      <div className="w-full overflow-auto">
        <svg ref={stockSvgRef} className="w-full"></svg>
      </div>
    </div>
  );
};

const SectorHeatMap: React.FC<MarketHeatMapProps> = ({ data = defaultData, sectorsPerPage = 20 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [layoutConfig, setLayoutConfig] = useState({ cols: 5, rows: 4, itemsPerPage: 20 });

  // Process sectors with dynamic pagination
  const { sectorMap, totalPages, paginatedSectors } = useMemo(() => {
    const processedSectorMap = d3
      .rollups(
        data,
        (v) => ({
          avgChange: d3.mean(v, (d) => d.change) ?? 0,
          totalVol: d3.sum(v, (d) => d.volume),
          stocks: v,
          marketCap: d3.sum(v, (d) => d.marketCap ?? 0),
          count: v.length,
          topGainer: v.reduce((max, stock) => stock.change > max.change ? stock : max, v[0]),
          topLoser: v.reduce((min, stock) => stock.change < min.change ? stock : min, v[0])
        }),
        (d) => d.sector
      )
      .sort((a, b) => Math.abs(b[1].avgChange) - Math.abs(a[1].avgChange));

    const totalPages = Math.ceil(processedSectorMap.length / layoutConfig.itemsPerPage);
    const startIndex = (currentPage - 1) * layoutConfig.itemsPerPage;
    const endIndex = startIndex + layoutConfig.itemsPerPage;
    const paginatedSectors = processedSectorMap.slice(startIndex, endIndex);

    return {
      sectorMap: processedSectorMap,
      totalPages,
      paginatedSectors
    };
  }, [data, currentPage, layoutConfig.itemsPerPage]);

  useEffect(() => {
    if (!svgRef.current) return;
    const parent = svgRef.current.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = 400;

    // Add resize observer to handle window layout changes
    const resizeObserver = new ResizeObserver(() => {
      // Trigger re-render when container size changes
      if (svgRef.current) {
        const newWidth = parent.clientWidth;
        if (Math.abs(newWidth - width) > 10) { // Only re-render if significant change
          // Force re-render by updating a dummy state or calling the effect again
          setTimeout(() => {
            if (svgRef.current) {
              const svg = d3.select(svgRef.current);
              svg.selectAll("*").remove();
              // Re-trigger the effect by updating layout config
              setLayoutConfig(prev => ({ ...prev }));
            }
          }, 100);
        }
      }
    });

    resizeObserver.observe(parent);

    // Calculate dynamic layout
    const maxRows = 5;
    const minCellWidth = 70;
    const minCellHeight = 50;
    const cellPadding = 3;
    const legendSpace = 10; // Minimal space since all legends are removed

    // Calculate optimal columns based on available width
    const availableWidth = width - cellPadding * 2;
    const cols = Math.max(2, Math.floor(availableWidth / (minCellWidth + cellPadding)));

    // Calculate items per page based on max rows
    const itemsPerPage = maxRows * cols;

    // Update layout config if it changed
    const newLayoutConfig = { cols, rows: maxRows, itemsPerPage };
    if (JSON.stringify(newLayoutConfig) !== JSON.stringify(layoutConfig)) {
      setLayoutConfig(newLayoutConfig);
    }

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    // Professional color scheme with gradients
    const colorScale = d3.scaleLinear<string>()
      .domain([-5, -2.5, 0, 2.5, 5])
      .range([
        "#dc2626", // Deep red for strong negative
        "#f87171", // Light red for moderate negative
        "#1f2937", // Dark gray for neutral
        "#34d399", // Light green for moderate positive
        "#059669"  // Deep green for strong positive
      ]);

    // Use paginated sectors with dynamic layout
    const sectorCount = paginatedSectors.length;
    const actualRows = Math.min(maxRows, Math.ceil(sectorCount / cols));

    // Calculate cell dimensions with constraints
    const cellWidth = Math.max(minCellWidth, (availableWidth - cellPadding * (cols - 1)) / cols);
    const availableHeight = height - legendSpace;
    const cellHeight = Math.max(minCellHeight, (availableHeight - cellPadding * (actualRows - 1)) / actualRows);

    // Create gradient definitions
    const defs = svg.append("defs");

    // Create gradients for each color
    const gradients = [
      { id: "gradient-red", colors: ["#dc2626", "#f87171"] },
      { id: "gradient-green", colors: ["#34d399", "#059669"] },
      { id: "gradient-neutral", colors: ["#374151", "#1f2937"] }
    ];

    gradients.forEach(grad => {
      const gradient = defs.append("linearGradient")
        .attr("id", grad.id)
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "100%").attr("y2", "100%");

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", grad.colors[0]);

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", grad.colors[1]);
    });

    // Enhanced tooltip - create within the component container
    const tooltip = d3
      .select(parent)
      .append("div")
      .attr("class", "market-heatmap-tooltip")
      .style("position", "absolute")
      .style("background", "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)")
      .style("color", "#f8fafc")
      .style("padding", "8px")
      .style("border", "1px solid #334155")
      .style("border-radius", "12px")
      .style("box-shadow", "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("font-size", "9px")
      .style("font-family", "Inter, system-ui, sans-serif")
      .style("min-width", "280px")
      .style("z-index", "1000")
      .style("backdrop-filter", "blur(8px)");

    const groups = svg
      .selectAll("g.cell")
      .data(paginatedSectors, (d: any) => d[0])
      .join(
        (enter) => enter.append("g").attr("class", "cell"),
        (update) => update,
        (exit) => exit.remove()
      );

    groups.each(function ([sector, info], i) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = cellPadding + col * (cellWidth + cellPadding);
      const y = cellPadding + row * (cellHeight + cellPadding);

      const g = d3.select(this);
      g.attr("transform", `translate(${x},${y})`);

      // Determine gradient based on change
      let gradientId = "gradient-neutral";
      if (info.avgChange > 0.5) gradientId = "gradient-green";
      else if (info.avgChange < -0.5) gradientId = "gradient-red";

      const rect = g
        .selectAll("rect")
        .data([info])
        .join("rect")
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("rx", 8)
        .attr("ry", 8)
        .style("cursor", "pointer")
        .style("fill", `url(#${gradientId})`)
        .style("stroke", "#374151")
        .style("stroke-width", "1px")
        .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");

      // Add hover effects
      rect
        .on("mouseover", (event, d) => {
          setHoveredSector(sector);

          // Enhanced tooltip content
          const topStocks = d.stocks
            .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
            .slice(0, 3);

          tooltip
            .html(`
              <div style="margin-bottom: 12px;">
                <div style="font-size: 10px; font-weight: 600; color: #fbbf24; margin-bottom: 4px;">
                  ${sector} Sector
                </div>
                <div style="font-size: 9px; color: #94a3b8;">
                  ${d.count} stocks • Market Cap: ₹${d.marketCap.toFixed(1)}T
                </div>
              </div>
              
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <div>
                  <div style="font-size: 9px; color: #94a3b8; margin-bottom: 2px;">Avg Change</div>
                  <div style="font-size: 9px; font-weight: 700; color: ${d.avgChange >= 0 ? '#10b981' : '#ef4444'};">
                    ${d.avgChange >= 0 ? '+' : ''}${d.avgChange.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div style="font-size: 9px; color: #94a3b8; margin-bottom: 2px;">Total Volume</div>
                  <div style="font-size: 9px; font-weight: 600; color: #f8fafc;">
                    ${d.totalVol.toFixed(1)}M
                  </div>
                </div>
              </div>
              
              <div style="border-top: 1px solid #334155; padding-top: 12px;">
                <div style="font-size: 9px; color: #94a3b8; margin-bottom: 8px;">Top Movers</div>
                ${topStocks.map(stock => `
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 9px;">
                    <span style="color: #f8fafc;">${stock.symbol}</span>
                    <span style="color: ${stock.change >= 0 ? '#10b981' : '#ef4444'}; font-weight: 600;">
                      ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
                    </span>
                  </div>
                `).join('')}
              </div>
            `)
            .style("opacity", 1);

          // Smart positioning to keep tooltip within container bounds
          const tooltipWidth = 300; // Approximate tooltip width
          const tooltipHeight = 200; // Approximate tooltip height
          const containerRect = parent.getBoundingClientRect();
          const mouseX = event.clientX;
          const mouseY = event.clientY;

          // Convert to relative coordinates within the container
          const relativeX = mouseX - containerRect.left;
          const relativeY = mouseY - containerRect.top;

          let tooltipX = relativeX + 15;
          let tooltipY = relativeY - 10;

          // Check if tooltip would go off the right edge
          if (tooltipX + tooltipWidth > parent.clientWidth) {
            tooltipX = relativeX - tooltipWidth - 15; // Position to the left of cursor
          }

          // Check if tooltip would go off the bottom edge
          if (tooltipY + tooltipHeight > parent.clientHeight) {
            tooltipY = relativeY - tooltipHeight - 10; // Position above cursor
          }

          // Check if tooltip would go off the top edge
          if (tooltipY < 0) {
            tooltipY = 10; // Position at top of container
          }

          // Check if tooltip would go off the left edge
          if (tooltipX < 0) {
            tooltipX = 10; // Position at left of container
          }

          tooltip
            .style("left", tooltipX + "px")
            .style("top", tooltipY + "px");

          // Add glow effect
          rect.style("filter", "drop-shadow(0 4px 12px rgba(0,0,0,0.2)) brightness(1.1)");
        })
        .on("mousemove", (event) => {
          // Smart positioning for mousemove as well
          const tooltipWidth = 300;
          const tooltipHeight = 200;
          const containerRect = parent.getBoundingClientRect();
          const mouseX = event.clientX;
          const mouseY = event.clientY;

          // Convert to relative coordinates within the container
          const relativeX = mouseX - containerRect.left;
          const relativeY = mouseY - containerRect.top;

          let tooltipX = relativeX + 15;
          let tooltipY = relativeY - 10;

          // Check if tooltip would go off the right edge
          if (tooltipX + tooltipWidth > parent.clientWidth) {
            tooltipX = relativeX - tooltipWidth - 15;
          }

          // Check if tooltip would go off the bottom edge
          if (tooltipY + tooltipHeight > parent.clientHeight) {
            tooltipY = relativeY - tooltipHeight - 10;
          }

          // Check if tooltip would go off the top edge
          if (tooltipY < 0) {
            tooltipY = 10;
          }

          // Check if tooltip would go off the left edge
          if (tooltipX < 0) {
            tooltipX = 10;
          }

          tooltip
            .style("left", tooltipX + "px")
            .style("top", tooltipY + "px");
        })
        .on("mouseout", () => {
          setHoveredSector(null);
          tooltip.style("opacity", 0);
          rect.style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");
        })
        .on("click", () => {
          setSelectedSector(selectedSector === sector ? null : sector);
        });

      // Sector title with better typography
      const title = g
        .selectAll("text.title")
        .data([sector])
        .join("text")
        .attr("class", "title")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 - 6)
        .attr("text-anchor", "middle")
        .attr("fill", "#f8fafc")
        .attr("font-size", Math.min(Math.max(9, cellWidth / 15), 11))
        .attr("font-weight", "600")
        .attr("font-family", "Inter, system-ui, sans-serif")
        .style("pointer-events", "none")
        .text(sector.length > 10 ? sector.substring(0, 10) + "..." : sector);

      // Change percentage with color coding
      const value = g
        .selectAll("text.value")
        .data([info])
        .join("text")
        .attr("class", "value")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 + 6)
        .attr("text-anchor", "middle")
        .attr("fill", 'black')
        .attr("font-size", Math.max(8, cellWidth / 12))
        .attr("font-weight", "700")
        .attr("font-family", "Inter, system-ui, sans-serif")
        .style("pointer-events", "none")
        .text(`${info.avgChange >= 0 ? '+' : ''}${info.avgChange.toFixed(1)}%`);

      // Add trend indicator
      const trendIcon = g
        .selectAll("text.trend")
        .data([info])
        .join("text")
        .attr("class", "trend")
        .attr("x", cellWidth - 6)
        .attr("y", 12)
        .attr("text-anchor", "end")
        .attr("fill", info.avgChange >= 0 ? "#10b981" : "#ef4444")
        .attr("font-size", "10px")
        .style("pointer-events", "none")
        .text(info.avgChange >= 0 ? "↗" : "↘");
    });

    // Legend removed - no longer needed

    return () => {
      tooltip.remove();
      resizeObserver.disconnect();
    };
  }, [data, selectedSector, hoveredSector, paginatedSectors, currentPage, layoutConfig]);

  return (
    <WindowLayout title="Market Heatmap" icon={BarChart3} height="500px">
      <div className="w-full">

        {/* Heatmap visualization */}
        <div className="w-full overflow-auto max-h-[400px] flex items-center justify-center relative">
          <svg ref={svgRef} className="w-full"></svg>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center text-[9px] text-gray-300 px-3 py-2 border-t border-gray-800 bg-[#0B1220]/90 mt-2 mb-4">
            <button
              className="flex items-center gap-1 text-accent disabled:text-gray-600"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              <ChevronLeft className="w-3 h-3" /> Prev
            </button>

            <div className="text-gray-400">
              Page <span className="text-accent">{currentPage}</span> of {totalPages}
            </div>

            <button
              className="flex items-center gap-1 text-accent disabled:text-gray-600"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Selected sector details with stock heatmap */}
        {selectedSector && (
          <WindowLayout title={`${selectedSector} Sector Analysis`} icon={BarChart3}>
            <SectorStockHeatmap
              sector={selectedSector}
              stocks={sectorMap.find(([sector]) => sector === selectedSector)?.[1]?.stocks || []}
            />
          </WindowLayout>
        )}
      </div>
    </WindowLayout>
  );
};

export default SectorHeatMap;
