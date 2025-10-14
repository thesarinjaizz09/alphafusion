import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"
import AlphaVisionPage from "@/pages-section/alphavision/AlphaVision"
import PanelTopbar from "@/components/panel-topbar"

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function AlphaVision({ params }: PageProps) {
    const { slug } = await params

    const stockGeneralData = [
        {
            param: 'Price',
            value: "₹ 253.21"
        },
        {
            param: 'Capital',
            value: "₹ 100.21B"
        },
        {
            param: 'Volume',
            value: "2003d"
        },
        {
            param: 'Change',
            value: "₹ 23.21"
        },
        {
            param: 'Bid/Ask',
            value: "₹ 250.36"
        },

    ]

    const sampleData = {
        open: {
            "2025-09-06": 219.2,
            "2025-09-07": 220.1,
            "2025-09-08": 218.7,
            "2025-09-09": 218.7,
            "2025-09-10": 218.7,
            "2025-09-11": 218.7,
            "2025-09-12": 218.7,
        },
        high: {
            "2025-09-06": 221.3,
            "2025-09-07": 222.0,
            "2025-09-08": 219.5,
            "2025-09-09": 219.5,
            "2025-09-10": 219.5,
            "2025-09-11": 219.5,
            "2025-09-12": 219.5,
        },
        low: {
            "2025-09-06": 218.1,
            "2025-09-07": 219.4,
            "2025-09-08": 217.6,
            "2025-09-09": 217.6,
            "2025-09-10": 217.6,
            "2025-09-11": 217.6,
            "2025-09-12": 217.6,
        },
        close: {
            "2025-09-06": 220.0,
            "2025-09-07": 221.2,
            "2025-09-09": 221.2,
            "2025-09-10": 221.2,
            "2025-09-08": 218.9,
            "2025-09-01": 218.9,
            "2025-09-02": 218.9,
        },
    };

    const config = {
        ticker: "GOOG",
        timeframe: "1d",
        candles: 720,
        val_horizon: 72,
        for_horizon: 10,
        use_prophet: true,
        use_xgboost: true,
        use_lstm: true,
        lstm_epochs: 1,
        lstm_batch: 32,
        output_dir: "outputs",
        quiet: false
    };

    const reasons = [
        "Ensemble expects a fall of -7.51% (from 234.09 \u2192    216.50) \u2014 directional bearish signal (exceeds \u00b11% threshold).",
        "Predicted candle indicates a strong bullish body \u2014 expected upward  momentum.",
        "Model ensemble predicts next close 222.87 < current 234.09 (-4.79%) \u2014 supports bearish bias.",
        "Price is within 0.00 of Fibonacci 0% (swing high 234.09) \u2014 strong resistance; likely rejection.",
        "Ensemble predicts bearish move of 4.79% (from 234.09 to 222.87).",
        "Next-candle forecast: O:218.87 H:223.38 L:218.25 C:222.87."
    ]

    const indicators = [
        "EMA_12",
        "EMA_26",
        "SMA_20",
        "MACD",
        "MACD_SIGNAL",
        "MACD_HIST",
        "RSI_14",
        "BB_UPPER",
        "BB_LOWER",
        "BB_PCT",
        "ATR_14",
        "RETURNS"
    ]

    const strategiesInfluenced = [
        "Momentum Analytics",
        "Candle Analytics",
        "Trend Analytics",
        "Fibonacci Tracement",
        "Scalping Helper"
    ]

    return (
        <div className="rounded-md">
            <PanelTopbar suite="Boards" service="AlphaVision" />
            <AlphaVisionPage config={config} stockGeneralData={stockGeneralData} sampleData={sampleData} reasons={reasons} indicators={indicators} strategiesInfluenced={strategiesInfluenced} />
        </div>
    )
}



