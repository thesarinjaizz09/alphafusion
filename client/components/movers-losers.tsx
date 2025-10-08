'use client'
import Image from "next/image";
import DynamicTable from "./dynamic-table";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Combobox } from "@/components/ui/combobox"
import { exchanges } from '@/data/stocks.parameters'
import { SquarePercent } from "lucide-react";
import { ExchangeInfoType } from "@/types/fusion.types";
import { exchangeData } from "@/data/stocks.parameters";
import { formatInTimeZone } from "date-fns-tz";
import { parse } from "date-fns";

const topGainersData = [
    { Symbol: "INFY", Price: "₹1,543.20", "Change %": "+3.42%", Volume: "1.2M", sparkline: [1480, 1495, 1505, 1520, 1543] },
    { Symbol: "TCS", Price: "₹3,545.50", "Change %": "+2.81%", Volume: "1.8M", sparkline: [3400, 3445, 3470, 3525, 3545] },
    { Symbol: "HDFCBANK", Price: "₹1,570.80", "Change %": "+1.92%", Volume: "2.3M", sparkline: [1540, 1560, 1570, 1575, 1570] },
    { Symbol: "RELIANCE", Price: "₹2,765.30", "Change %": "+1.35%", Volume: "3.1M", sparkline: [2720, 2730, 2740, 2755, 2765] },
    { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", sparkline: [490, 492, 495, 496, 498] },
    { Symbol: "LT", Price: "₹2,040.50", "Change %": "+0.95%", Volume: "1.6M", sparkline: [2030, 2035, 2038, 2040, 2040.5] },
    { Symbol: "ICICIBANK", Price: "₹930.40", "Change %": "+0.88%", Volume: "2.2M", sparkline: [922, 925, 927, 929, 930.4] },
    { Symbol: "HCLTECH", Price: "₹1,025.60", "Change %": "+0.75%", Volume: "1.4M", sparkline: [1015, 1018, 1020, 1023, 1025.6] },
    { Symbol: "AXISBANK", Price: "₹940.10", "Change %": "+0.68%", Volume: "2.1M", sparkline: [932, 935, 937, 939, 940.1] },
    { Symbol: "SBIN", Price: "₹558.20", "Change %": "+0.55%", Volume: "3.3M", sparkline: [550, 552, 554, 556, 558.2] },
    { Symbol: "MARUTI", Price: "₹8,320.50", "Change %": "+0.50%", Volume: "0.7M", sparkline: [8300, 8310, 8315, 8320, 8320.5] },
    { Symbol: "TITAN", Price: "₹3,400.20", "Change %": "+0.45%", Volume: "1.1M", sparkline: [3380, 3390, 3395, 3400, 3400.2] },
    { Symbol: "TECHM", Price: "₹1,010.10", "Change %": "+0.40%", Volume: "0.9M", sparkline: [1000, 1005, 1007, 1009, 1010.1] },
    { Symbol: "BRITANNIA", Price: "₹4,420.30", "Change %": "+0.35%", Volume: "0.6M", sparkline: [4400, 4410, 4415, 4420, 4420.3] },
    { Symbol: "ADANIENT", Price: "₹1,675.50", "Change %": "+0.30%", Volume: "1.5M", sparkline: [1660, 1665, 1670, 1672, 1675.5] },
];

const topLosersData = [
    { Symbol: "ONGC", Price: "₹185.60", "Change %": "-2.91%", Volume: "3.5M", sparkline: [192, 189, 188, 186, 185] },
    { Symbol: "COALINDIA", Price: "₹440.80", "Change %": "-1.72%", Volume: "2.4M", sparkline: [450, 448, 446, 442, 440] },
    { Symbol: "ITC", Price: "₹447.10", "Change %": "-1.20%", Volume: "4.2M", sparkline: [455, 452, 450, 448, 447] },
    { Symbol: "BPCL", Price: "₹520.40", "Change %": "-0.95%", Volume: "1.5M", sparkline: [525, 523, 522, 521, 520] },
    { Symbol: "HINDALCO", Price: "₹426.70", "Change %": "-0.85%", Volume: "2.0M", sparkline: [430, 428, 427, 426, 426.7] },
    { Symbol: "ZEEL", Price: "₹380.50", "Change %": "-0.75%", Volume: "1.8M", sparkline: [385, 383, 382, 381, 380.5] },
    { Symbol: "VEDL", Price: "₹250.20", "Change %": "-0.70%", Volume: "2.6M", sparkline: [253, 252, 251, 250.5, 250.2] },
    { Symbol: "GAIL", Price: "₹140.80", "Change %": "-0.65%", Volume: "1.2M", sparkline: [142, 141, 141, 140.9, 140.8] },
    { Symbol: "NTPC", Price: "₹180.10", "Change %": "-0.60%", Volume: "2.1M", sparkline: [182, 181, 180.5, 180.2, 180.1] },
    { Symbol: "JSWSTEEL", Price: "₹720.50", "Change %": "-0.55%", Volume: "1.7M", sparkline: [725, 723, 722, 721, 720.5] },
    { Symbol: "TATASTEEL", Price: "₹1,190.40", "Change %": "-0.50%", Volume: "1.3M", sparkline: [1200, 1198, 1195, 1192, 1190.4] },
    { Symbol: "BPCL", Price: "₹520.00", "Change %": "-0.45%", Volume: "1.5M", sparkline: [525, 523, 521, 520.5, 520] },
    { Symbol: "ADANIPORTS", Price: "₹775.30", "Change %": "-0.40%", Volume: "2.0M", sparkline: [780, 778, 777, 776, 775.3] },
    { Symbol: "CIPLA", Price: "₹950.20", "Change %": "-0.35%", Volume: "1.1M", sparkline: [955, 953, 952, 951, 950.2] },
    { Symbol: "HDFC", Price: "₹2,450.50", "Change %": "-0.30%", Volume: "0.9M", sparkline: [2460, 2455, 2452, 2450.8, 2450.5] },
];


const MoversLosersBox = ({ selectedExchange }: { selectedExchange: string }) => {

    // Mac-style button states
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);


    if (!isVisible) {
        return null; // hidden if closed
    }


    return (
        <div
            className={`${isMinimized ? "h-fit p-2" : "p-3"
                } col-span-2 bg-[#0A0F1C] border border-gray-800 rounded-2xl w-full text-gray-200 text-[10px] transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 relative overflow-hidden ${isMinimized ? "opacity-90" : "scale-100 opacity-100"}`}
        >


            {/* Top-right Mac-style buttons */}
            <div className={`flex ${isMinimized ? "justify-between" : "justify-between"} items-center ${isMinimized ? "mb-0" : "mb-3"} ${!isMinimized ? "border-b pb-2 border-accent" : "border-none pb-0"}`}>
                {/* Component name when minimized */}
                <div className="text-accent flex items-center gap-2">
                    <SquarePercent className="w-3 inline" /> <span className="text-accent font-semibold">
                        Gainers & Losers Insights
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DynamicTable title="Exchange's Top Gainers" headers={["Symbol", "Price", "Change %", "Volume"]} data={topGainersData} />
                    <DynamicTable title="Exchange's Top Losers" headers={["Symbol", "Price", "Change %", "Volume"]} data={topLosersData} />
                </div>
            )}
        </div>
    );
};

export default MoversLosersBox;
