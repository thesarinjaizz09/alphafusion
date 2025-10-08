import { dummyIndicesData } from "@/data/stocks.parameters";
import { ArrowUp, ArrowDown, Waypoints } from "lucide-react";
import { useEffect, useState } from "react";

interface IndexData {
    name: string;
    price: number;
    changePercent: number;
    marketCap: number;
    volume: number;
    sparkline: number[];
}

interface GlobalIndicesSummaryProps {
    selectedExchange: keyof typeof dummyIndicesData;
}

const GlobalIndicesSummary = ({ selectedExchange }: GlobalIndicesSummaryProps) => {
    const indices: IndexData[] = dummyIndicesData[selectedExchange] || [];
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);

    if (!isVisible) {
        return null; // hidden if closed
    }


    // Duplicate array for seamless loop
    const loopedIndices = [...indices, ...indices];

    return (
        <div
            className={`${isMinimized ? "h-fit p-2" : "p-3"
                } col-span-2 bg-[#0A0F1C] border border-gray-800 rounded-2xl w-full text-gray-200 text-[10px] transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 relative overflow-hidden ${isMinimized ? "opacity-90" : "scale-100 opacity-100"}`}
        >


            {/* Top-right Mac-style buttons */}
            <div className={`flex ${isMinimized ? "justify-between" : "justify-between"} items-center ${isMinimized ? "mb-0" : "mb-3"} ${!isMinimized ? "border-b pb-2 border-accent" : "border-none pb-0"}`}>
                {/* Component name when minimized */}
                <div className="text-accent flex items-center gap-2">
                    <Waypoints className="w-3 inline" /> <span className="text-accent font-semibold">
                        Indices Insights
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
                !isMinimized && (
                    <div className="flex animate-scroll gap-4">
                        {loopedIndices.map((i, idx) => {
                            const isPositive = i.changePercent >= 0;
                            return (
                                <div
                                    key={`${i.name}-${idx}`}
                                    className="flex-shrink-0 flex flex-col bg-[#16223B]/80 border border-[#1E263A] rounded-2xl px-3 py-2 min-w-[150px] shadow-lg"
                                >
                                    <div className="flex flex-col justify-between gap-1 items-start">
                                        <span className="text-gray-300 text-[10px] font-medium">{i.name}</span>
                                        <div className="flex flex-col items-start">
                                            <div className="text-white text-[10px] font-semibold">{i.price.toLocaleString()}</div>
                                            <div
                                                className={`flex items-center gap-1 text-[10px] font-medium ${isPositive ? "text-green-400" : "text-red-400"
                                                    }`}
                                            >
                                                {i.changePercent.toFixed(2)}%
                                                {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>)
            }

            <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default GlobalIndicesSummary;
