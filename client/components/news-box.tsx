'use client'
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface NewsItem {
    Ticker: string;
    Headline: string;
    Source: string;
    Time: string;
    Score: number;
    Action?: "BUY" | "HOLD" | "SELL";
    Target?: string;
    Horizon?: string;
    FullText?: string;
}

const newsData: NewsItem[] = [
    {
        Ticker: "AAPL",
        Headline: "Apple Reports Strong Q3 Earnings",
        Source: "Bloomberg",
        Time: "2h ago",
        Score: 8.5,
        Action: "BUY",
        Target: "$220",
        Horizon: "2W",
        FullText: "Apple Inc. reported robust third-quarter earnings, surpassing Wall Street expectations. The company's revenue was bolstered by strong iPhone sales and increased demand in international markets. Analysts are optimistic about Apple's growth prospects, citing its expanding services segment and potential in emerging technologies."
    },
    {
        Ticker: "TSLA",
        Headline: "Tesla Stock Dips After New Regulations",
        Source: "Reuters",
        Time: "3h ago",
        Score: 7.8,
        Action: "HOLD",
        Target: "$250",
        Horizon: "1M",
        FullText: "Tesla's stock experienced a decline following the announcement of new regulatory measures affecting the electric vehicle industry. While the company remains a leader in EV innovation, investors are cautious about potential impacts on production timelines and profitability. Analysts suggest monitoring policy developments closely."
    },
    {
        Ticker: "MSFT",
        Headline: "Microsoft Announces AI Integration",
        Source: "CNBC",
        Time: "1h ago",
        Score: 9.0,
        Action: "SELL",
        Target: "$395",
        Horizon: "3D",
        FullText: "Microsoft unveiled plans to integrate advanced artificial intelligence capabilities across its product suite. While the move positions the company at the forefront of AI innovation, some investors are concerned about the short-term costs associated with development and implementation. Market reactions have been mixed."
    },
    {
        Ticker: "GOOGL",
        Headline: "Alphabet's Q3 Earnings Beat Expectations",
        Source: "Bloomberg",
        Time: "5h ago",
        Score: 8.7,
        Action: "BUY",
        Target: "$2,800",
        Horizon: "2W",
        FullText: "Alphabet Inc. reported third-quarter earnings that exceeded analyst expectations, driven by strong performance in digital advertising and cloud services. The company's diversified revenue streams and continued investment in AI and other technologies position it well for sustained growth."
    },
    {
        Ticker: "AMZN",
        Headline: "Amazon Expands Prime Membership Benefits",
        Source: "Reuters",
        Time: "6h ago",
        Score: 8.2,
        Action: "BUY",
        Target: "$3,500",
        Horizon: "1M",
        FullText: "Amazon announced enhancements to its Prime membership program, including expanded delivery options and exclusive content. The move aims to increase customer retention and drive higher subscription revenues, further solidifying Amazon's position in the e-commerce and entertainment sectors."
    },
    {
        Ticker: "NVDA",
        Headline: "NVIDIA's New GPU Launches Amid Market Demand",
        Source: "CNBC",
        Time: "7h ago",
        Score: 9.3,
        Action: "BUY",
        Target: "$800",
        Horizon: "2W",
        FullText: "NVIDIA Corporation introduced its latest generation of graphics processing units, catering to the growing demand in gaming, data centers, and AI applications. The company's strong market position and innovative product offerings are expected to drive continued revenue growth."
    },
    {
        Ticker: "TSLA",
        Headline: "Tesla Unveils New Solar Roof Technology",
        Source: "Bloomberg",
        Time: "8h ago",
        Score: 8.0,
        Action: "HOLD",
        Target: "$275",
        Horizon: "1M",
        FullText: "Tesla revealed advancements in its solar roof technology, promising increased energy efficiency and cost savings for consumers. While the innovation aligns with the company's sustainability goals, investors are evaluating the potential impact on production capabilities and market adoption rates."
    },
    {
        Ticker: "AAPL",
        Headline: "Apple Faces Supply Chain Challenges",
        Source: "Reuters",
        Time: "9h ago",
        Score: 7.5,
        Action: "HOLD",
        Target: "$210",
        Horizon: "1M",
        FullText: "Apple Inc. is encountering supply chain disruptions that may affect product availability and delivery timelines. The company is working to mitigate these challenges, but investors are advised to monitor the situation closely as it could impact short-term revenue projections."
    },
    {
        Ticker: "MSFT",
        Headline: "Microsoft Acquires Cybersecurity Firm",
        Source: "CNBC",
        Time: "10h ago",
        Score: 8.8,
        Action: "BUY",
        Target: "$420",
        Horizon: "2W",
        FullText: "Microsoft announced the acquisition of a leading cybersecurity firm to bolster its enterprise security offerings. The strategic move enhances Microsoft's position in the growing cybersecurity market and is expected to contribute positively to long-term revenue streams."
    },
    {
        Ticker: "GOOGL",
        Headline: "Alphabet Invests in Quantum Computing",
        Source: "Bloomberg",
        Time: "11h ago",
        Score: 9.1,
        Action: "BUY",
        Target: "$2,900",
        Horizon: "1M",
        FullText: "Alphabet Inc. is increasing its investments in quantum computing research, aiming to achieve breakthroughs that could revolutionize various industries. The company's commitment to cutting-edge technologies positions it as a leader in the next generation of computing advancements."
    }
];


const NewsBox = ({ rowsPerPage = 5 }: { rowsPerPage?: number }) => {
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof NewsItem; direction: "asc" | "desc" } | null>({ key: "Score", direction: "desc" });
    const [currentPage, setCurrentPage] = useState(1);

    // --- Filter + Sort ---
    const filteredData = useMemo(() => {
        let tempData = [...newsData];

        // Global search
        if (search) {
            const lowerSearch = search.toLowerCase();
            tempData = tempData.filter(n =>
                n.Ticker.toLowerCase().includes(lowerSearch) ||
                n.Headline.toLowerCase().includes(lowerSearch) ||
                n.Source.toLowerCase().includes(lowerSearch)
            );
        }

        // Sorting
        if (sortConfig) {
            const { key, direction } = sortConfig;
            tempData.sort((a, b) => {
                let aVal: any = a[key];
                let bVal: any = b[key];

                // ⏱️ Convert "Xh ago" to numeric hours for proper sorting
                if (key === "Time") {
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

    const handleSort = (key: keyof NewsItem) => {
        if (sortConfig?.key === key) {
            setSortConfig({ key, direction: sortConfig.direction === "asc" ? "desc" : "asc" });
        } else {
            setSortConfig({ key, direction: "desc" });
        }
    };

    return (
        <WindowLayout title="Financial News" icon={Newspaper} height="500px" fit={false}>
            {/* Search & Sort */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-3 gap-2">
                <div className="flex items-center bg-[#10182A] rounded-lg px-2 py-1 w-full max-w-xs border border-gray-700">
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
                    <button onClick={() => handleSort("Time")} className="flex items-center gap-1 hover:text-accent">
                        Time <ArrowUpDown className="w-3 h-3" />
                    </button>
                    <button onClick={() => handleSort("Score")} className="flex items-center gap-1 hover:text-accent">
                        Score <ArrowUpDown className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* News Cards */}
            <div className="flex flex-col gap-3">
                {paginatedData.map((news, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedNews(news)}
                        className="cursor-pointer bg-[#0B1220] border border-gray-800 p-2 rounded-lg shadow-md hover:shadow-[#E3B341]/20 transition-all flex flex-col"
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-gray-400 text-[10px]">{news.Ticker}</span>
                            <span className={`text-[10px] font-semibold ${news.Action === "BUY" ? "text-green-400" :
                                news.Action === "SELL" ? "text-red-400" :
                                    "text-yellow-400"
                                }`}>{news.Action}</span>
                        </div>
                        <h4 className="text-gray-200 font-medium text-[11px mt-1 line-clamp-2">{news.Headline}</h4>
                        <div className="flex justify-between items-center mt-2 text-gray-400 text-[10px]">
                            <span>{news.Source}</span>
                            <span>{news.Time}</span>
                            <span>Score: {news.Score}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {filteredData.length > rowsPerPage && (
                <div className="flex justify-between items-center text-[10px] text-gray-300 px-3 py-2 border-t border-gray-800 bg-[#0B1220]/90">
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

            {/* ShadCN Dialog */}
            <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
                <DialogContent className="bg-[#0B1220] text-gray-200 max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-start">
                            <span className="text-md">{selectedNews?.Headline}</span>
                        </DialogTitle>
                    </DialogHeader>
                    {selectedNews && (
                        <div>

                            <div className="flex flex-wrap gap-3 text-[11px] md:text-xs mb-5 items-center">
                                {/* Time */}
                                <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/3 text-blue-300">
                                    <Clock className="w-4 h-4" />
                                    <span>{selectedNews.Time}</span>
                                </span>

                                {/* Source */}
                                <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/3 text-gray-300">
                                    <Newspaper className="w-4 h-4" />
                                    <span>{selectedNews.Source}</span>
                                </span>

                                {/* Ticker */}
                                <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/3 text-sky-400 font-semibold">
                                    <BarChart2 className="w-4 h-4" />
                                    <span>{selectedNews.Ticker}</span>
                                </span>

                                {/* Target */}
                                <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/3 text-emerald-300">
                                    <Target className="w-4 h-4" />
                                    <span>{selectedNews.Target}</span>
                                </span>

                                {/* Horizon */}
                                <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/3 text-yellow-300">
                                    <Hourglass className="w-4 h-4" />
                                    <span>{selectedNews.Horizon}</span>
                                </span>

                                {/* Action (BUY/HOLD/SELL) */}
                                {(() => {
                                    const isBuy = selectedNews.Action === "BUY";
                                    const isSell = selectedNews.Action === "SELL";
                                    const ActionIcon = isBuy ? TrendingUp : isSell ? TrendingDown : Pause;
                                    const actionClasses = isBuy
                                        ? "text-green-400 bg-green-500/10"
                                        : isSell
                                            ? "text-red-400 bg-red-500/10"
                                            : "text-yellow-400 bg-yellow-500/10";

                                    return (
                                        <span className={`flex items-center gap-2 px-2 py-1 rounded-md font-semibold ${actionClasses}`}>
                                            <ActionIcon className="w-4 h-4" />
                                            <span>{selectedNews.Action}</span>
                                        </span>
                                    );
                                })()}
                            </div>

                            <p className="text-gray-300 mb-3 text-xs">{selectedNews.FullText}</p>
                            {/* <SentimentMeter value={selectedNews.Score} /> */}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </WindowLayout>
    );
};

export default NewsBox;
