"use client";

import { Shapes } from "lucide-react";
import WindowLayout from "./window-layout";
import DynamicTable from "./dynamic-table";

const EquitiesIndicesBox = () => {
    // --- Data ---
    const topGainersData = [
        { Symbol: "INFY", Price: "₹1,543.20", "Change %": "+3.42%", Volume: "1.2M", "52W High/Low": "₹1650 / ₹1210", "P/E": "27.4", "Dividend Yield": "2.1%" },
        { Symbol: "TCS", Price: "₹3,545.50", "Change %": "+2.81%", Volume: "1.8M", "52W High/Low": "₹3670 / ₹3120", "P/E": "29.2", "Dividend Yield": "1.4%" },
        { Symbol: "HDFCBANK", Price: "₹1,570.80", "Change %": "+1.92%", Volume: "2.3M", "52W High/Low": "₹1750 / ₹1400", "P/E": "22.8", "Dividend Yield": "1.1%" },
        { Symbol: "RELIANCE", Price: "₹2,765.30", "Change %": "+1.35%", Volume: "3.1M", "52W High/Low": "₹2920 / ₹2310", "P/E": "23.1", "Dividend Yield": "0.9%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
        { Symbol: "WIPRO", Price: "₹498.20", "Change %": "+1.12%", Volume: "1.9M", "52W High/Low": "₹530 / ₹395", "P/E": "18.4", "Dividend Yield": "2.3%" },
    ];

    const headers = [
        "Symbol",
        "Price",
        "Change %",
        "Volume",
        "52W High/Low",
        "P/E",
        "Dividend Yield",
    ];

    return (
        <WindowLayout title="Equities & Indices" icon={Shapes} max={true} height="515px">
            <DynamicTable
                headers={headers}
                data={topGainersData}
                title="Exchange's Equities & Indices"
                rowsPerPageProps={10}
            />
        </WindowLayout>
    );
};

export default EquitiesIndicesBox;
