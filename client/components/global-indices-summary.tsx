import WindowLayout from "./window-layout";
import { dummyIndicesData } from "@/data/stocks.parameters";
import { ArrowUp, ArrowDown, Waypoints } from "lucide-react";

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
        <WindowLayout title="Indices, Equities & Macros" icon={Waypoints}>
            <div className="overflow-hidden w-full">
                <div className="flex animate-scroll gap-4 w-max">
                    {loopedIndices.map((i, idx) => {
                        const isPositive = i.changePercent >= 0;
                        return (
                            <div
                                key={`${i.name}-${idx}`}
                                className="flex-shrink-0 flex flex bg-[#16223B]/80 border border-[#1E263A] rounded-lg px-3 py-2 min-w-[150px] shadow-lg"
                            >
                                <div className="flex justify-center gap-3 items-center">
                                    <span className="text-gray-300 text-[10px] font-medium">{i.name}</span>
                                    <div className="flex gap-2 items-start">
                                        <div className="text-white text-[9px] font-semibold">{i.price.toLocaleString()}</div>
                                        <div
                                            className={`flex items-center gap-1 text-[9px] font-medium ${isPositive ? "text-green-400" : "text-red-400"
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
          animation: scroll 60s linear infinite;
        }
      `}</style>
        </WindowLayout>
    );
};

export default GlobalIndicesSummary;
