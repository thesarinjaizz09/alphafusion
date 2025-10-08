'use client'
import Image from "next/image";
import DynamicTable from "./dynamic-table";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Combobox } from "@/components/ui/combobox"
import { exchanges } from '@/data/stocks.parameters'
import { Landmark, MoveRight } from "lucide-react";
import { ExchangeInfoType } from "@/types/fusion.types";
import { exchangeData } from "@/data/stocks.parameters";
import { formatInTimeZone } from "date-fns-tz";
import { parse } from "date-fns";

const ExchangeInfoBox = ({ selectedExchange }: { selectedExchange: string }) => {
    const [info, setInfo] = useState<ExchangeInfoType | null>(null);
    const [localTime, setLocalTime] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Mac-style button states
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);

    useEffect(() => {
        if (selectedExchange && exchangeData[selectedExchange]) {
            setInfo(exchangeData[selectedExchange]);
        } else {
            setInfo(null);
        }
    }, [selectedExchange]);

    const getMarketStatus = () => {
        if (!info) return false;

        try {
            const [openStr, closeStr] = info.tradingHours.split("–").map((s) => s.trim());
            const now = new Date();

            const todayDateStr = formatInTimeZone(now, info.timezone, "yyyy-MM-dd");
            const openTime = parse(`${todayDateStr} ${openStr}`, "yyyy-MM-dd hh:mm a", new Date());
            const closeTime = parse(`${todayDateStr} ${closeStr}`, "yyyy-MM-dd hh:mm a", new Date());

            const nowUtc = new Date(formatInTimeZone(now, "UTC", "yyyy-MM-dd HH:mm:ss"));
            const openUtc = new Date(formatInTimeZone(openTime, "UTC", "yyyy-MM-dd HH:mm:ss"));
            const closeUtc = new Date(formatInTimeZone(closeTime, "UTC", "yyyy-MM-dd HH:mm:ss"));

            return nowUtc >= openUtc && nowUtc <= closeUtc;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        if (!info?.timezone) return;

        const updateClock = () => {
            const timeStr = formatInTimeZone(new Date(), info.timezone, "HH:mm:ss");
            setLocalTime(timeStr);
            setIsOpen(getMarketStatus());
        };

        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, [info?.timezone]);

    if (!info || !isVisible) {
        return null; // hidden if closed
    }

    const leftTableData = [
        { Attribute: "Country", Value: info.country },
        { Attribute: "Currency", Value: info.currency },
        { Attribute: "Listed Companies", Value: info.listedCompanies },
        { Attribute: "Market Cap", Value: info.marketCap },
    ];

    const rightTableData = [
        { Attribute: "Daily Volume", Value: info.dailyVolume },
        { Attribute: "Top Sector", Value: info.topSector },
        { Attribute: "Exchange Type", Value: info.exchangeType },
        { Attribute: "Trading Hours", Value: info.tradingHours },
    ];

    const bottomTableData = [
        { Attribute: "Top Stocks", Value: info.topStocks.join(", ") },
        { Attribute: "Main Indices", Value: info.mainIndices.join(", ") },
        { Attribute: "Regulator", Value: info.regulator },
        { Attribute: "Timezone", Value: info.timezone },
    ];

    return (
        <div
            className={`${isMinimized ? "h-fit p-2" : "p-3"
                } col-span-2 bg-[#0A0F1C] border border-gray-800 rounded-2xl w-full text-gray-200 text-[10px] transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 relative overflow-hidden ${isMinimized ? "opacity-90" : "scale-100 opacity-100"}`}
        >


            {/* Top-right Mac-style buttons */}
            <div className={`flex ${isMinimized ? "justify-between" : "justify-between"} items-center ${isMinimized ? "mb-0" : "mb-3"} ${!isMinimized ? "border-b pb-2 border-accent" : "border-none pb-0"}`}>
                {/* Component name when minimized */}
                <div className="text-accent flex items-center gap-2">
                    <Landmark className="w-3 inline" /> <span className="text-accent font-semibold">
                        Exchange Insights
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        <Combobox mode="Select Exchange" span="full" items={exchanges} />
                        <Combobox mode="Select Sector" span="full" items={exchanges} />
                    </div>

                    <div className="bg-[#16223B]/80 rounded-lg p-2 mb-4 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20">
                        <h2 className="font-semibold text-white mb-1">
                            <a
                                href={info.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline flex items-center gap-2"
                            >
                                <Landmark className="w-3 inline" /> {info.name} <MoveRight className="w-3 inline" />
                            </a>
                        </h2>
                        <p className="text-gray-400 flex items-center gap-2">
                            <Image
                                src={info.flag}
                                alt={`${ info.name } flag`}
                                width={28}
                                height={28}
                                className="rounded-xs border border-[#E3B341]"
                            />
                            <Badge
                                variant="secondary"
                                className={`text-[10px] font-medium ${ isOpen ? "bg-green-900" : "bg-red-900" } `}
                            >
                                {isOpen ? "🟢 Market Open" : "🔴 Market Closed"} - 🕒 {localTime}
                            </Badge>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <DynamicTable title="Exchange Insights" headers={["Attribute", "Value"]} data={leftTableData} />
                        <DynamicTable title="Exchange Insights" headers={["Attribute", "Value"]} data={rightTableData} />
                        <DynamicTable title="Exchange Insights" headers={["Attribute", "Value"]} data={bottomTableData} />
                    </div>
                </>
            )}
        </div>
    );
};

export default ExchangeInfoBox;
