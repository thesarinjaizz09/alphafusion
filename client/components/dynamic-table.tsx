"use client";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DynamicTableProps {
    headers: string[];                  // Column headers
    data: Record<string, any>[];        // Array of row objects
    rowKey?: string | ((row: Record<string, any>, idx: number) => string | number);
    title?: string;                     // Optional table title
    titlePosition?: "top" | "bottom";   // Optional title position
}

const DynamicTable: React.FC<DynamicTableProps> = ({
    headers,
    data,
    rowKey,
    title,
    titlePosition = "bottom",
}) => {
    const TitleComponent = (
        <div className="text-center text-accent text-[9px] tracking-wide p-2 font-semibold bg-[#0A0F1C]/60 rounded-t-md">
            {title}
        </div>
    );

    // Limit rows to max 6, dynamic height calculation
    const visibleRows = data.slice(0, 6);

    return (
        <div className="overflow-hidden rounded-lg bg-[#0A0F1C]/80 border border-[#1E293B]/60 backdrop-blur-lg shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 transition-all duration-300 flex flex-col">
            {/* Title above table if position is top */}
            {title && titlePosition === "top" && TitleComponent}

            {/* Scrollable table body */}
            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#E3B341]/30 scrollbar-track-transparent max-h-[260px]">
                <Table className="min-w-full text-[10px] table-fixed h-full">
                    <TableHeader>
                        <TableRow className="bg-primary border-b border-[#E3B341]/20">
                            {headers.map((header) => (
                                <TableHead
                                    key={header}
                                    className="text-left text-gray-300 font-semibold text-[10px] tracking-wider"
                                >
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((row, idx) => (
                            <TableRow
                                key={
                                    rowKey
                                        ? typeof rowKey === "function"
                                            ? rowKey(row, idx)
                                            : row[rowKey] ?? idx
                                        : idx
                                }
                                className={`text-white-800 text-[10px] ${idx % 2 === 0 ? "bg-[#16223B]/80" : "bg-[#10182A]/80"
                                    } hover:bg-sidebar-accent transition-colors`}
                            >
                                {headers.map((header) => {
                                    const value = row[header];
                                    let colorClass = "text-gray-300";

                                    // Auto color for + / - values
                                    if (typeof value === "string" && (value.startsWith("+") || value.startsWith("-"))) {
                                        colorClass = value.startsWith("+") ? "text-green-400 font-semibold" : "text-red-400 font-semibold";
                                    }

                                    // Keep existing BUY/HOLD/SELL coloring logic
                                    if (typeof value === "string" && ["BUY", "HOLD", "SELL"].includes(value.toUpperCase())) {
                                        colorClass = value.toUpperCase() === "BUY"
                                            ? "text-green-400 font-semibold"
                                            : value.toUpperCase() === "SELL"
                                                ? "text-red-400 font-semibold"
                                                : "text-yellow-400 font-semibold";
                                    }

                                    // const alignRight =
                                    //     typeof value === "number" ||
                                    //     (typeof value === "string" && /\d/.test(value));

                                    const alignRight =
                                        typeof value === "number" ||
                                        /^\d+(\.\d+)?%?$/.test(value);

                                    return (
                                        <TableCell
                                            key={header}
                                            className={`${colorClass} ${alignRight ? "text-right" : "text-left"
                                                }`}
                                        >
                                            {value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Title below table if position is bottom */}
            {title && titlePosition === "bottom" && TitleComponent}
        </div>
    );
};

export default DynamicTable;
