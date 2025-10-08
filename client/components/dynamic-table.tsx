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
        <div className="text-center text-accent text-[9px] p-2 font-medium">
            {title}
        </div>
    );

    // Limit rows to max 6, dynamic height calculation
    const visibleRows = data.slice(0, 7);
    const rowHeight = 42; // Approx height per row
    const tableHeight = Math.min(visibleRows.length, 7) * rowHeight;

    return (
        <div className="overflow-x-auto rounded-lg backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 flex flex-col">
            {/* Title above table if position is top */}
            {title && titlePosition === "top" && TitleComponent}

            {/* Scrollable table body */}
            <div className="flex-1 overflow-y-auto relative" style={{ maxHeight: tableHeight }}>
                <Table className="min-w-full text-[10px] table-fixed h-full">
                    <TableHeader>
                        <TableRow className="bg-primary sticky top-0 z-30">
                            {headers.map((header) => (
                                <TableHead
                                    key={header}
                                    className="text-left text-white-900"
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
                                    let colorClass = "";

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

                                    return (
                                        <TableCell key={header} className={colorClass}>
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
