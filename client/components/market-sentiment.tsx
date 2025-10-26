"use client";
import React, { useMemo, useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Area } from "recharts";
import WindowLayout from "./window-layout";
import SentimentMeter from "./sentiment-gauge";
import DynamicTable from "./global/dynamic-table-widget";
import { Brain } from "lucide-react";

interface MarketSentimentPanelProps {
    sentimentLabel?: "Bullish" | "Neutral" | "Bearish";
    dataPoints?: number; // Number of points to generate
}

const sentimentColors = {
    Bullish: "text-green-400",
    Neutral: "text-yellow-400",
    Bearish: "text-red-400",
};
const sentimentColorsBase = {
    Bullish: "green",
    Neutral: "yellow",
    Bearish: "red",
};

export const aiSentimentReasons = [
    {
        Factor: "Institutional Inflows (FII/DII)",
        Observation: "Strong net inflows observed over past 3 sessions",
        Impact: "Positive",
        Weight: "High",
    },
    {
        Factor: "Market Breadth",
        Observation: "Advances outnumber decliners 3:1 across sectors",
        Impact: "Positive",
        Weight: "Medium",
    },
    {
        Factor: "VIX Volatility Index",
        Observation: "Volatility down 12% week-over-week, showing confidence",
        Impact: "Positive",
        Weight: "Medium",
    },
    {
        Factor: "Retail Sentiment (Social Media & News NLP)",
        Observation: "Overall tone remains optimistic, 63% positive posts",
        Impact: "Positive",
        Weight: "Medium",
    },
    {
        Factor: "NIFTY Futures Positioning",
        Observation: "Long build-up in derivatives by institutional traders",
        Impact: "Positive",
        Weight: "High",
    },
    {
        Factor: "Sector Rotation",
        Observation: "Defensive sectors underperforming, cyclical gaining strength",
        Impact: "Positive",
        Weight: "Medium",
    },
    {
        Factor: "Earnings Announcements",
        Observation: "85% of large caps beat earnings estimates this quarter",
        Impact: "Positive",
        Weight: "High",
    },
    {
        Factor: "Foreign Exchange Movements",
        Observation: "Stable INR vs USD supports capital inflow sentiment",
        Impact: "Neutral",
        Weight: "Low",
    },
];

// Function to generate realistic fluctuating market data
const generateMarketData = (points: number = 300) => {
    const data = [];
    let last = 0; // start neutral
    for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.5) * 0.1; // fluctuate -0.05 to +0.05
        last = Math.max(-1, Math.min(1, last + change)); // keep between -1 and 1
        data.push({ time: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`, score: last });
    }
    return data;
};

function MarketSentimentChart({ sentimentData, color }: any) {
    return (
        <div className="h-72 bg-[#16223B]/80 rounded-sm p-2 shadow-lg shadow-[#E3B341]/10">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sentimentData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                        <filter id="glow" width="200%" height="200%" x="-50%" y="-50%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                        dataKey="time"
                        tick={{ fill: "#9ca3af", fontSize: 10 }}
                        interval="preserveEnd"
                        minTickGap={15}
                    />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
                    <Tooltip
                        contentStyle={{
                            background: "rgba(15, 23, 42, 0.95)",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                            color: "#f1f5f9",
                            fontSize: "11px",
                            padding: "6px 10px",
                            boxShadow: "0 0 10px rgba(227, 179, 65, 0.2)",
                        }}
                        formatter={(value: number) =>
                            `${value > 0 ? "+" : ""}${(value * 100).toFixed(2)}%`
                        }
                        labelStyle={{ color: "#E3B341", fontWeight: 600 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke="none"
                        fill="url(#sentimentGradient)"
                        fillOpacity={1}
                    />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke={color}
                        strokeWidth={2.5}
                        dot={false}
                        filter="url(#glow)"
                        isAnimationActive={true}
                        animationDuration={1200}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}


const MarketSentimentPanel: React.FC<MarketSentimentPanelProps> = ({
    sentimentLabel,
    dataPoints = 300,
}) => {
    const [sentimentData, setSentimentData] = useState<{ time: string, score: number }[]>([]);

    useEffect(() => {
        setSentimentData(generateMarketData(dataPoints));
    }, [dataPoints]);

    // Determine overall sentiment from last value (handle empty case)
    const lastScore = sentimentData.length > 0 ? sentimentData[sentimentData.length - 1].score : 0;

    const label =
        sentimentLabel ||
        (lastScore > 0.05 ? "Bullish" : lastScore < -0.05 ? "Bearish" : "Neutral");


    const color = sentimentColors[label];

    return (
        <WindowLayout title="Tradeshark Market Sentiment" icon={Brain}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4">
                <div className="bg-[#16223B]/80 flex items-start justify-between rounded-sm p-2 shadow-lg shadow-[#E3B341]/10">
                    <div>
                        <h3 className="text-[10px] text-gray-400">Market Sentiment</h3>
                        <div className={`text-[11px] font-semibold ${color}`}>
                            {label}
                        </div>
                    </div>
                    <SentimentMeter value={label === "Bullish" ? 82 : 45} />
                </div>

                <div className="bg-[#16223B]/80 flex items-start justify-between rounded-sm p-2 shadow-lg shadow-[#E3B341]/10">
                    <div>
                        <h3 className="text-[10px] text-gray-400">Cumulative Sentiment</h3>
                        <div className={`text-[11px] font-semibold ${color}`}>
                            {label}
                        </div>
                    </div>
                    <SentimentMeter value={label === "Bullish" ? 82 : 45} />
                </div>
            </div>

            {/* Net Flow Comparison */}
            <div className="grid grid-rows-1 mb-4">
                <DynamicTable
                    title="AI Reasoning Summary"
                    headers={["Factor", "Observation", "Impact", "Weight"]}
                    data={aiSentimentReasons}
                    rowsPerPageProps={2}
                />
            </div>
            <MarketSentimentChart sentimentData={sentimentData} color={sentimentColorsBase[label]} />
        </WindowLayout>
    );
};

export default MarketSentimentPanel;
