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
}

const DynamicTable: React.FC<DynamicTableProps> = ({ headers, data, rowKey }) => {
    return (
        <div className="overflow-x-auto rounded-lg backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20">
            <Table className="min-w-full text-[10px]">
                <TableHeader>
                    <TableRow className="bg-primary sticky top-0 z-20">
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
                            {headers.map((header) => (
                                <TableCell key={header}>
                                    {typeof row[header] === "string" && ["BUY", "HOLD", "SELL"].includes(row[header].toUpperCase()) ? (
                                        <span
                                            className={
                                                row[header].toUpperCase() === "BUY"
                                                    ? "text-green-400 font-semibold"
                                                    : row[header].toUpperCase() === "SELL"
                                                        ? "text-red-400 font-semibold"
                                                        : "text-yellow-400 font-semibold"
                                            }
                                        >
                                            {row[header]}
                                        </span>
                                    ) : (
                                        row[header]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DynamicTable;
