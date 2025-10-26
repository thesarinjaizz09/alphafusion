'use client'
import { Brain } from "lucide-react";
import SentimentMeter from "@/components/global/sentiment-gauge-widget";
import WindowLayout from "@/components/global/window-layout-widget";
import DynamicTable from "@/components/global/dynamic-table-widget";

const TradesharkSuggestionsWidget = () => {

    const tableData = [
        { Ticker: "AAPL", Action: "BUY", Target: "$220", Horizon: "2W", Score: "8.5" },
        { Ticker: "TSLA", Action: "HOLD", Target: "$250", Horizon: "1M", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
    ];

    return (
        <WindowLayout title="Tradeshark's Suggestions" icon={Brain} showFilters={false}>
            <div className="bg-[#16223B]/80 flex items-start justify-between rounded-sm p-2 mb-2 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20">
                <div>
                    <h3 className="text-[10px] text-gray-400">Exchange Sentiment</h3>
                    <div className="text-[11px] font-semibold text-green-400">Bullish</div>
                </div>
                <SentimentMeter value={82} />
            </div>
            <DynamicTable title="Tradeshark's Suggestions" headers={["Ticker", "Action", "Target", "Horizon", "Score"]} data={tableData} />
        </WindowLayout>
    );
};

export default TradesharkSuggestionsWidget;
