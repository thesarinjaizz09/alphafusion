"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Flame, TrendingUp, Building2, BarChart3 } from "lucide-react";
import WindowLayout from "./window-layout";

interface Stock {
  symbol: string;
  name: string;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  exchange: string;
  price: number;
}

interface Exchange {
  code: string;
  name: string;
  country: string;
  flag: string;
  marketCap: number;
  listedCompanies: number;
  topSectors: string[];
}

interface Sector {
  name: string;
  avgChange: number;
  totalVolume: number;
  marketCap: number;
  stockCount: number;
  topStocks: string[];
}

type ViewMode = 'exchanges' | 'sectors' | 'stocks';

const exchanges: Exchange[] = [
  { code: 'NSE', name: 'National Stock Exchange', country: 'India', flag: '🇮🇳', marketCap: 3500000, listedCompanies: 2000, topSectors: ['IT', 'Banking', 'Energy', 'FMCG'] },
  { code: 'BSE', name: 'Bombay Stock Exchange', country: 'India', flag: '🇮🇳', marketCap: 3200000, listedCompanies: 5000, topSectors: ['Banking', 'IT', 'Energy', 'Manufacturing'] },
  { code: 'NYSE', name: 'New York Stock Exchange', country: 'USA', flag: '🇺🇸', marketCap: 25000000, listedCompanies: 2400, topSectors: ['Technology', 'Healthcare', 'Financial', 'Consumer'] },
  { code: 'NASDAQ', name: 'NASDAQ', country: 'USA', flag: '🇺🇸', marketCap: 18000000, listedCompanies: 3300, topSectors: ['Technology', 'Biotech', 'Telecom', 'Media'] },
  { code: 'LSE', name: 'London Stock Exchange', country: 'UK', flag: '🇬🇧', marketCap: 4500000, listedCompanies: 2000, topSectors: ['Financial', 'Energy', 'Mining', 'Consumer'] },
  { code: 'TSE', name: 'Tokyo Stock Exchange', country: 'Japan', flag: '🇯🇵', marketCap: 6000000, listedCompanies: 3700, topSectors: ['Technology', 'Automotive', 'Financial', 'Industrial'] },
  { code: 'HKEX', name: 'Hong Kong Exchange', country: 'Hong Kong', flag: '🇭🇰', marketCap: 4200000, listedCompanies: 2500, topSectors: ['Financial', 'Real Estate', 'Technology', 'Energy'] },
  { code: 'SSE', name: 'Shanghai Stock Exchange', country: 'China', flag: '🇨🇳', marketCap: 7000000, listedCompanies: 1500, topSectors: ['Financial', 'Industrial', 'Technology', 'Energy'] },
];

const defaultStocks: Stock[] = [
  // NSE Stocks
  { symbol: "RELIANCE", name: "Reliance Industries", change: 45.50, changePercent: 2.34, volume: 1800000, marketCap: 15000000, sector: "Energy", exchange: "NSE", price: 2450.50 },
  { symbol: "TCS", name: "Tata Consultancy Services", change: 78.20, changePercent: 1.82, volume: 2100000, marketCap: 12000000, sector: "IT", exchange: "NSE", price: 3850.75 },
  { symbol: "HDFCBANK", name: "HDFC Bank", change: -12.30, changePercent: -0.72, volume: 2900000, marketCap: 8000000, sector: "Banking", exchange: "NSE", price: 1680.25 },
  { symbol: "INFY", name: "Infosys", change: 95.40, changePercent: 2.34, volume: 1800000, marketCap: 7000000, sector: "IT", exchange: "NSE", price: 1850.60 },
  { symbol: "ICICIBANK", name: "ICICI Bank", change: 8.75, changePercent: 0.63, volume: 3500000, marketCap: 6500000, sector: "Banking", exchange: "NSE", price: 1420.80 },
  { symbol: "SBIN", name: "State Bank of India", change: 15.20, changePercent: 1.04, volume: 3900000, marketCap: 5500000, sector: "Banking", exchange: "NSE", price: 1480.90 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", change: 12.80, changePercent: 0.72, volume: 2800000, marketCap: 4500000, sector: "Telecom", exchange: "NSE", price: 1850.40 },
  { symbol: "ITC", name: "ITC Limited", change: 8.90, changePercent: 1.21, volume: 2200000, marketCap: 4000000, sector: "FMCG", exchange: "NSE", price: 485.75 },
  { symbol: "LT", name: "Larsen & Toubro", change: 25.60, changePercent: 2.94, volume: 2700000, marketCap: 3500000, sector: "Infrastructure", exchange: "NSE", price: 2850.30 },
  { symbol: "MARUTI", name: "Maruti Suzuki", change: 6.50, changePercent: 0.82, volume: 1100000, marketCap: 3200000, sector: "Auto", exchange: "NSE", price: 8950.20 },
  { symbol: "ASIANPAINT", name: "Asian Paints", change: -15.40, changePercent: -1.15, volume: 1200000, marketCap: 3000000, sector: "Chemicals", exchange: "NSE", price: 2850.60 },
  { symbol: "SUNPHARMA", name: "Sun Pharma", change: 4.20, changePercent: 0.62, volume: 2400000, marketCap: 2800000, sector: "Pharma", exchange: "NSE", price: 1250.40 },
  { symbol: "TITAN", name: "Titan Company", change: 18.50, changePercent: 1.62, volume: 2100000, marketCap: 2500000, sector: "Jewellery", exchange: "NSE", price: 2850.80 },
  { symbol: "NESTLEIND", name: "Nestle India", change: -8.90, changePercent: -0.84, volume: 1800000, marketCap: 2200000, sector: "FMCG", exchange: "NSE", price: 18500.50 },
  { symbol: "POWERGRID", name: "Power Grid Corp", change: 12.30, changePercent: 1.94, volume: 3100000, marketCap: 2000000, sector: "Power", exchange: "NSE", price: 285.75 },
  
  // NYSE Stocks
  { symbol: "AAPL", name: "Apple Inc", change: 2.45, changePercent: 1.25, volume: 45000000, marketCap: 2800000000, sector: "Technology", exchange: "NYSE", price: 195.80 },
  { symbol: "MSFT", name: "Microsoft Corp", change: 3.20, changePercent: 1.68, volume: 32000000, marketCap: 2600000000, sector: "Technology", exchange: "NYSE", price: 385.40 },
  { symbol: "GOOGL", name: "Alphabet Inc", change: -1.85, changePercent: -0.95, volume: 28000000, marketCap: 1800000000, sector: "Technology", exchange: "NYSE", price: 145.60 },
  { symbol: "AMZN", name: "Amazon.com Inc", change: 4.50, changePercent: 2.85, volume: 35000000, marketCap: 1500000000, sector: "Technology", exchange: "NYSE", price: 185.20 },
  { symbol: "TSLA", name: "Tesla Inc", change: -8.90, changePercent: -3.45, volume: 55000000, marketCap: 800000000, sector: "Automotive", exchange: "NYSE", price: 245.80 },
  { symbol: "JPM", name: "JPMorgan Chase", change: 1.25, changePercent: 0.85, volume: 18000000, marketCap: 450000000, sector: "Financial", exchange: "NYSE", price: 185.40 },
  { symbol: "JNJ", name: "Johnson & Johnson", change: 0.95, changePercent: 0.65, volume: 12000000, marketCap: 420000000, sector: "Healthcare", exchange: "NYSE", price: 165.80 },
  { symbol: "V", name: "Visa Inc", change: 2.15, changePercent: 1.45, volume: 8500000, marketCap: 480000000, sector: "Financial", exchange: "NYSE", price: 285.60 },
  { symbol: "PG", name: "Procter & Gamble", change: -0.75, changePercent: -0.45, volume: 6500000, marketCap: 380000000, sector: "Consumer", exchange: "NYSE", price: 165.40 },
  { symbol: "UNH", name: "UnitedHealth Group", change: 3.80, changePercent: 2.15, volume: 4200000, marketCap: 520000000, sector: "Healthcare", exchange: "NYSE", price: 485.20 },
  
  // NASDAQ Stocks
  { symbol: "NVDA", name: "NVIDIA Corp", change: 12.50, changePercent: 4.85, volume: 65000000, marketCap: 1200000000, sector: "Technology", exchange: "NASDAQ", price: 485.80 },
  { symbol: "META", name: "Meta Platforms", change: -2.85, changePercent: -1.25, volume: 25000000, marketCap: 850000000, sector: "Technology", exchange: "NASDAQ", price: 385.40 },
  { symbol: "NFLX", name: "Netflix Inc", change: 5.20, changePercent: 2.45, volume: 18000000, marketCap: 180000000, sector: "Media", exchange: "NASDAQ", price: 485.60 },
  { symbol: "AMD", name: "Advanced Micro Devices", change: 8.90, changePercent: 3.85, volume: 42000000, marketCap: 250000000, sector: "Technology", exchange: "NASDAQ", price: 285.40 },
  { symbol: "INTC", name: "Intel Corp", change: -1.25, changePercent: -0.65, volume: 28000000, marketCap: 180000000, sector: "Technology", exchange: "NASDAQ", price: 45.80 },
  { symbol: "ADBE", name: "Adobe Inc", change: 3.50, changePercent: 1.85, volume: 8500000, marketCap: 220000000, sector: "Technology", exchange: "NASDAQ", price: 485.20 },
  { symbol: "PYPL", name: "PayPal Holdings", change: -2.15, changePercent: -1.45, volume: 12000000, marketCap: 65000000, sector: "Financial", exchange: "NASDAQ", price: 85.40 },
  { symbol: "CMCSA", name: "Comcast Corp", change: 0.95, changePercent: 0.45, volume: 8500000, marketCap: 180000000, sector: "Media", exchange: "NASDAQ", price: 45.80 },
  { symbol: "PEP", name: "PepsiCo Inc", change: 1.25, changePercent: 0.75, volume: 4200000, marketCap: 250000000, sector: "Consumer", exchange: "NASDAQ", price: 185.60 },
  { symbol: "COST", name: "Costco Wholesale", change: 2.85, changePercent: 1.65, volume: 1800000, marketCap: 320000000, sector: "Retail", exchange: "NASDAQ", price: 685.40 },
];

const MarketHeatMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('exchanges');
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>(defaultStocks);

  // Filter stocks based on selected exchange
  useEffect(() => {
    if (selectedExchange) {
      const filtered = defaultStocks.filter(stock => stock.exchange === selectedExchange.code);
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks(defaultStocks);
    }
  }, [selectedExchange]);

  // Generate sectors from filtered stocks
  const generateSectors = (stocks: Stock[]): Sector[] => {
    const sectorMap = d3.rollups(
      stocks,
      (v) => ({
        avgChange: d3.mean(v, (d) => d.changePercent) ?? 0,
        totalVolume: d3.sum(v, (d) => d.volume),
        marketCap: d3.sum(v, (d) => d.marketCap),
        stockCount: v.length,
        topStocks: v.slice(0, 3).map(d => d.symbol),
      }),
      (d) => d.sector
    );

    return sectorMap.map(([name, data]) => ({
      name,
      avgChange: data.avgChange,
      totalVolume: data.totalVolume,
      marketCap: data.marketCap,
      stockCount: data.stockCount,
      topStocks: data.topStocks,
    }));
  };

  const getColor = (value: number, minValue: number, maxValue: number, isPositive: boolean = true) => {
    const range = Math.max(Math.abs(minValue), Math.abs(maxValue)) || 1;
    const magnitude = Math.min(Math.abs(value), range);
    const intensity = (magnitude / range) * 100;
    
    if (isPositive) {
      // Green gradient for positive values
      const lightness = 70 - (intensity / 100) * 30;
      return `hsl(120, ${60 + intensity * 0.3}%, ${lightness}%)`;
    } else {
      // Red gradient for negative values
      const lightness = 70 - (intensity / 100) * 30;
      return `hsl(0, ${60 + intensity * 0.3}%, ${lightness}%)`;
    }
  };

  const renderExchanges = () => {
    if (!svgRef.current) return;
    const parent = svgRef.current.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = 300;
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const cols = 4;
    const rows = Math.ceil(exchanges.length / cols);
    const cellPadding = 8;
    const cellWidth = (width - cellPadding * (cols + 1)) / cols;
    const cellHeight = (height - cellPadding * (rows + 1)) / rows;

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(10, 15, 28, 0.95)")
      .style("color", "#E5E7EB")
      .style("padding", "12px 16px")
      .style("border", "1px solid #E3B341")
      .style("border-radius", "8px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("font-size", "12px")
      .style("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.3)")
      .style("z-index", "1000");

    const groups = svg
      .selectAll("g.exchange-cell")
      .data(exchanges)
      .join("g")
      .attr("class", "exchange-cell")
      .style("cursor", "pointer");

    groups.each(function (exchange, i) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = cellPadding + col * (cellWidth + cellPadding);
      const y = cellPadding + row * (cellHeight + cellPadding);

      const g = d3.select(this);
      g.attr("transform", `translate(${x},${y})`);

      // Calculate market cap change (mock data)
      const marketCapChange = (Math.random() - 0.5) * 4;
      const minChange = -2;
      const maxChange = 2;

      const rect = g
        .selectAll("rect")
        .data([exchange])
        .join("rect")
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("rx", 8)
        .style("cursor", "pointer")
        .style("stroke", selectedExchange?.code === exchange.code ? "#E3B341" : "none")
        .style("stroke-width", selectedExchange?.code === exchange.code ? "2px" : "0px");

      rect
        .transition()
        .duration(800)
        .attr("fill", getColor(marketCapChange, minChange, maxChange, marketCapChange >= 0));

      rect
        .on("mouseover", (event, d) => {
          tooltip
            .html(`
              <div style="font-weight: bold; margin-bottom: 8px; color: #E3B341;">
                ${d.flag} ${d.name}
              </div>
              <div><strong>Code:</strong> ${d.code}</div>
              <div><strong>Country:</strong> ${d.country}</div>
              <div><strong>Market Cap:</strong> $${(d.marketCap / 1000000).toFixed(0)}M</div>
              <div><strong>Listed Companies:</strong> ${d.listedCompanies.toLocaleString()}</div>
              <div><strong>Top Sectors:</strong> ${d.topSectors.join(", ")}</div>
              <div style="margin-top: 8px; color: ${marketCapChange >= 0 ? '#10B981' : '#EF4444'};">
                <strong>Change:</strong> ${marketCapChange.toFixed(2)}%
              </div>
            `)
            .style("opacity", 1)
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY + 15 + "px");
        })
        .on("mousemove", (event) => {
          tooltip.style("left", event.pageX + 15 + "px").style("top", event.pageY + 15 + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0))
        .on("click", () => {
          setSelectedExchange(exchange);
          setViewMode('sectors');
          setSelectedSector(null);
        });

      // Exchange name
      g.append("text")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 - 8)
        .attr("text-anchor", "middle")
        .attr("fill", "#FFFFFF")
        .attr("font-size", Math.min(12, cellWidth / 8))
        .attr("font-weight", "bold")
        .style("pointer-events", "none")
        .text(d => d.code);

      // Country flag
      g.append("text")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 + 8)
        .attr("text-anchor", "middle")
        .attr("fill", "#E3B341")
        .attr("font-size", Math.min(10, cellWidth / 10))
        .style("pointer-events", "none")
        .text(d => d.flag);

      // Change percentage
      g.append("text")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 + 20)
        .attr("text-anchor", "middle")
        .attr("fill", marketCapChange >= 0 ? "#10B981" : "#EF4444")
        .attr("font-size", Math.min(9, cellWidth / 12))
        .attr("font-weight", "bold")
        .style("pointer-events", "none")
        .text(`${marketCapChange.toFixed(1)}%`);
    });

    return () => tooltip.remove();
  };

  const renderSectors = () => {
    if (!svgRef.current) return;
    const parent = svgRef.current.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = 300;
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const sectors = generateSectors(filteredStocks);
    const cols = 5;
    const rows = Math.ceil(sectors.length / cols);
    const cellPadding = 6;
    const cellWidth = (width - cellPadding * (cols + 1)) / cols;
    const cellHeight = (height - cellPadding * (rows + 1)) / rows;

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(10, 15, 28, 0.95)")
      .style("color", "#E5E7EB")
      .style("padding", "12px 16px")
      .style("border", "1px solid #E3B341")
      .style("border-radius", "8px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("font-size", "12px")
      .style("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.3)")
      .style("z-index", "1000");

    const groups = svg
      .selectAll("g.sector-cell")
      .data(sectors)
      .join("g")
      .attr("class", "sector-cell")
      .style("cursor", "pointer");

    groups.each(function (sector, i) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = cellPadding + col * (cellWidth + cellPadding);
      const y = cellPadding + row * (cellHeight + cellPadding);

      const g = d3.select(this);
      g.attr("transform", `translate(${x},${y})`);

      const minChange = d3.min(sectors, d => d.avgChange) ?? -5;
      const maxChange = d3.max(sectors, d => d.avgChange) ?? 5;

      const rect = g
        .selectAll("rect")
        .data([sector])
        .join("rect")
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("rx", 6)
        .style("cursor", "pointer")
        .style("stroke", selectedSector?.name === sector.name ? "#E3B341" : "none")
        .style("stroke-width", selectedSector?.name === sector.name ? "2px" : "0px");

      rect
        .transition()
        .duration(800)
        .attr("fill", getColor(sector.avgChange, minChange, maxChange, sector.avgChange >= 0));

      rect
        .on("mouseover", (event, d) => {
          tooltip
            .html(`
              <div style="font-weight: bold; margin-bottom: 8px; color: #E3B341;">
                ${d.name} Sector
              </div>
              <div><strong>Avg Change:</strong> ${d.avgChange.toFixed(2)}%</div>
              <div><strong>Total Volume:</strong> ${(d.totalVolume / 1000000).toFixed(1)}M</div>
              <div><strong>Market Cap:</strong> $${(d.marketCap / 1000000).toFixed(0)}M</div>
              <div><strong>Stock Count:</strong> ${d.stockCount}</div>
              <div><strong>Top Stocks:</strong> ${d.topStocks.join(", ")}</div>
            `)
            .style("opacity", 1)
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY + 15 + "px");
        })
        .on("mousemove", (event) => {
          tooltip.style("left", event.pageX + 15 + "px").style("top", event.pageY + 15 + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0))
        .on("click", () => {
          setSelectedSector(sector);
          setViewMode('stocks');
        });

      // Sector name
      g.append("text")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 - 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#FFFFFF")
        .attr("font-size", Math.min(10, cellWidth / 10))
        .attr("font-weight", "bold")
        .style("pointer-events", "none")
        .text(d => d.name.substring(0, 8));

      // Change percentage
      g.append("text")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 + 10)
        .attr("text-anchor", "middle")
        .attr("fill", d.avgChange >= 0 ? "#10B981" : "#EF4444")
        .attr("font-size", Math.min(8, cellWidth / 12))
        .attr("font-weight", "bold")
        .style("pointer-events", "none")
        .text(`${d.avgChange.toFixed(1)}%`);
    });

    return () => tooltip.remove();
  };

  const renderStocks = () => {
    if (!svgRef.current) return;
    const parent = svgRef.current.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = 300;
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    let stocksToShow = filteredStocks;
    if (selectedSector) {
      stocksToShow = filteredStocks.filter(stock => stock.sector === selectedSector.name);
    }

    const cols = 6;
    const rows = Math.ceil(stocksToShow.length / cols);
    const cellPadding = 4;
    const cellWidth = (width - cellPadding * (cols + 1)) / cols;
    const cellHeight = (height - cellPadding * (rows + 1)) / rows;

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(10, 15, 28, 0.95)")
      .style("color", "#E5E7EB")
      .style("padding", "12px 16px")
      .style("border", "1px solid #E3B341")
      .style("border-radius", "8px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("font-size", "12px")
      .style("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.3)")
      .style("z-index", "1000");

    const groups = svg
      .selectAll("g.stock-cell")
      .data(stocksToShow)
      .join("g")
      .attr("class", "stock-cell")
      .style("cursor", "pointer");

    groups.each(function (stock, i) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = cellPadding + col * (cellWidth + cellPadding);
      const y = cellPadding + row * (cellHeight + cellPadding);

      const g = d3.select(this);
      g.attr("transform", `translate(${x},${y})`);

      const minChange = d3.min(stocksToShow, d => d.changePercent) ?? -5;
      const maxChange = d3.max(stocksToShow, d => d.changePercent) ?? 5;

      const rect = g
        .selectAll("rect")
        .data([stock])
        .join("rect")
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("rx", 4)
        .style("cursor", "pointer");

      rect
        .transition()
        .duration(800)
        .attr("fill", getColor(stock.changePercent, minChange, maxChange, stock.changePercent >= 0));

      rect
        .on("mouseover", (event, d) => {
          tooltip
            .html(`
              <div style="font-weight: bold; margin-bottom: 8px; color: #E3B341;">
                ${d.symbol}
              </div>
              <div><strong>Name:</strong> ${d.name}</div>
              <div><strong>Price:</strong> $${d.price.toFixed(2)}</div>
              <div><strong>Change:</strong> $${d.change.toFixed(2)} (${d.changePercent.toFixed(2)}%)</div>
              <div><strong>Volume:</strong> ${(d.volume / 1000000).toFixed(1)}M</div>
              <div><strong>Market Cap:</strong> $${(d.marketCap / 1000000).toFixed(0)}M</div>
              <div><strong>Sector:</strong> ${d.sector}</div>
              <div><strong>Exchange:</strong> ${d.exchange}</div>
            `)
            .style("opacity", 1)
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY + 15 + "px");
        })
        .on("mousemove", (event) => {
          tooltip.style("left", event.pageX + 15 + "px").style("top", event.pageY + 15 + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0));

      // Stock symbol
      g.append("text")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 - 3)
        .attr("text-anchor", "middle")
        .attr("fill", "#FFFFFF")
        .attr("font-size", Math.min(8, cellWidth / 12))
        .attr("font-weight", "bold")
        .style("pointer-events", "none")
        .text(d => d.symbol.substring(0, 6));

      // Change percentage
      g.append("text")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 + 8)
        .attr("text-anchor", "middle")
        .attr("fill", d.changePercent >= 0 ? "#10B981" : "#EF4444")
        .attr("font-size", Math.min(7, cellWidth / 14))
        .attr("font-weight", "bold")
        .style("pointer-events", "none")
        .text(`${d.changePercent.toFixed(1)}%`);
    });

    return () => tooltip.remove();
  };

  useEffect(() => {
    switch (viewMode) {
      case 'exchanges':
        renderExchanges();
        break;
      case 'sectors':
        renderSectors();
        break;
      case 'stocks':
        renderStocks();
        break;
    }
  }, [viewMode, selectedExchange, selectedSector, filteredStocks]);

  const getTitle = () => {
    if (viewMode === 'exchanges') return 'Market Heatmap - Exchanges';
    if (viewMode === 'sectors') return `Sector Heatmap - ${selectedExchange?.name || 'All Exchanges'}`;
    return `Stock Heatmap - ${selectedSector?.name || 'All Sectors'}`;
  };

  const getIcon = () => {
    switch (viewMode) {
      case 'exchanges': return Building2;
      case 'sectors': return BarChart3;
      case 'stocks': return TrendingUp;
      default: return Flame;
    }
  };

  return (
    <WindowLayout title={getTitle()} icon={getIcon()} height="350px">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setViewMode('exchanges');
            setSelectedExchange(null);
            setSelectedSector(null);
          }}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
            viewMode === 'exchanges'
              ? 'bg-accent text-black'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <Building2 className="w-3 h-3 inline mr-1" />
          Exchanges
        </button>
        
        {selectedExchange && (
          <button
            onClick={() => {
              setViewMode('sectors');
              setSelectedSector(null);
            }}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === 'sectors'
                ? 'bg-accent text-black'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <BarChart3 className="w-3 h-3 inline mr-1" />
            Sectors
          </button>
        )}
        
        {selectedSector && (
          <button
            onClick={() => setViewMode('stocks')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === 'stocks'
                ? 'bg-accent text-black'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <TrendingUp className="w-3 h-3 inline mr-1" />
            Stocks
          </button>
        )}
      </div>

      <div className="w-full overflow-auto max-h-[300px] flex items-center justify-center">
        <svg ref={svgRef} className="w-full"></svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: 'hsl(0, 60%, 40%)' }}></div>
            <span>Negative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: 'hsl(120, 60%, 40%)' }}></div>
            <span>Positive</span>
          </div>
        </div>
        <div className="text-gray-500">
          Click cells to drill down • Hover for details
        </div>
      </div>
    </WindowLayout>
  );
};

export default MarketHeatMap;
