import React, { useMemo, useState } from "react";
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
import { Combobox } from "@/components/ui/combobox";
import { exchanges } from "@/data/stocks.parameters";
import { TooltipProps } from "recharts";
import { LegendPayload } from "recharts";
import { Diff, Sunrise, Waves } from "lucide-react";


// ------------------------------
// Types
// ------------------------------
interface FlowData {
    date: string;
    fii: number;
    dii: number;
    mutualFunds: number;
    insurance: number;
    pension: number;
}
interface CustomLegendProps {
    payload?: LegendPayload[];
}

// ------------------------------
// Mock Data
// ------------------------------
const flowdata: FlowData[] = [
    { date: "2025-10-01", fii: 3280, dii: -1250, mutualFunds: 800, insurance: 500, pension: 200 },
    { date: "2025-10-02", fii: -2450, dii: 1620, mutualFunds: 900, insurance: 300, pension: -100 },
    { date: "2025-10-03", fii: 1850, dii: 620, mutualFunds: -500, insurance: 600, pension: 200 },
    { date: "2025-10-04", fii: -960, dii: 400, mutualFunds: 200, insurance: -150, pension: 80 },
    { date: "2025-10-05", fii: 2750, dii: -380, mutualFunds: 400, insurance: 100, pension: 150 },
    { date: "2025-10-06", fii: -1350, dii: 950, mutualFunds: 100, insurance: 250, pension: -50 },
    { date: "2025-10-07", fii: 2100, dii: 400, mutualFunds: 600, insurance: 300, pension: 120 },
    { date: "2025-10-08", fii: -300, dii: 1200, mutualFunds: 150, insurance: 450, pension: 200 },
    { date: "2025-10-09", fii: 3700, dii: -600, mutualFunds: 700, insurance: 300, pension: 250 },
    { date: "2025-10-10", fii: -2750, dii: 1600, mutualFunds: -400, insurance: 700, pension: 100 },
];

const tableData = [
    { Attribute: "This Week", Value: "FII +₹5,320 Cr | DII -₹2,180 Cr" },
    { Attribute: "Month-to-date", Value: "FII +₹12,000 Cr | DII -₹5,000 Cr" },
];

// ------------------------------
// Helpers
// ------------------------------
const calcSum = (data: FlowData[], key: keyof FlowData) =>
    data.reduce((sum, d) => sum + (typeof d[key] === "number" ? (d[key] as number) : 0), 0);


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
const CustomTooltip: React.FC<TooltipProps<number, string>> = (props) => {
    const { active, payload, label } = props as any; // cast as any for TS

    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f172a] border border-[#334155] rounded-md p-2 text-[9px] text-slate-100 shadow-lg">
                <p className="font-semibold text-[#E3B341] border-b text-accent uppercase mb-2 pb-1">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-slate-300">
                        {entry.name}:{" "}
                        <span className="text-white font-medium">
                            ₹{entry.value.toLocaleString()}
                        </span>
                    </p>
                ))}
            </div>
        );
    }

    return null;
};

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
    if (!payload) return null;

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-wrap gap-1 mt-[20px]"> {/* mt with px value */}
                {payload.map((entry, index) => (
                    <div
                        key={`legend-${index}`}
                        className="flex items-center gap-1 bg-[#1e293b] px-2 py-1 rounded-md shadow-md"
                    >
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-[9px] text-slate-200 font-medium">{entry.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const InstitutionalFlow: React.FC = () => {
    const [data, setData] = useState<FlowData[]>(flowdata);

    const [viewMode, setViewMode] = useState<"Daily" | "Weekly" | "Monthly">("Daily");

    const summary = useMemo(() => {
        const totalFII = calcSum(data, "fii");
        const totalDII = calcSum(data, "dii");
        const net = totalFII + totalDII;
        const sentiment = getSentiment(net);
        return {
            weekly: { fii: 8900, dii: -4200 },
            mtd: { fii: 18500, dii: -9600 },
            ytd: { fii: 324000, dii: 210000 },
            sentiment,
        };
    }, [data]);


    return (
        <WindowLayout title="Institutional Flow" icon={Waves}>
            {/* Filter and Toggle */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2">
                <Combobox mode="Select Sector" span="full" items={exchanges} />
            </div>

            {/* Sentiment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-2">
                <div className="bg-[#16223B]/80 flex items-start justify-between rounded-sm p-2 shadow-lg shadow-[#E3B341]/10">
                    <div>
                        <h3 className="text-[10px] text-gray-400">Investor Sentiment</h3>
                        <div className={`text-[11px] font-semibold ${summary.sentiment.color}`}>
                            {summary.sentiment.label}
                        </div>
                    </div>
                    <SentimentMeter value={summary.sentiment.label === "Bullish" ? 82 : 45} />
                </div>

                <div className="bg-[#16223B]/80 flex items-start justify-between rounded-sm p-2 shadow-lg shadow-[#E3B341]/10">
                    <div>
                        <h3 className="text-[10px] text-gray-400">Cumulative Sentiment</h3>
                        <div className={`text-[11px] font-semibold ${summary.sentiment.color}`}>
                            {summary.sentiment.label}
                        </div>
                    </div>
                    <SentimentMeter value={summary.sentiment.label === "Bullish" ? 82 : 45} />
                </div>
            </div>

            {/* Net Flow Comparison */}
            <div className="grid grid-rows-1 mb-2">
                <DynamicTable title="Net Flow Comparison" headers={["Attribute", "Value"]} data={tableData} />
            </div>

            {/* Summary Cards */}
            <div className="w-full grid grid-cols-1 mb-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                    {[
                        { label: "Weekly", fii: summary.weekly.fii, dii: summary.weekly.dii },
                        { label: "MTD", fii: summary.mtd.fii, dii: summary.mtd.dii },
                        { label: "YTD", fii: summary.ytd.fii, dii: summary.ytd.dii },
                    ].map((card) => (
                        <div
                            key={card.label}
                            className="bg-[#16223B]/80 p-2 rounded-sm min-w-[100px] shadow-md shadow-[#E3B341]/10"
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

            {/* Chart */}
            <div className="h-72 bg-[#16223B]/80 rounded-sm p-2 shadow-lg shadow-[#E3B341]/10">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        barSize={20}                // <— increase this for thicker bars
                        barCategoryGap="20%"        // reduce this if you want bars closer
                        barGap={0}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: "#9ca3af", fontSize: 10 }}
                            interval="preserveEnd"
                            minTickGap={15}
                        />
                        <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
                        <Tooltip content={<CustomTooltip />} />
                        {/* <Tooltip
                            contentStyle={{
                                background: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                                color: "#f8fafc",
                                fontSize: "10px",
                            }}
                        /> */}
                        <Legend
                            content={<CustomLegend />}
                            wrapperStyle={{
                                bottom: -3,  // moves the legend down inside the chart container
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        />
                        <ReferenceLine y={0} stroke="#64748b" />
                        <Bar dataKey="fii" fill="#22c55e" name="FII (₹ Cr)" />
                        <Bar dataKey="dii" fill="#3b82f6" name="DII (₹ Cr)" />
                        <Bar dataKey="mutualFunds" fill="#eab308" name="Mutual Funds (₹ Cr)" />
                        <Bar dataKey="insurance" fill="#a855f7" name="Insurance (₹ Cr)" />
                        <Bar dataKey="pension" fill="#f97316" name="Pension Funds (₹ Cr)" />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </WindowLayout>
    );
};

export default InstitutionalFlow;
