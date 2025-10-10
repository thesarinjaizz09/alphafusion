'use client'
import { Brain, Cctv } from "lucide-react";
import WindowLayout from "./window-layout";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import DynamicTable from "./dynamic-table";
import SentimentMeter from "./sentiment-gauge";

// /data/watchlistData.ts

const watchlistData = [
    { Ticker: "AAPL", Price: "176.50", "Ch %": "+1.23%", Vol: "54.3M", "P/E": "27.5", "Div.": "0.55%" },
    { Ticker: "TSLA", Price: "245.30", "Ch %": "-0.87%", Vol: "39.1M", "P/E": "55.2", "Div.": "—" },
    { Ticker: "MSFT", Price: "411.70", "Ch %": "+0.76%", Vol: "32.7M", "P/E": "35.8", "Div.": "0.80%" },
];

const headers = [
    "Ticker",
    "Price",
    "Ch %",
    "Vol",
    "P/E",
    "Div.",
];


const WatchlistBox = () => {
    return (
        <WindowLayout title="Your Watchlist" icon={Cctv}>
            <DynamicTable
                headers={headers}
                data={watchlistData}
                title="My Watchlist"
            />
        </WindowLayout>
    );
};

export default WatchlistBox;
