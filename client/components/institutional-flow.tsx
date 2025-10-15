import React, { useEffect, useState, useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
    ReferenceLine,
} from "recharts";
import WindowLayout from "./window-layout";
import SentimentMeter from "./sentiment-gauge";
import DynamicTable from "./dynamic-table";

// ------------------------------
// Types
// ------------------------------
interface FlowData {
    date: string;
    fii: number;
    dii: number;
}

// ------------------------------
// Mock Data
// ------------------------------
const flowdata: FlowData[] = [
    { date: "2025-10-01", fii: 3280, dii: -1250 },
    { date: "2025-10-02", fii: -2450, dii: 1620 },
    { date: "2025-10-03", fii: 1850, dii: 620 },
    { date: "2025-10-04", fii: -960, dii: 400 },
    { date: "2025-10-05", fii: 2750, dii: -380 },
    { date: "2025-10-06", fii: -1350, dii: 950 },
    { date: "2025-10-07", fii: 2100, dii: 400 },
    { date: "2025-10-08", fii: -300, dii: 1200 },
    { date: "2025-10-09", fii: 3700, dii: -600 },
    { date: "2025-10-10", fii: -2750, dii: 1600 },
    { date: "2025-10-11", fii: 1950, dii: 850 },
    { date: "2025-10-12", fii: -800, dii: 200 },
    { date: "2025-10-13", fii: 3200, dii: -900 },
    { date: "2025-10-14", fii: -1500, dii: 1150 },
    { date: "2025-10-15", fii: 2600, dii: 500 },
];

const tableData = [
    {
        Attribute: "This Week", Value: "FII +₹5,320 Cr | DII -₹2,180 Cr"
    },
    {
        Attribute: "Month-to-date", Value: "FII +₹12,000 Cr | DII -₹5,000 Cr"
    }
]

// ------------------------------
// Helpers
// ------------------------------
const calcSum = (data: FlowData[], key: "fii" | "dii") =>
    data.reduce((sum, d) => sum + d[key], 0);

const formatCr = (val: number) =>
    `${val >= 0 ? "+" : "-"}₹${Math.abs(val).toLocaleString()} Cr`;

const getSentiment = (net: number) => {
    if (net > 0) return { label: "Bullish", color: "text-green-400" };
    if (net < 0) return { label: "Bearish", color: "text-red-400" };
    return { label: "Neutral", color: "text-yellow-400" };
};

// ------------------------------
// Component
// ------------------------------
const InstitutionalFlow: React.FC = () => {
    const [data, setData] = useState<FlowData[]>(flowdata);
    const [viewMode, setViewMode] = useState<"Daily" | "Weekly" | "Monthly">(
        "Daily"
    );

    // Simulate fetch from API
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/data/institutional-flow.json");
                if (!response.ok) return;
                const json = await response.json();
                setData(json);
            } catch {
                // fallback to mock
            }
        }
        fetchData();
    }, []);

    // Compute summary stats
    const summary = useMemo(() => {
        const totalFII = calcSum(data, "fii");
        const totalDII = calcSum(data, "dii");
        const net = totalFII + totalDII;

        const sentiment = getSentiment(net);

        // Example: you can replace these with actual weekly / MTD / YTD logic
        return {
            weekly: { fii: 8900, dii: -4200 },
            mtd: { fii: 18500, dii: -9600 },
            ytd: { fii: 324000, dii: 210000 },
            sentiment,
        };
    }, [data]);

    return (
        <WindowLayout title="Institutional Flow" max={true}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-2">

                {/* --- Sentiment Card --- */}
                <div className="grid grid-rows-2 gap-2">

                    <div className="bg-[#16223B]/80 flex items-start justify-between rounded-sm p-2 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20">
                        <div>
                            <h3 className="text-[10px] text-gray-400">Investors Sentiment</h3>
                            <div
                                className={`text-[11px] font-semibold ${summary.sentiment.color}`}
                            >
                                {summary.sentiment.label}
                            </div>
                        </div>
                        <SentimentMeter
                            value={summary.sentiment.label === "Bullish" ? 82 : 45}
                        />
                    </div>

                    <div className="bg-[#16223B]/80 flex items-start justify-between rounded-sm p-2 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20">
                        <div>
                            <h3 className="text-[10px] text-gray-400">Cumulative Trend</h3>
                            <div
                                className={`text-[11px] font-semibold ${summary.sentiment.color}`}
                            >
                                {summary.sentiment.label}
                            </div>
                        </div>
                        <SentimentMeter
                            value={summary.sentiment.label === "Bullish" ? 82 : 45}
                        />
                    </div>
                </div>

                <div className="grid grid-rows-1">
                    <DynamicTable title="Summary" headers={["Attribute", "Value"]} data={tableData} />
                </div>

                {/* Toggle Group */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {["Daily", "Weekly", "Monthly"].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode as any)}
                            className={`text-[10px] px-2 py-1 rounded-sm border ${viewMode === mode
                                ? "bg-[#E3B341]/20 border-[#E3B341] text-[#E3B341]"
                                : "border-gray-700 text-gray-400"
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div> */}
            </div>



            {/* --- Header Section --- */}
            <div className="w-full flex items-center justify-center mb-2">
                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-2 w-full">
                    {[
                        { label: "Weekly", fii: summary.weekly.fii, dii: summary.weekly.dii },
                        { label: "MTD", fii: summary.mtd.fii, dii: summary.mtd.dii },
                        { label: "YTD", fii: summary.ytd.fii, dii: summary.ytd.dii },
                    ].map((card) => (
                        <div
                            key={card.label}
                            className="bg-[#16223B]/80 p-2 rounded-md min-w-[100px] shadow-md shadow-[#E3B341]/10"
                        >
                            <h3 className="text-[10px] text-gray-400">{card.label}</h3>
                            <div className="text-[11px] font-semibold text-green-400">
                                FII {formatCr(card.fii)}
                            </div>
                            <div className="text-[11px] font-semibold text-blue-400">
                                DII {formatCr(card.dii)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* --- Chart --- */}
            <div className="h-72 bg-[#16223B]/80 rounded-sm p-2 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: "#9ca3af", fontSize: 10 }}
                            interval="preserveEnd"
                            minTickGap={15}
                        />
                        <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
                        <Tooltip
                            contentStyle={{
                                background: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                                color: "#f8fafc",
                                fontSize: "12px",
                            }}
                        />
                        <Legend wrapperStyle={{ color: "#f8fafc", fontSize: "12px" }} />
                        <ReferenceLine y={0} stroke="#64748b" />
                        <Bar dataKey="fii" fill="#22c55e" name="FII (₹ Cr)" />
                        <Bar dataKey="dii" fill="#3b82f6" name="DII (₹ Cr)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </WindowLayout>
    );
};

export default InstitutionalFlow;
