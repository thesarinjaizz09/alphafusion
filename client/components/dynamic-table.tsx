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
        <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
            <Table className="min-w-full text-xs">
                <TableHeader>
                    <TableRow className="bg-violet-200 sticky top-0 z-20">
                        {headers.map((header) => (
                            <TableHead
                                key={header}
                                className="text-left text-gray-900 px-4 py-2"
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
                            className={`text-gray-800 text-xs ${
                                idx % 2 === 0 ? "bg-gray-100" : "bg-violet-100"
                            } hover:bg-violet-100 transition-colors`}
                        >
                            {headers.map((header) => (
                                <TableCell key={header} className="px-4 py-2">
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
