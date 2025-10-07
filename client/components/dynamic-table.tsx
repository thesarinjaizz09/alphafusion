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
            <Table className="min-w-full text-xs">
                <TableHeader>
                    <TableRow className="bg-primary sticky top-0 z-20">
                        {headers.map((header) => (
                            <TableHead
                                key={header}
                                className="text-left text-white-900 px-2 py-2"
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
                            className={`text-white-800 text-xs ${idx % 2 === 0 ? "bg-[#16223B]/80" : "bg-[#10182A]/80"
                                } hover:bg-sidebar-accent transition-colors`}
                        >
                            {headers.map((header) => (
                                <TableCell key={header} className="px-2 py-2">
                                    {row[header]}
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
