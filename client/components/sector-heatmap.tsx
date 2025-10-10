"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Flame } from "lucide-react";
import WindowLayout from "./window-layout";

interface Stock {
  symbol: string;
  change: number;
  volume: number;
  sector: string;
}

interface MarketHeatMapProps {
  data?: Stock[];
}

const defaultData: Stock[] = [
  // 🟩 IT / Tech
  { symbol: "INFY", change: 2.34, volume: 1.8, sector: "IT" },
  { symbol: "TCS", change: 1.82, volume: 2.1, sector: "IT" },
  { symbol: "TECHM", change: -0.94, volume: 1.4, sector: "IT" },

  // 🏦 Banking
  { symbol: "HDFCBANK", change: -0.72, volume: 2.9, sector: "Banking" },
  { symbol: "ICICIBANK", change: 0.63, volume: 3.5, sector: "Banking" },
  { symbol: "SBIN", change: 1.04, volume: 3.9, sector: "Banking" },

  // ⚡ Energy
  { symbol: "ONGC", change: -2.35, volume: 3.4, sector: "Energy" },
  { symbol: "ADANIPOWER", change: 3.12, volume: 2.8, sector: "Energy" },
  { symbol: "COALINDIA", change: -1.68, volume: 2.3, sector: "Energy" },

  // 🏭 Manufacturing
  { symbol: "TATAMOTORS", change: 1.96, volume: 4.3, sector: "Manufacturing" },
  { symbol: "ASHOKLEY", change: -0.45, volume: 1.7, sector: "Manufacturing" },

  // 🚘 Auto
  { symbol: "MARUTI", change: 0.82, volume: 1.1, sector: "Auto" },
  { symbol: "BAJAJ-AUTO", change: -1.15, volume: 1.2, sector: "Auto" },

  // 🧴 FMCG
  { symbol: "ITC", change: 1.21, volume: 2.2, sector: "FMCG" },
  { symbol: "HINDUNILVR", change: -0.84, volume: 1.8, sector: "FMCG" },

  // 🏗️ Infrastructure
  { symbol: "LNT", change: 2.94, volume: 2.7, sector: "Infrastructure" },
  { symbol: "DLF", change: -1.26, volume: 1.9, sector: "Infrastructure" },

  // 🧪 Pharma
  { symbol: "SUNPHARMA", change: 0.62, volume: 2.4, sector: "Pharma" },
  { symbol: "CIPLA", change: -2.48, volume: 1.5, sector: "Pharma" },

  // 💰 Finance / NBFC
  { symbol: "BAJFINANCE", change: 2.37, volume: 3.2, sector: "Finance" },
  { symbol: "HDFCLIFE", change: -1.63, volume: 1.7, sector: "Finance" },

  // 🛒 Retail
  { symbol: "DMART", change: 1.15, volume: 2.0, sector: "Retail" },
  { symbol: "TRENT", change: -0.96, volume: 1.4, sector: "Retail" },

  // ✈️ Aviation
  { symbol: "INDIGO", change: 3.45, volume: 2.9, sector: "Aviation" },
  { symbol: "SPICEJET", change: -1.83, volume: 1.2, sector: "Aviation" },

  // 🏠 Real Estate
  { symbol: "GODREJPROP", change: -2.72, volume: 1.6, sector: "Real Estate" },
  { symbol: "OBEROIRLTY", change: 1.93, volume: 1.5, sector: "Real Estate" },

  // 📶 Telecom
  { symbol: "AIRTEL", change: 0.72, volume: 2.8, sector: "Telecom" },
  { symbol: "VODAFONEIDEA", change: -1.24, volume: 3.1, sector: "Telecom" },

  // 🧠 Education
  { symbol: "NIIT", change: 2.85, volume: 1.2, sector: "Education" },
  { symbol: "CAREERPOINT", change: -0.56, volume: 0.8, sector: "Education" },

  // 🔬 Chemicals
  { symbol: "TATACHEM", change: 1.42, volume: 2.0, sector: "Chemicals" },
  { symbol: "GUJALKALI", change: -1.98, volume: 1.4, sector: "Chemicals" },

  // 🪙 Metals
  { symbol: "TATASTEEL", change: 3.18, volume: 3.5, sector: "Metals" },
  { symbol: "JSWSTEEL", change: -2.14, volume: 2.9, sector: "Metals" },

  // 🛰️ Defense
  { symbol: "HAL", change: 2.63, volume: 2.1, sector: "Defense" },
  { symbol: "BEL", change: -1.42, volume: 2.5, sector: "Defense" },

  // 🌱 Agriculture
  { symbol: "UPL", change: -0.75, volume: 2.0, sector: "Agriculture" },
  { symbol: "NATIONALFERT", change: 1.48, volume: 1.6, sector: "Agriculture" },

  // 🧳 Tourism
  { symbol: "INDHOTEL", change: 2.05, volume: 2.2, sector: "Tourism" },
  { symbol: "EIHOTEL", change: -1.02, volume: 1.3, sector: "Tourism" },

  // 📈 Insurance
  { symbol: "SBI-LIFE", change: 1.76, volume: 1.9, sector: "Insurance" },
  { symbol: "ICICI-PRU", change: -0.68, volume: 1.5, sector: "Insurance" },

  // 🔧 Engineering
  { symbol: "ABB", change: 3.12, volume: 2.4, sector: "Engineering" },
  { symbol: "THERMAX", change: -1.35, volume: 1.8, sector: "Engineering" },

  // 💡 Power Utilities
  { symbol: "NTPC", change: 1.94, volume: 3.1, sector: "Power" },
  { symbol: "TATAPOWER", change: -0.92, volume: 2.7, sector: "Power" },

  // 🚚 Logistics
  { symbol: "CONCOR", change: 2.41, volume: 2.3, sector: "Logistics" },
  { symbol: "BLUEDART", change: -1.76, volume: 1.2, sector: "Logistics" },

  // 🧵 Textiles
  { symbol: "PAGEIND", change: -0.84, volume: 1.0, sector: "Textiles" },
  { symbol: "ARVIND", change: 1.25, volume: 1.4, sector: "Textiles" },

  // 🍻 Beverages
  { symbol: "UBL", change: 0.86, volume: 1.5, sector: "Beverages" },
  { symbol: "RADICO", change: -1.14, volume: 1.0, sector: "Beverages" },

  // 💍 Jewellery
  { symbol: "TITAN", change: 1.62, volume: 2.1, sector: "Jewellery" },
  { symbol: "RAJESHEXPO", change: -0.72, volume: 0.9, sector: "Jewellery" },

  // 💊 Healthcare Services
  { symbol: "APOLLOHOSP", change: 1.28, volume: 1.8, sector: "Healthcare" },
  { symbol: "FORTIS", change: -1.06, volume: 1.3, sector: "Healthcare" },

  // 🧰 Construction Materials
  { symbol: "ULTRACEMCO", change: 1.54, volume: 2.0, sector: "Cement" },
  { symbol: "AMBUJACEM", change: -0.92, volume: 1.7, sector: "Cement" },

  // 🖥️ Electronics / Semiconductors
  { symbol: "DIXON", change: 3.12, volume: 1.9, sector: "Electronics" },
  { symbol: "MOTHERSON", change: -1.45, volume: 2.3, sector: "Electronics" },

  // 📦 Packaging
  { symbol: "UFLEX", change: 1.21, volume: 1.1, sector: "Packaging" },
  { symbol: "HUHTAMAKI", change: -0.88, volume: 0.9, sector: "Packaging" },

  // 🛠️ Mining
  { symbol: "NMDC", change: 2.82, volume: 3.1, sector: "Mining" },
  { symbol: "HINDZINC", change: -1.44, volume: 2.2, sector: "Mining" },

  // 📡 Media & Entertainment
  { symbol: "ZEEL", change: -1.65, volume: 2.8, sector: "Media" },
  { symbol: "SUNTV", change: 1.32, volume: 1.9, sector: "Media" },

  // 🧾 Consulting / Services
  { symbol: "LTIM", change: 2.15, volume: 1.6, sector: "Consulting" },
  { symbol: "KPITTECH", change: -0.74, volume: 1.3, sector: "Consulting" },

  // 🌐 Internet / E-commerce
  { symbol: "ZOMATO", change: 3.48, volume: 4.0, sector: "Internet" },
  { symbol: "NYKAA", change: -1.82, volume: 2.6, sector: "Internet" },
];


const SectorHeatMap: React.FC<MarketHeatMapProps> = ({ data = defaultData }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const parent = svgRef.current.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = 250;

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    // ✅ Group and limit sectors
    const sectorMap = d3
      .rollups(
        data,
        (v) => ({
          avgChange: d3.mean(v, (d) => d.change) ?? 0,
          totalVol: d3.sum(v, (d) => d.volume),
          stocks: v.map((d) => d.symbol),
        }),
        (d) => d.sector
      )
      .slice(0, 30); // ✅ Limit to 30 sectors

    // Layout grid
    const sectorCount = sectorMap.length;
    const cols = Math.ceil(Math.sqrt(sectorCount));
    const rows = Math.ceil(sectorCount / cols);
    const cellPadding = 5;
    const cellWidth = (width - cellPadding * (cols + 1)) / cols;
    const cellHeight = (height - cellPadding * (rows + 1)) / rows;

    const getColor = (change: number, minChange: number, maxChange: number) => {
      const range = Math.max(Math.abs(minChange), Math.abs(maxChange)) || 1;
      const magnitude = Math.min(Math.abs(change), range);
      const intensity = (magnitude / range) * 100;
      const lightness = 60 - (intensity / 100) * 35;
      return change >= 0
        ? `hsl(120, 90%, ${lightness}%)`
        : `hsl(0, 90%, ${lightness}%)`;
    };

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(15,20,35,0.9)")
      .style("color", "#E5E7EB")
      .style("padding", "6px 10px")
      .style("border", "1px solid #E3B341")
      .style("border-radius", "6px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("font-size", "11px");

    const groups = svg
      .selectAll("g.cell")
      .data(sectorMap, (d: any) => d[0])
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

      const minChange = d3.min(data, (d) => d.change) ?? -5;
      const maxChange = d3.max(data, (d) => d.change) ?? 5;

      const rect = g
        .selectAll("rect")
        .data([info])
        .join("rect")
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("rx", 6)
        .style("cursor", "pointer");

      rect
        .transition()
        .duration(800)
        .attr("fill", (d) => getColor(d.avgChange, minChange, maxChange));

      rect
        .on("mouseover", (event, d) => {
          tooltip
            .html(
              `<b>${sector}</b><br/>
Avg Change: ${d.avgChange.toFixed(2)}%<br/>
Total Volume: ${d.totalVol.toFixed(2)}M<br/>
Stocks: ${d.stocks.join(", ")}`
            )
            .style("opacity", 1)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY + 10 + "px");
        })
        .on("mousemove", (event) => {
          tooltip.style("left", event.pageX + 10 + "px").style("top", event.pageY + 10 + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0));

      // ✅ Allow tooltip trigger even when hovering over text
      const title = g
        .selectAll("text.title")
        .data([sector])
        .join("text")
        .attr("class", "title")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 - 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", Math.min(Math.max(9, cellWidth / 15), 14))
        .attr("font-weight", "bold")
        .style("pointer-events", "none") // ✅ fix tooltip issue
        .text(sector.substring(0, 7));

      const value = g
        .selectAll("text.value")
        .data([info])
        .join("text")
        .attr("class", "value")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2 + 12)
        .attr("text-anchor", "middle")
        .attr("fill", "#E3B341")
        .attr("font-size", Math.max(8, cellWidth / 14))
        .style("pointer-events", "none") // ✅ fix tooltip issue
        .text(`${info.avgChange.toFixed(2)}%`);
    });

    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <WindowLayout title="Sector Heatmap" icon={Flame}>
      <div className="w-full overflow-auto max-h-[250px] flex items-center justify-center">
        <svg ref={svgRef} className="w-full"></svg>
      </div>
    </WindowLayout>
  );
};

export default SectorHeatMap;
