"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useState, useMemo } from "react";
import { X, ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import WindowLayout from "./window-layout";
import SentimentMeter from "./sentiment-gauge";
import {
    Clock,
    Newspaper,
    BarChart2,
    Target,
    Hourglass,
    TrendingUp,
    TrendingDown,
    Pause,
} from "lucide-react";
import { NoResults } from "@/components/ui/no-results";

interface Alert {
    ticker: string;
    description: string;
    type: "Volume" | "Volatility" | "Options";
    change?: string; // e.g., "+6.3%"
    time?: string; // optional timestamp
}

interface AIAlertsPanelProps {
    alerts?: Alert[];
}

const sampleAlerts: Alert[] = [
    { ticker: "INFY.NS", description: "Unusual volume spike", type: "Volume", change: "+6.3%", time: "10:15 AM" },
    { ticker: "TCS.NS", description: "Large deviation vs historical volatility", type: "Volatility", change: "+4.1%", time: "10:20 AM" },
    { ticker: "RELIANCE.NS", description: "Abnormal options flow detected", type: "Options", change: "-4.1%", time: "10:30 AM" },
    { ticker: "HDFC.NS", description: "Unusual volume spike", type: "Volume", change: "+5.5%", time: "10:35 AM" },
];

const typeColors = {
    Volume: "text-green-400",
    Volatility: "text-yellow-400",
    Options: "text-purple-400",
};

const AIAlertsPanel: React.FC<AIAlertsPanelProps> = ({ alerts = sampleAlerts, rowsPerPage = 4 }: { alerts?: Alert[], rowsPerPage?: number }) => {
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof Alert; direction: "asc" | "desc" } | null>({ key: "change", direction: "desc" });
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = useMemo(() => {
        let tempData = [...alerts];

        // Global search
        if (search) {
            const lowerSearch = search.toLowerCase();
            tempData = tempData.filter(n =>
                n.ticker.toLowerCase().includes(lowerSearch) ||
                n.description.toLowerCase().includes(lowerSearch) ||
                n.type.toLowerCase().includes(lowerSearch)
            );
        }

        // Sorting
        if (sortConfig) {
            const { key, direction } = sortConfig;
            tempData.sort((a, b) => {
                let aVal: any = a[key];
                let bVal: any = b[key];

                // ⏱️ Convert "Xh ago" to numeric hours for proper sorting
                if (key === "time") {
                    const parseHours = (val: string) => {
                        const match = val.match(/(\d+)\s*h\s*ago/i);
                        return match ? parseInt(match[1]) : 0;
                    };
                    aVal = parseHours(aVal);
                    bVal = parseHours(bVal);
                }

                if (typeof aVal === "number" && typeof bVal === "number") {
                    return direction === "asc" ? aVal - bVal : bVal - aVal;
                }

                return direction === "asc"
                    ? String(aVal).localeCompare(String(bVal))
                    : String(bVal).localeCompare(String(aVal));
            });
        }


        return tempData;
    }, [search, sortConfig]);

    // --- Pagination ---
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage]);

    const handleSort = (key: keyof Alert) => {
        if (sortConfig?.key === key) {
            setSortConfig({ key, direction: sortConfig.direction === "asc" ? "desc" : "asc" });
        } else {
            setSortConfig({ key, direction: "desc" });
        }
    };

    return (
        <WindowLayout title="Tradeshark Alerts">
            <div className="flex flex-col md:flex-row items-center justify-between mb-2 gap-2">
                <div className="flex items-center bg-[#10182A] rounded-sm px-2 py-1 w-full max-w-xs border border-gray-700">
                    <Search className="w-3 h-3 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent text-gray-200 text-[10px] outline-none w-full"
                    />
                </div>
                <div className="flex gap-3 text-[10px] text-gray-400">
                    <button onClick={() => handleSort("time")} className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
                        Time <ArrowUpDown className="w-3 h-3" />
                    </button>
                    <button onClick={() => handleSort("change")} className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
                        Change <ArrowUpDown className="w-3 h-3" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {paginatedData.length > 0 ? (
                    paginatedData.map((alert, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedAlert(alert)}
                            className="cursor-pointer bg-[#0B1220] border border-gray-800 p-2 rounded-sm shadow-md hover:shadow-[#E3B341]/20 transition-all flex flex-col"
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-gray-400 text-[9px]">{alert.ticker}</span>
                                <span className={`text-[9px] font-semibold ${typeColors[alert.type]}`}>{alert.type}</span>
                            </div>
                            <h4 className="text-gray-200 font-medium text-[10px] mt-1 line-clamp-2">{alert.description.length > 45 ? `${alert.description.substring(0, 45)}...` : alert.description}</h4>
                            <div className="flex justify-between items-center mt-2 text-gray-400 text-[9px]">
                                <span>{alert.change && (
                                    <span
                                        className={`text-[10px] font-bold ${alert.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                                    >
                                        {alert.change}
                                    </span>
                                )}</span>
                                <span>{alert.time}</span>
                                {/* <span>Score: {news.Score}</span> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <NoResults
                        title="No News Found"
                        description="No news articles match your current search criteria."
                        searchTerm={search || undefined}
                        showFilterIcon={false}
                        className="py-8"
                    />
                )}
            </div>

            {/* Pagination Controls */}
            {filteredData.length > rowsPerPage && (
                <div className="flex justify-between items-center text-[10px] text-gray-300 px-3 py-2 border-t border-gray-800 bg-[#0B1220]/90 mt-2">
                    <button
                        className="flex items-center gap-1 text-accent disabled:text-gray-600"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    >
                        <ChevronLeft className="w-3 h-3" /> Prev
                    </button>

                    <div className="text-gray-400">
                        Page <span className="text-accent">{currentPage}</span> of {totalPages || 1}
                    </div>

                    <button
                        className="flex items-center gap-1 text-accent disabled:text-gray-600"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    >
                        Next <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            )}

            <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
                <DialogContent className="bg-[#0B1220] text-gray-200 max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-start">
                            <span className="text-sm text-accent">{selectedAlert?.description}</span>
                        </DialogTitle>
                    </DialogHeader>
                    {selectedAlert && (
                        <div className="flex flex-col">
                            <div className="flex flex-wrap gap-3 text-[10px] mb-5 items-center">
                                {/* Time */}
                                <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/3 text-blue-300">
                                    <Clock className="w-4 h-4" />
                                    <span>{selectedAlert.time}</span>
                                </span>

                                <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/3 text-sky-400 font-semibold">
                                    <BarChart2 className="w-4 h-4" />
                                    <span>{selectedAlert.ticker}</span>
                                </span>

                                {/* Source */}
                                <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/3 text-gray-300">
                                    <Newspaper className="w-4 h-4" />
                                    <span>{selectedAlert.change && (
                                        <span
                                            className={`text-[10px] font-bold ${selectedAlert.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                                        >
                                            {selectedAlert.change}
                                        </span>
                                    )}</span>
                                </span>

                                <span className={`flex items-center gap-2 px-2 py-1 rounded-md bg-white/3 font-semibold ${typeColors[selectedAlert.type]}`}>
                                    <BarChart2 className="w-4 h-4" />
                                    <span>{selectedAlert.type}</span>
                                </span>

                            </div>

                            {/* <SentimentMeter value={selectedNews.Score} /> */}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </WindowLayout>
    );
};

export default AIAlertsPanel;
