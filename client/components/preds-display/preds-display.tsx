import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// ✅ Define a generic type for date → number mapping
type TimeSeries = Record<string, number>;

export interface PredictionData {
    open: TimeSeries;
    high: TimeSeries;
    low: TimeSeries;
    close: TimeSeries;
}

interface PredsDisplayProps {
    data: PredictionData;
}

const PredsDisplay: React.FC<PredsDisplayProps> = ({ data }) => {
    const dates = Object.keys(data.open);

    return (
        <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                    {/* Apply sticky/top/bg/z to each TableHead (th) */}
                    <TableHead className="sticky top-0 bg-white/95 backdrop-blur-sm z-20">Date</TableHead>
                    <TableHead className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 text-right">Open</TableHead>
                    <TableHead className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 text-right">High</TableHead>
                    <TableHead className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 text-right">Low</TableHead>
                    <TableHead className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 text-right">Close</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dates.map((date) => (
                    <TableRow key={date}>
                        <TableCell>{date}</TableCell>
                        <TableCell>{data.open[date]}</TableCell>
                        <TableCell>{data.high[date]}</TableCell>
                        <TableCell>{data.low[date]}</TableCell>
                        <TableCell>{data.close[date]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default PredsDisplay;
