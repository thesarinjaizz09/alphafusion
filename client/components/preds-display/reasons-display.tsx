import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReasonsDisplayProps {
  reasons: string[];
}

const ReasonsDisplay: React.FC<ReasonsDisplayProps> = ({ reasons }) => {
  return (
    <div className="max-h-64 overflow-y-auto border rounded-sm shadow-sm mt-4">
      <Table className="min-w-full border border-gray-200 text-xs">
        <TableHeader>
          <TableRow className="bg-violet-200 sticky top-0 z-20">
            <TableHead className="px-4 py-2 text-gray-900 text-left">
              Influential Reasons
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reasons.map((reason, idx) => (
            <TableRow
              key={idx}
              className={`text-gray-800 ${
                idx % 2 === 0 ? "bg-white" : "bg-violet-50"
              } hover:bg-violet-100 transition-colors`}
            >
              <TableCell className="px-4 py-2 whitespace-pre-wrap">{reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReasonsDisplay;
