"use client";
import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { NoResults } from "@/components/ui/no-results";

interface DynamicTableProps {
    headers: string[];
    data: Record<string, any>[];
    rowKey?: string | ((row: Record<string, any>, idx: number) => string | number);
    title?: string;
    titlePosition?: "top" | "bottom";
    rowsPerPage?: number;
    enableGlobalSearch?: boolean; // ✅ optional
}

const DynamicTable: React.FC<DynamicTableProps> = ({
    headers,
    data,
    rowKey,
    title,
    titlePosition = "bottom",
    rowsPerPage = 6,
    enableGlobalSearch = true,
}) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>(""); // ✅ global search

    // --- Derived Data: Sorting + Filtering + Search ---
    const processedData = useMemo(() => {
        // 1️⃣ Start with a shallow copy
        let tempData = [...data];

        // 2️⃣ Global search
        if (search) {
            const lowerSearch = search.toLowerCase();
            tempData = tempData.filter((row) =>
                Object.values(row).some((val) => String(val).toLowerCase().includes(lowerSearch))
            );
        }

        // 3️⃣ Column-specific filters
        tempData = tempData.filter((row) =>
            headers.every((header) => {
                const filterValue = filters[header]?.toLowerCase() || "";
                if (!filterValue) return true;
                const cellValue = String(row[header]).toLowerCase();
                return cellValue.includes(filterValue);
            })
        );

        // 4️⃣ Sorting
        if (sortConfig) {
            const { key, direction } = sortConfig;
            tempData.sort((a, b) => {
                const aVal = a[key];
                const bVal = b[key];
                const aNum = parseFloat(String(aVal).replace(/[^\d.-]/g, ""));
                const bNum = parseFloat(String(bVal).replace(/[^\d.-]/g, ""));
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return direction === "asc" ? aNum - bNum : bNum - aNum;
                }
                return direction === "asc"
                    ? String(aVal).localeCompare(String(bVal))
                    : String(bVal).localeCompare(String(aVal));
            });
        }

        return tempData;
    }, [data, filters, headers, sortConfig, search]);

    // --- Pagination ---
    const totalPages = Math.ceil(processedData.length / rowsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return processedData.slice(start, start + rowsPerPage);
    }, [processedData, currentPage, rowsPerPage]);

    // --- Handlers ---
    const handleSort = (header: string) => {
        setSortConfig((prev) =>
            prev?.key === header
                ? prev.direction === "asc"
                    ? { key: header, direction: "desc" }
                    : null
                : { key: header, direction: "asc" }
        );
    };

    const handleFilterChange = (header: string, value: string) => {
        setFilters((prev) => ({ ...prev, [header]: value }));
        setCurrentPage(1);
    };

    const TitleComponent = (
        <div className="text-center text-accent text-[9px] p-2 font-medium">{title}</div>
    );

    const rowHeight = 42;
    const tableHeight = rowsPerPage * rowHeight;

    return (
        <div className="overflow-x-auto rounded-lg backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 flex flex-col w-full border border-gray-800">
            {title && titlePosition === "top" && TitleComponent}

            {/* ✅ Global Search */}
            {enableGlobalSearch && (
                <div className="flex items-center justify-start px-3 py-2">
                    <div className="flex items-center bg-[#10182A] rounded-lg px-2 py-1 w-full max-w-xs border border-gray-700">
                        <Search className="w-3 h-3 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1); // reset to first page on search
                            }}
                            className="bg-transparent text-gray-200 text-[10px] outline-none w-full"
                        />
                    </div>
                </div>
            )}

            {/* TABLE */}
            <div className="flex-1 overflow-y-auto relative" style={{ maxHeight: tableHeight + 60 }}>
                <Table className="min-w-full text-[9px] h-full border-separate border-spacing-0 table-auto">
                    <TableHeader>
                        <TableRow className="bg-[#121A2E] sticky top-0 z-30">
                            {headers.map((header) => (
                                <TableHead
                                    key={header}
                                    className="text-left text-white font-semibold cursor-pointer select-none hover:text-accent transition-all p-2"
                                >
                                    <div
                                        onClick={() => handleSort(header)}
                                        className="flex items-center justify-between w-full whitespace-nowrap"
                                    >
                                        <span className="truncate">{header}</span>
                                        <ArrowUpDown
                                            className={`w-3 h-3 ml-1 shrink-0 transition-transform ${sortConfig?.key === header
                                                    ? sortConfig.direction === "asc"
                                                        ? "rotate-180 text-accent"
                                                        : "text-accent"
                                                    : "text-gray-500"
                                                }`}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        value={filters[header] || ""}
                                        onChange={(e) => handleFilterChange(header, e.target.value)}
                                        placeholder="filter..."
                                        className="w-full text-[9px] mt-1 bg-transparent border-b border-gray-700 focus:border-accent outline-none text-gray-300 placeholder-gray-500"
                                    />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, idx) => (
                                <TableRow
                                    key={
                                        rowKey
                                            ? typeof rowKey === "function"
                                                ? rowKey(row, idx)
                                                : row[rowKey] ?? idx
                                            : idx
                                    }
                                    className={`text-white text-[9px] ${idx % 2 === 0 ? "bg-[#16223B]/80" : "bg-[#10182A]/80"
                                        } hover:bg-[#1B2B47] transition-colors`}
                                >
                                    {headers.map((header) => {
                                        const value = row[header];
                                        let colorClass = "";
                                        const isNumber = /\d/.test(String(value));

                                        if (typeof value === "string" && (value.startsWith("+") || value.startsWith("-"))) {
                                            colorClass = value.startsWith("+")
                                                ? "text-green-400 font-semibold"
                                                : "text-red-400 font-semibold";
                                        }

                                        if (typeof value === "string" && ["BUY", "HOLD", "SELL"].includes(value.toUpperCase())) {
                                            colorClass =
                                                value.toUpperCase() === "BUY"
                                                    ? "text-green-400 font-semibold"
                                                    : value.toUpperCase() === "SELL"
                                                        ? "text-red-400 font-semibold"
                                                        : "text-yellow-400 font-semibold";
                                        }

                                        return (
                                            <TableCell
                                                key={header}
                                                className={`${colorClass} ${isNumber ? "text-right" : "text-left"} px-2 py-2 max-w-[200px] truncate`}
                                            >
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={headers.length} className="p-0 text-center">
                                    <div className="flex justify-center items-center w-full">
                                        <NoResults 
                                            title="No Data Found"
                                            description="No records match your current search or filter criteria."
                                            searchTerm={search || undefined}
                                            className="py-6"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* PAGINATION */}
            {/* PAGINATION (only show if more than one page) */}
            {processedData.length > rowsPerPage && (
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


            {title && titlePosition === "bottom" && TitleComponent}
        </div>
    );
};

export default DynamicTable;
