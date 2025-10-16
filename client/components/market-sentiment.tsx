"use client";
import React, { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import WindowLayout from "./window-layout";

interface MarketSentimentPanelProps {
    sentimentLabel?: "Bullish" | "Neutral" | "Bearish";
    dataPoints?: number; // Number of points to generate
}

const sentimentColors = {
    Bullish: "#22c55e",
    Neutral: "#eab308",
    Bearish: "#ef4444",
};

// Function to generate realistic fluctuating market data
const generateMarketData = (points: number = 30) => {
    const data = [];
    let last = 0; // start neutral
    for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.5) * 0.1; // fluctuate -0.05 to +0.05
        last = Math.max(-1, Math.min(1, last + change)); // keep between -1 and 1
        data.push({ time: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`, score: last });
    }
    return data;
};

const MarketSentimentPanel: React.FC<MarketSentimentPanelProps> = ({
    sentimentLabel,
    dataPoints = 300,
}) => {
    const sentimentData = useMemo(() => generateMarketData(dataPoints), [dataPoints]);

    // Determine overall sentiment from last value
    const lastScore = sentimentData[sentimentData.length - 1].score;
    const label =
        sentimentLabel ||
        (lastScore > 0.05 ? "Bullish" : lastScore < -0.05 ? "Bearish" : "Neutral");

    const color = sentimentColors[label];

    return (
        <WindowLayout title="Tradeshark Market Sentiment">
            <div className="bg-[#16223B]/80 p-4 rounded-md shadow-lg shadow-[#E3B341]/10 w-full flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">
                        AI Market Sentiment
                    </span>
                    <span className={`text-[12px] font-bold`} style={{ color }}>
                        {label}
                    </span>
                </div>

                {/* Sentiment Score */}
                <div className="flex items-center mb-2">
                    <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: color }}
                    />
                    <span className="text-[10px] text-gray-300">Overall market tone</span>
                </div>

                {/* Trend Graph */}
                <div className="w-full h-24">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sentimentData}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{ fill: "#9ca3af", fontSize: 8 }} />
                            <YAxis
                                domain={[-1, 1]}
                                tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
                                tick={{ fill: "#9ca3af", fontSize: 8 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: "6px",
                                    color: "#f8fafc",
                                    fontSize: "10px",
                                    padding: "4px 8px",
                                }}
                                formatter={(value: number) =>
                                    `${value > 0 ? "+" : ""}${(value * 100).toFixed(2)}%`
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke={color}
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </WindowLayout>
    );
};

export default MarketSentimentPanel;
