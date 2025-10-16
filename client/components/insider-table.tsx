import React, { useState } from "react";
import WindowLayout from "./window-layout";
import DynamicTable from "./dynamic-table";
import { BookKey } from "lucide-react";

interface InsiderTransaction {
    ticker: string;
    insiderName: string;
    position: string;
    transactionType: "Buy" | "Sell";
    shares: number;
    percentChange: number;
    date: string;
}

// Mock data
const mockInsiderData = [
  { Ticker: "AAPL", Name: "Tim Cook", Position: "CEO", Action: "Buy", Price: "₹250.54", Shares: 1000, Change: "0.05", Date: "2025-10-15" },
  { Ticker: "MSFT", Name: "Satya Nadella", Position: "CEO", Action: "Sell", Price: "₹312.10", Shares: 500, Change: "-0.02", Date: "2025-10-14" },
  { Ticker: "GOOG", Name: "Sundar Pichai", Position: "CEO", Action: "Buy", Price: "₹2850.00", Shares: 200, Change: "0.01", Date: "2025-10-13" },
  { Ticker: "TSLA", Name: "Elon Musk", Position: "CEO", Action: "Sell", Price: "₹950.75", Shares: 1000, Change: "-0.03", Date: "2025-10-12" },
  { Ticker: "AMZN", Name: "Andy Jassy", Position: "CEO", Action: "Buy", Price: "₹3450.50", Shares: 350, Change: "0.02", Date: "2025-10-11" },
  { Ticker: "FB", Name: "Mark Zuckerberg", Position: "CEO", Action: "Buy", Price: "₹365.25", Shares: 150, Change: "0.015", Date: "2025-10-10" },
  { Ticker: "NFLX", Name: "Reed Hastings", Position: "Co-CEO", Action: "Sell", Price: "₹590.30", Shares: 200, Change: "-0.01", Date: "2025-10-09" },
  { Ticker: "NVDA", Name: "Jensen Huang", Position: "CEO", Action: "Buy", Price: "₹785.60", Shares: 400, Change: "0.03", Date: "2025-10-08" },
  { Ticker: "INTC", Name: "Patrick Gelsinger", Position: "CEO", Action: "Buy", Price: "₹58.75", Shares: 600, Change: "0.02", Date: "2025-10-07" },
  { Ticker: "ADBE", Name: "Shantanu Narayen", Position: "CEO", Action: "Sell", Price: "₹625.50", Shares: 100, Change: "-0.005", Date: "2025-10-06" },
  { Ticker: "ORCL", Name: "Safra Catz", Position: "CEO", Action: "Buy", Price: "₹95.30", Shares: 250, Change: "0.01", Date: "2025-10-05" },
  { Ticker: "CRM", Name: "Marc Benioff", Position: "Chair & CEO", Action: "Sell", Price: "₹280.40", Shares: 180, Change: "-0.02", Date: "2025-10-04" },
  { Ticker: "UBER", Name: "Dara Khosrowshahi", Position: "CEO", Action: "Buy", Price: "₹50.25", Shares: 300, Change: "0.03", Date: "2025-10-03" },
  { Ticker: "LYFT", Name: "David Risher", Position: "CEO", Action: "Sell", Price: "₹45.75", Shares: 150, Change: "-0.01", Date: "2025-10-02" },
  { Ticker: "TWTR", Name: "Elon Musk", Position: "Owner", Action: "Buy", Price: "₹65.20", Shares: 500, Change: "0.05", Date: "2025-10-01" },
  { Ticker: "SHOP", Name: "Tobias Lütke", Position: "CEO", Action: "Buy", Price: "₹1350.40", Shares: 120, Change: "0.02", Date: "2025-09-30" },
  { Ticker: "SQ", Name: "Jack Dorsey", Position: "CEO", Action: "Sell", Price: "₹245.60", Shares: 200, Change: "-0.01", Date: "2025-09-29" },
  { Ticker: "PYPL", Name: "Dan Schulman", Position: "CEO", Action: "Buy", Price: "₹280.10", Shares: 100, Change: "0.01", Date: "2025-09-28" },
  { Ticker: "BABA", Name: "Daniel Zhang", Position: "CEO", Action: "Sell", Price: "₹200.50", Shares: 400, Change: "-0.02", Date: "2025-09-27" },
  { Ticker: "JD", Name: "Lei Xu", Position: "CEO", Action: "Buy", Price: "₹95.80", Shares: 300, Change: "0.015", Date: "2025-09-26" },
];


const headers = ["Ticker", "Date", "Name", "Position", "Action", "Price", "Shares", "Change"]

const InsiderTable: React.FC = () => {
    return (
        <WindowLayout title="Insiders Transactions" icon={BookKey}>
            <DynamicTable title="Insiders Transaction" headers={headers} data={mockInsiderData} />
        </WindowLayout>
    );
};

export default InsiderTable;
