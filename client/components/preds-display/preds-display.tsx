import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PredictionData } from "@/types/vision.types";

type TimeSeries = Record<string, number>;

interface PredsDisplayProps {
    data: PredictionData;
}

const PredsDisplay: React.FC<PredsDisplayProps> = ({ data }) => {
    const dates = Object.keys(data.open);

    return (
        <div className="overflow-x-auto shadow-sm">
            <Table className="min-w-full border border-gray-200 text-xs">
                <TableHeader>
                    <TableRow className="bg-violet-200 sticky top-0 z-20">
                        <TableHead className="text-left text-gray-900 px-4 py-2">
                            Date
                        </TableHead>
                        <TableHead className="text-left text-gray-900 px-4 py-2">
                            Open
                        </TableHead>
                        <TableHead className="text-left text-gray-900 px-4 py-2">
                            High
                        </TableHead>
                        <TableHead className="text-left text-gray-900 px-4 py-2">
                            Low
                        </TableHead>
                        <TableHead className="text-left text-gray-900 px-4 py-2">
                            Close
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {dates.map((date, idx) => (
                        <TableRow
                            key={date}
                            className={`text-gray-800 text-xs ${
                                idx % 2 === 0 ? "bg-gray-100" : "bg-violet-100"
                            } hover:bg-violet-100 transition-colors`}
                        >
                            <TableCell className="px-4 py-2">{date}</TableCell>
                            <TableCell className="px-4 py-2">{data.open[date]}</TableCell>
                            <TableCell className="px-4 py-2">{data.high[date]}</TableCell>
                            <TableCell className="px-4 py-2">{data.low[date]}</TableCell>
                            <TableCell className="px-4 py-2">{data.close[date]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PredsDisplay;
