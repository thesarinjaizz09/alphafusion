import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reasons, StrategiesInfluenced, Indicators } from "@/types/vision.types";

interface StrategiesDisplayProps {
  reasons?: Reasons;
  strategies?: StrategiesInfluenced;
  indicators?: Indicators;
  mode: "reasons" | "strategies" | "indicators";
}

const StrategiesDisplay = ({ reasons, strategies, indicators, mode }: StrategiesDisplayProps) => {
  return (
      <Table className="min-w-full border border-gray-200 text-xs">
        <TableHeader>
          <TableRow className="bg-violet-200 sticky top-0 z-20">
            <TableHead className="px-4 py-2 text-gray-900 text-left">
              {mode === "reasons" ? "Key Reasons" : mode === "strategies" ? "Key Strategies" : "Key Indicators"}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mode === "reasons" && reasons && reasons.map((reason, idx) => (
            <TableRow
              key={idx}
              className={`text-gray-800 ${
                idx % 2 === 0 ? "bg-white" : "bg-violet-50"
              } hover:bg-violet-100 transition-colors`}
            >
              <TableCell className="px-4 py-2 whitespace-pre-wrap">{reason}</TableCell>
            </TableRow>
          ))}
          {mode === "strategies" && strategies && strategies.map((strategy, idx) => (
            <TableRow
              key={idx}
              className={`text-gray-800 ${
                idx % 2 === 0 ? "bg-white" : "bg-violet-50"
              } hover:bg-violet-100 transition-colors`}
            >
              <TableCell className="px-4 py-2 whitespace-pre-wrap">{strategy}</TableCell>
            </TableRow>
          ))}
          {mode === "indicators" && indicators && indicators.map((indicator, idx) => (
            <TableRow
              key={idx}
              className={`text-gray-800 ${
                idx % 2 === 0 ? "bg-white" : "bg-violet-50"
              } hover:bg-violet-100 transition-colors`}
            >
              <TableCell className="px-4 py-2 whitespace-pre-wrap">{indicator}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
};

export default StrategiesDisplay;
