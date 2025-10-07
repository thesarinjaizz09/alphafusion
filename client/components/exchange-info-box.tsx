"use client";
import Image from "next/image";
import DynamicTable from "./dynamic-table";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Combobox } from "@/components/ui/combobox"
import { exchanges } from '@/data/stocks.parameters'
import { MoveRight } from "lucide-react";
import { ExchangeInfoType } from "@/types/fusion.types";
import { exchangeData } from "@/data/stocks.parameters";
import { formatInTimeZone } from "date-fns-tz";
import { parse } from "date-fns";



const ExchangeInfoBox = ({ selectedExchange }: { selectedExchange: string }) => {
    const [info, setInfo] = useState<ExchangeInfoType | null>(null);
    const [localTime, setLocalTime] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);


    useEffect(() => {
        if (selectedExchange && exchangeData[selectedExchange]) {
            setInfo(exchangeData[selectedExchange]);
        } else {
            setInfo(null);
        }
    }, [selectedExchange]);

    const getMarketStatus = () => {
        if (!info) return false; // Guard: exit if info is null

        try {
            // Example: "09:15 AM – 03:30 PM IST"
            const [openStr, closeStr] = info.tradingHours.split("–").map((s) => s.trim());
            const now = new Date();

            // Parse open/close times in local exchange timezone
            const todayDateStr = formatInTimeZone(now, info.timezone, "yyyy-MM-dd");
            const openTime = parse(`${todayDateStr} ${openStr}`, "yyyy-MM-dd hh:mm a", new Date());
            const closeTime = parse(`${todayDateStr} ${closeStr}`, "yyyy-MM-dd hh:mm a", new Date());

            // Convert both to UTC for comparison
            const nowUtc = new Date(formatInTimeZone(now, "UTC", "yyyy-MM-dd HH:mm:ss"));
            const openUtc = new Date(formatInTimeZone(openTime, "UTC", "yyyy-MM-dd HH:mm:ss"));
            const closeUtc = new Date(formatInTimeZone(closeTime, "UTC", "yyyy-MM-dd HH:mm:ss"));

            return nowUtc >= openUtc && nowUtc <= closeUtc;
        } catch {
            return false;
        }
    };


    useEffect(() => {
        if (!info?.timezone) return; // Guard: exit if timezone is undefined

        const updateClock = () => {
            const timeStr = formatInTimeZone(new Date(), info.timezone, "HH:mm:ss");
            setLocalTime(timeStr);
            setIsOpen(getMarketStatus());
        };

        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, [info?.timezone]);


    if (!info) {
        return (
            <div className="bg-[#0A0F1C] border border-gray-800 rounded-2xl p-4 w-[340px] text-gray-400 text-sm flex items-center justify-center">
                Select an exchange to view details
            </div>
        );
    }


    // Left and Right Table Data
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

    // Bottom table data
    const bottomTableData = [
        { Attribute: "Top Stocks", Value: info.topStocks.join(", ") },
        { Attribute: "Main Indices", Value: info.mainIndices.join(", ") },
        { Attribute: "Regulator", Value: info.regulator },
        { Attribute: "Timezone", Value: info.timezone },
    ];


    return (
        <div className="bg-[#0A0F1C] border border-gray-800 rounded-2xl p-3 py-4 w-full text-xs text-gray-200 transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <Combobox mode="Select Exchange" span="full" items={exchanges} />
                <Combobox mode="Select Sector" span="full" items={exchanges} />
            </div>
            <div className="bg-[#16223B]/80 rounded-lg p-2 mb-4 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20">
                <h2 className="font-semibold text-white mb-1"><a
                    href={info.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >{info.name} <MoveRight className="w-3 inline" /></a></h2>
                <p className="text-gray-400 flex items-center gap-2"><Image src={info.flag} alt={`${info.name} flag`} width={30} height={30} className="rounded-xs" />
                    <Badge
                        variant="secondary"
                        className={`text-xs font-medium ${isOpen ? "bg-green-900" : "bg-red-900"}`}
                    >
                        {isOpen ? "🟢 Market Open" : "🔴 Market Closed"} - 🕒 {localTime}
                    </Badge>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DynamicTable headers={["Attribute", "Value"]} data={leftTableData} />
                <DynamicTable headers={["Attribute", "Value"]} data={rightTableData} />
                <DynamicTable headers={["Attribute", "Value"]} data={bottomTableData} />
            </div>

            {/* <div className="text-center mt-4">
                <a
                    href={info.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-blue-400 text-xs hover:underline"
                >
                    Visit Official Website ↗
                </a>
            </div> */}
        </div >
    );
};

export default ExchangeInfoBox;