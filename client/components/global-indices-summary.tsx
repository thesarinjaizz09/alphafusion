import { dummyIndicesData } from "@/data/stocks.parameters";
import { ArrowUp, ArrowDown } from "lucide-react";

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

    // Duplicate array for seamless loop
    const loopedIndices = [...indices, ...indices];

    return (
        <div className="w-full overflow-hidden">
            <div className="flex animate-scroll gap-4">
                {loopedIndices.map((i, idx) => {
                    const isPositive = i.changePercent >= 0;
                    return (
                        <div
                            key={`${i.name}-${idx}`}
                            className="flex-shrink-0 flex flex-col bg-[#0E1424] border border-[#1E263A] rounded-2xl px-3 py-2 min-w-[150px] shadow-lg"
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
            </div>

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
