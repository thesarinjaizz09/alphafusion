'use client'

import React, { useState } from "react";
import { Bot } from "lucide-react"; // floating chat icon
import { motion, AnimatePresence } from 'framer-motion';
import { X } from "lucide-react";
import { Combobox } from "@/components/ui/combobox"

export const widgets: { value: string; label: string }[] = [
    { value: "globalIndices", label: "Global Indices Summary" },
    { value: "exchangeInfo", label: "Exchange Info Box" },
    { value: "moversLosers", label: "Movers & Losers" },
    { value: "tradesharkSuggestions", label: "TradeShark Suggestions" },
    { value: "watchlist", label: "Watchlist Box" },
    { value: "equitiesIndices", label: "Equities & Indices Box" },
    { value: "candlestickPanel", label: "Candlestick Panel" },
    { value: "sectorHeatMap", label: "Sector Heat Map" },
    { value: "insiderTable", label: "Insider Table" },
    { value: "marketSentiment", label: "Market Sentiment Panel" },
    { value: "aiAlerts", label: "AI Alerts Panel" },
    { value: "macroData", label: "Macro Data Panel" },
    { value: "socialSentiment", label: "Social Sentiment Board" },
    { value: "eventsEarnings", label: "Events & Earnings Panel" },
    { value: "userNotes", label: "User Notes / Analyst Notes" },
];

// AI models
export const aiModels: { value: string; label: string }[] = [
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5", label: "GPT-3.5" },
    { value: "custom-tradeshark", label: "Custom TradeShark Model" },
];


const AIChatPanel = () => {
    const [selectedModel, setSelectedModel] = useState("GPT-4");
    const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);
    const [chatMessages, setChatMessages] = useState<{ user: boolean; text: string }[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setChatMessages([...chatMessages, { user: true, text: input }]);
        setInput("");

        // TODO: Add AI response here using your backend
        setTimeout(() => {
            setChatMessages((prev) => [...prev, { user: false, text: `AI response to "${input}"` }]);
        }, 500);
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex justify-start items-center px-3 py-2 bg-[#0B1222] border-b border-gray-800">
                <h3 className="text-[11px] text-accent">Tradeshark Assistant</h3>
            </div>

            {/* Model & Widgets */}
            <div className="flex flex-col gap-2 px-4 py-3 bg-[#0B1222] border-b border-gray-800">

                <div className="grid grid-cols-1 gap-2">
                    <Combobox mode="Select Model..." span="full" items={aiModels} />
                    <Combobox mode="Select Widget..." span="full" items={widgets} />
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-[#050914]">
                {chatMessages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded-md text-[10px] max-w-xs ${msg.user ? "bg-green-500/10 self-end text-green-300" : "bg-[#16223B]/50 self-start text-gray-200"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 bg-[#0B1222] border-t border-gray-800">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-[#16223B]/80 text-gray-200 text-[10px] rounded-sm px-3 py-2 outline-none focus:outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="bg- px-3 py-2 bg-[#0A0F1C] border border-gray-800 text-[10px] rounded-sm hover:bg-accent/80"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

const FloatingAIButton = () => {
    const [open, setOpen] = useState(false);

    // List of widgets in your page
    const widgets = [
        "GlobalIndicesSummary",
        "ExchangeInfoBox",
        "MoversLosersBox",
        "EquitiesIndicesBox",
        "CandlestickPanel",
        "InstitutionalFlow",
        "MarketSentimentPanel",
        "MacroDataPanel",
        "UserNotes",
        "TradesharkSuggestions",
        "SectorHeatMap",
        "NewsBox",
        "WatchlistBox",
        "InsiderTable",
        "AIAlertsPanel",
        "SocialSentimentBoard",
        "EventsEarningsPanel",
    ];

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-2 right-2 w-11 h-11 bg-[#0A0F1C] text-[#050914] rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform z-50 border border-gray-800 transition-all duration-300 backdrop-blur-md shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 cursor-pointer"
            >
                <Bot className="w-5 h-5 text-accent" />
            </button>

            {/* Overlay Side Panel */}

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/60 z-40"
                            onClick={() => setOpen(false)}
                        />

                        {/* Right-side panel */}
                        <motion.div
                            className="fixed top-0 right-0 h-full w-[25%] bg-[#0B1222] shadow-2xl z-50 flex flex-col"
                            initial={{ x: "100%" }}  // start fully offscreen right
                            animate={{ x: 0 }}       // slide into view
                            exit={{ x: "100%" }}     // slide out to right
                            transition={{ type: "tween", duration: 0.3 }}
                        >
                            <AIChatPanel />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </>
    );
};

export default FloatingAIButton;
