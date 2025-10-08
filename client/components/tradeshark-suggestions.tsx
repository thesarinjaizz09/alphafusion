'use client'
import Image from "next/image";
import DynamicTable from "./dynamic-table";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Combobox } from "@/components/ui/combobox"
import { exchanges } from '@/data/stocks.parameters'
import { Brain } from "lucide-react";
import { ExchangeInfoType } from "@/types/fusion.types";
import { exchangeData } from "@/data/stocks.parameters";
import { formatInTimeZone } from "date-fns-tz";
import { parse } from "date-fns";
import SentimentMeter from "./sentiment-gauge";

const TradesharkSuggestions = ({ selectedExchange }: { selectedExchange: string }) => {

    // Mac-style button states
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);



    if (!isVisible) {
        return null; // hidden if closed
    }

    const tableData = [
        { Ticker: "AAPL", Action: "BUY", Target: "$220", Horizon: "2W", Score: "8.5" },
        { Ticker: "TSLA", Action: "HOLD", Target: "$250", Horizon: "1M", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
    ];

    return (
        <div className={`${isMinimized ? "h-fit p-2" : "p-3"
            } col-span-1 bg-[#0A0F1C] border border-gray-800 rounded-2xl w-full text-gray-200 text-[10px] transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 relative overflow-hidden ${isMinimized ? "opacity-90" : "scale-100 opacity-100"}`}>

            {/* Top-right Mac-style buttons */}
            <div className={`flex ${isMinimized ? "justify-between" : "justify-between"} items-center ${isMinimized ? "mb-0" : "mb-3"} ${!isMinimized ? "border-b pb-2 border-accent" : "border-none pb-0"}`}>
                {/* Component name when minimized */}
                <div className="text-accent flex items-center gap-2">
                    <Brain className="w-3 inline" /> <span className="text-accent font-semibold">
                        Tradeshark Insights
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

            {/* Content hidden when minimized */}
            {!isMinimized && (
                <>
                    <div className="bg-[#16223B]/80 flex items-start justify-between rounded-lg p-2 mb-4 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20">
                        <div>
                            <h3 className="text-[10px] text-gray-400">Exchange Sentiment</h3>
                            <div className="text-[11px] font-semibold text-green-400">Bullish</div>
                        </div>
                        <SentimentMeter value={82} />
                    </div>
                    <DynamicTable headers={["Ticker", "Action", "Target", "Horizon", "Score"]} data={tableData} />
                </>

            )}
        </div>
    );
};

export default TradesharkSuggestions;
