'use client'
import { Brain, Cctv, Diff, Plus } from "lucide-react";
import WindowLayout from "./window-layout";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import DynamicTable from "./dynamic-table";
import SentimentMeter from "./sentiment-gauge";

// /data/watchlistData.ts

const watchlistData = [
    { Symbol: "INFY", Price: "₹1,543.20", "Change %": "+3.42%", Volume: "1.2M", "52W High/Low": "₹1650 / ₹1210", "P/E": "27.4", "Dividend Yield": "2.1%" },
    { Symbol: "TCS", Price: "₹3,545.50", "Change %": "-2.81%", Volume: "1.8M", "52W High/Low": "₹3670 / ₹3120", "P/E": "29.2", "Dividend Yield": "1.4%" },
    { Symbol: "HDFCBANK", Price: "₹1,570.80", "Change %": "+1.92%", Volume: "2.3M", "52W High/Low": "₹1750 / ₹1400", "P/E": "22.8", "Dividend Yield": "1.1%" },
];

const headers = [
    "Symbol",
    "Price",
    "Change %",
    "Volume",
    "52W High/Low",
    "P/E",
    "Dividend Yield",
];


const WatchlistBox = () => {
    return (
        <WindowLayout title="Your Watchlist" icon={Cctv} max={true}>
            <div className="flex gap-3 text-[10px] text-gray-400 mb-2">
                <button className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
                    <Diff className="w-3 h-3" />
                    Equities 
                </button>
            </div>
            <DynamicTable
                headers={headers}
                data={watchlistData}
                title="My Watchlist"
            />
        </WindowLayout>
    );
};

export default WatchlistBox;
