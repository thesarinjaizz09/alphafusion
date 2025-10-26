"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Brain, Flame } from "lucide-react";

interface Stock {
  symbol: string;
  change: number;
  volume: number;
  sector: string;
}

interface SectorAggregate {
  stocks: string[];
  avgChange: number;
  totalVol: number;
}

const bubbleData: Stock[] = [
  { symbol: "INFY", change: 3.42, volume: 1.2, sector: "IT" },
  { symbol: "TCS", change: 2.81, volume: 1.8, sector: "IT" },
  { symbol: "HDFCBANK", change: 1.92, volume: 2.3, sector: "Banking" },
  { symbol: "SBIN", change: 2.15, volume: 3.8, sector: "Banking" },
  { symbol: "ONGC", change: -2.91, volume: 3.5, sector: "Energy" },
  { symbol: "COALINDIA", change: -1.72, volume: 2.4, sector: "Energy" },
  { symbol: "ITC", change: -1.2, volume: 4.2, sector: "FMCG" },
  { symbol: "MARUTI", change: 1.02, volume: 1.1, sector: "Auto" },
  { symbol: "RELIANCE", change: 0.75, volume: 5.6, sector: "Conglomerate" },
  { symbol: "ADANIPOWER", change: -3.05, volume: 2.9, sector: "Energy" },
];

const exchangeName = "NSE";

const MarketOrbitCloudWidget: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const parent = svgRef.current.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = parent.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const sunRadius = 30;
    const sunPadding = 40; // only for first orbit
    const orbitPadding = 20; // spacing between orbits

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);

    // Aggregate sectors
    const sectorMap: Record<string, SectorAggregate> = {};
    bubbleData.forEach((d) => {
      if (!sectorMap[d.sector])
        sectorMap[d.sector] = { stocks: [], avgChange: 0, totalVol: 0 };
      sectorMap[d.sector].stocks.push(d.symbol);
      sectorMap[d.sector].avgChange += d.change;
      sectorMap[d.sector].totalVol += d.volume;
    });
    Object.keys(sectorMap).forEach((s) => {
      sectorMap[s].avgChange /= sectorMap[s].stocks.length;
    });

    const sectors = Object.entries(sectorMap);
    type Planet = SectorAggregate & { name: string };
    const sortedSectors: Planet[] = sectors.map(([name, agg]) => ({ name, ...agg }));

    // Determine orbits
    const orbits: { radius: number; planets: Planet[] }[] = [];
    let orbitRadius = sunRadius + sunPadding;
    let orbit: Planet[] = [];

    sortedSectors.forEach((planet) => {
      if (orbit.length >= 3) {
        orbits.push({ radius: orbitRadius, planets: orbit });
        const maxPlanetRadius = Math.max(...orbit.map((p) => Math.min(25, Math.max(15, p.totalVol * 3))));
        orbitRadius += 2 * maxPlanetRadius + orbitPadding;
        orbit = [];
      }
      orbit.push(planet);
    });
    if (orbit.length > 0) {
      orbits.push({ radius: orbitRadius, planets: orbit });
    }

    // Compute scaling to fit parent container
    const maxOrbit = orbits[orbits.length - 1].radius + Math.max(...orbits[orbits.length - 1].planets.map(p => Math.min(25, Math.max(15, p.totalVol * 3))));
    const scale = Math.min(width, height) / (2 * maxOrbit);
    const scaledCenterX = centerX;
    const scaledCenterY = centerY;

    // Tooltip
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

    // Draw orbits and planets
    orbits.forEach((o) => {
      // Draw orbit
      svg
        .append("circle")
        .attr("cx", scaledCenterX)
        .attr("cy", scaledCenterY)
        .attr("r", o.radius * scale)
        .attr("stroke", "rgba(227,179,65,0.2)")
        .attr("stroke-width", 1)
        .attr("fill", "none");

      // Place planets evenly
      const angleStep = (2 * Math.PI) / o.planets.length;
      o.planets.forEach((planet, idx) => {
        const planetRadius = Math.min(25, Math.max(15, planet.totalVol * 3)) * scale;
        const angle = idx * angleStep;
        const x = scaledCenterX + Math.cos(angle) * o.radius * scale;
        const y = scaledCenterY + Math.sin(angle) * o.radius * scale;

        // Planet circle
        svg
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", planetRadius)
          .attr(
            "fill",
            planet.avgChange > 0
              ? `rgba(34,197,94,${0.4 + planet.avgChange / 10})`
              : `rgba(239,68,68,${0.4 + Math.abs(planet.avgChange) / 10})`
          )
          .attr("stroke", "#0F172A")
          .attr("stroke-width", 1)
          .on("mouseover", (event) => {
            tooltip
              .html(
                `<b>${planet.name}</b><br/>
Avg Change: ${planet.avgChange.toFixed(2)}%<br/>
Total Vol: ${planet.totalVol.toFixed(2)}M<br/>
Stocks: ${planet.stocks.join(", ")}`
              )
              .style("opacity", 1)
              .style("left", event.pageX + 10 + "px")
              .style("top", event.pageY + 10 + "px");
          })
          .on("mousemove", (event) => {
            tooltip.style("left", event.pageX + 10 + "px").style("top", event.pageY + 10 + "px");
          })
          .on("mouseout", () => tooltip.style("opacity", 0));

        // Planet label
        svg
          .append("text")
          .attr("x", x)
          .attr("y", y + 4)
          .attr("text-anchor", "middle")
          .attr("fill", "#E5E7EB")
          .attr("font-size", 10)
          .text(planet.name);
      });
    });

    // Draw sun
    svg
      .append("circle")
      .attr("cx", scaledCenterX)
      .attr("cy", scaledCenterY)
      .attr("r", sunRadius * scale)
      .attr("fill", "gold")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("filter", "url(#glow)");

    svg
      .append("text")
      .attr("x", scaledCenterX)
      .attr("y", scaledCenterY + 4)
      .attr("text-anchor", "middle")
      .attr("fill", "#0F172A")
      .attr("font-size", 11)
      .attr("font-weight", "bold")
      .text(exchangeName);

    // Glow filter for sun
    // const defs = svg.append("defs");
    // const filter = defs.append("filter").attr("id", "glow");
    // filter.append("feGaussianBlur").attr("stdDeviation", 8).attr("result", "coloredBlur");
    // filter
    //   .append("feMerge")
    //   .selectAll("feMergeNode")
    //   .data(["coloredBlur", "SourceGraphic"])
    //   .enter()
    //   .append("feMergeNode")
    //   .attr("in", (d: string) => d);
  }, []);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);



  if (!isVisible) {
    return null; // hidden if closed
  }
  return (
    <div className={`${isMinimized ? "h-fit p-2" : "p-3"
      } col-span-1 bg-[#0A0F1C] border border-gray-800 rounded-2xl w-full text-gray-200 text-[10px] transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 relative overflow-hidden ${isMinimized ? "opacity-90" : "scale-100 opacity-100"}`}>
      {/* Top-right Mac-style buttons */}
      <div className={`flex ${isMinimized ? "justify-between" : "justify-between"} items-center ${isMinimized ? "mb-0" : "mb-3"} ${!isMinimized ? "border-b pb-2 border-accent" : "border-none pb-0"}`}>
        {/* Component name when minimized */}
        <div className="text-accent flex items-center gap-2">
          <Flame className="w-3 inline" /> <span className="text-accent font-semibold">
            Exchange Sector Insights
          </span>
        </div>
        <div className="flex gap-2">
          {/* Minimize */}
          <button
            className="cursor-pointer w-2 h-2 rounded-full bg-yellow-500 hover:bg-yellow-600"
            onClick={() => setIsMinimized(!isMinimized)}
          />
          <button
            className="cursor-pointer w-2 h-2 rounded-full bg-red-500 hover:bg-red-600"
            onClick={() => setIsVisible(false)}
          />
        </div>
      </div>
      {
        !isMinimized && <div className="flex items-center justify-center w-full h-full">
          <svg ref={svgRef} className="w-full h-full"></svg>
        </div>
      }

    </div>
  );
};

export default MarketOrbitCloudWidget;
