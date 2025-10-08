"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import "echarts-gl";

const bubbleData = [
  { symbol: "INFY", change: 3.42, volume: 1.2, sector: "IT" },
  { symbol: "TCS", change: 2.81, volume: 1.8, sector: "IT" },
  { symbol: "HCLTECH", change: 2.45, volume: 1.3, sector: "IT" },
  { symbol: "WIPRO", change: 1.35, volume: 1.5, sector: "IT" },
  { symbol: "HDFCBANK", change: 1.92, volume: 2.3, sector: "Banking" },
  { symbol: "SBIN", change: 2.15, volume: 3.8, sector: "Banking" },
  { symbol: "ICICIBANK", change: 1.58, volume: 3.1, sector: "Banking" },
  { symbol: "ONGC", change: -2.91, volume: 3.5, sector: "Energy" },
  { symbol: "COALINDIA", change: -1.72, volume: 2.4, sector: "Energy" },
  { symbol: "ADANIPOWER", change: -3.05, volume: 2.9, sector: "Energy" },
  { symbol: "ITC", change: -1.20, volume: 4.2, sector: "FMCG" },
  { symbol: "MARUTI", change: 1.02, volume: 1.1, sector: "Auto" },
  { symbol: "RELIANCE", change: 0.75, volume: 5.6, sector: "Conglomerate" },
];

// 🧮 Aggregate by sector
const sectorMap: Record<
  string,
  { stocks: string[]; avgChange: number; totalVol: number }
> = {};

bubbleData.forEach((d) => {
  if (!sectorMap[d.sector]) {
    sectorMap[d.sector] = { stocks: [], avgChange: 0, totalVol: 0 };
  }
  sectorMap[d.sector].stocks.push(d.symbol);
  sectorMap[d.sector].avgChange += d.change;
  sectorMap[d.sector].totalVol += d.volume;
});

Object.keys(sectorMap).forEach((sector) => {
  const s = sectorMap[sector];
  s.avgChange = s.avgChange / s.stocks.length;
});

// 🪐 Convert to bubbles
const sectorBubbles = Object.entries(sectorMap).map(([sector, s]) => ({
  name: sector,
  value: s.avgChange,
  symbolSize: Math.min(100, Math.max(30, s.totalVol * 8)),
  itemStyle: {
    color:
      s.avgChange > 0
        ? `rgba(34,197,94,${0.4 + s.avgChange / 10})`
        : `rgba(239,68,68,${0.4 + Math.abs(s.avgChange) / 10})`,
    shadowBlur: 25,
    shadowColor:
      s.avgChange > 0
        ? "rgba(34,197,94,0.6)"
        : "rgba(239,68,68,0.6)",
  },
  stocks: s.stocks,
  avgChange: s.avgChange,
  totalVol: s.totalVol,
}));

const MarketBubbleCloud: React.FC = () => {
  const option = {
    backgroundColor: "transparent",
    tooltip: {
      show: true,
      confine: true,
      backgroundColor: "rgba(15,20,35,0.9)",
      borderColor: "#E3B341",
      textStyle: { color: "#E5E7EB", fontSize: 12 },
      formatter: (params: any) => {
        const d = params.data;
        const change =
          typeof d.avgChange === "number"
            ? d.avgChange.toFixed(2)
            : "N/A";
        const sign = d.avgChange > 0 ? "+" : d.avgChange < 0 ? "" : "";
        return `
          <b>${d.name}</b><br/>
          Avg Change: ${sign}${change}%<br/>
          Total Vol: ${d.totalVol.toFixed(2)}M<br/>
          Stocks: ${d.stocks.join(", ")}
        `;
      },
    },
    series: [
      {
        type: "graph",
        layout: "force",
        roam: false,
        force: {
          repulsion: 300, // 🔧 tighter clustering
          gravity: 0.25, // pull toward center
          edgeLength: 80,
          friction: 0.2,
        },
        label: {
          show: true,
          position: "inside",
          color: "#E5E7EB",
          fontSize: 11,
          formatter: "{b}",
        },
        data: sectorBubbles,
      },
    ],
  };

  return (
    <div className="bg-[#0E1424] border border-[#1E263A] rounded-2xl p-4 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 backdrop-blur-md overflow-hidden">
      <h2 className="text-[11px] text-gray-400 mb-2 font-medium text-center">
        Sector Bubble Cloud
      </h2>
      <ReactECharts
        option={option}
        style={{ height: "350px", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default MarketBubbleCloud;
