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
    <div className="max-h-64 overflow-y-auto border rounded-lg mt-5">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="sticky top-0 bg-white/95 backdrop-blur-sm z-20">
              Reasons
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reasons.map((reason, idx) => (
            <TableRow key={idx}>
              <TableCell className="whitespace-pre-wrap">{reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReasonsDisplay;
