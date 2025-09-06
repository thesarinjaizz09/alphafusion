import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Combobox } from "@/components/ui/combobox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import SmallCard from "@/components/ui/small-card";
import { Loader2Icon, Bot, Braces, ThumbsUp, ThumbsDown, Flag, Target, TrendingUpDown, Tent, Brain, ChartSpline, Shield, Weight, Variable, Pyramid, Cog } from "lucide-react"
import { Button } from "@/components/ui/button"
import Charts from "@/components/charts/charts"
import { tickers, horizons, timeframes } from "@/data/stocks.parameters"
import BadgeCards from "@/components/badge-cards/badge-cards"
import PredsDisplay, { PredictionData } from "@/components/preds-display/preds-display"
import ReasonsDisplay from "@/components/preds-display/reasons-display"
import FeedbackCard from "@/components/vision/feedback";
interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function AlphaVisionPage({ params }: PageProps) {
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

    const sampleData: PredictionData = {
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
        <div className="bg-violet-300 rounded-md">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#" className="text-black">
                                    AlphaFusion
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>AlphaVision</BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{slug === 'stocks' ? 'Stocks AlphaVision' : 'Crypto AlphaVision'}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0 mt-5">
                {/* Top Bar */}
                <div className="grid grid-cols-12 space-x-2">
                    <div className="col-span-3 h-full flex flex-col items-center justify-between space-y-1">
                        <Combobox mode="Ticker" span="full" items={tickers} />
                        <div className="flex items-center justify-between w-full space-x-1">
                            <Combobox mode="Timeframe" span="third" items={timeframes} />
                            <Combobox mode="Cn" span="oneth" items={horizons} />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 col-span-8 h-full space-x-2 ">
                        {
                            stockGeneralData.map((data, index) => {
                                if (index == stockGeneralData.length - 1) {
                                    return (
                                        <div key={index}>
                                            <BadgeCards param={data.param} value={data.value} />
                                        </div>
                                    )
                                }
                                return (
                                    <>
                                        <BadgeCards param={data.param} value={data.value} />
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col text-zinc-900 items-center justify-center">
                        <Button variant="outline" className="h-full shadow-lg w-full font-normal cursor-pointer rounded-sm bg-gray-100 border-none">
                            <Bot className="text-gray-900" />
                        </Button>
                    </div>
                </div>

                {/* Charts & Predictions */}
                <div className="w-full flex space-x-2">
                    <Charts />
                    <div className="w-5/12">
                        <div className="w-full rounded-sm h-full border flex flex-col items-start justify-between px-2 py-3  bg-white border border-gray-200 shadow-lg">
                            <div className="w-full flex flex-col items-start justify-center">
                                <h3 className="text-sm font-semibold tracking-tight flex items-center bg-violet-200 rounded-sm p-1 px-2 text-gray-900 w-full">
                                    <Target className="w-4 mr-2" /> Vision Overview
                                </h3>
                                <p className="text-xs text-gray-600 mt-2">
                                    Predictions of AAPL’s market momentum and trade signals derived from its forecasted values.
                                </p>
                                <div className="mt-4 w-full h-fit flex items-center justify-between">
                                    <SmallCard title="Generated at" value="2025-09-06" />
                                    <SmallCard title="Deviation in" value="5.08%" />
                                </div>
                                <div className="w-full h-fit mt-2 flex items-center justify-between">
                                    <SmallCard title="Momentum at" value="BEARISH" />
                                    <SmallCard title="Momentum for" value="STRONG_SELL" />
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-start justify-center mt-5">
                                <h3 className="w-fit text-sm font-semibold tracking-tight flex items-center bg-violet-200 rounded-sm p-1 px-2 text-gray-900 w-full">
                                    <ChartSpline className="w-4 mr-2" />Vision Forecast
                                </h3>
                                <p className="text-xs text-gray-600 mt-2">
                                    Projected OHLC values of AAPL for the upcoming timeframe and extended forecast horizons.
                                </p>
                                <div className="w-full bg-gray-100 shadow-sm rounded-sm overflow-hidden mt-4 max-h-40 overflow-y-auto scrollbar-none">
                                    <PredsDisplay data={sampleData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Strategies & Model Metrics */}
                <div className="w-full grid grid-cols-12 gap-2">
                    {/* Left Column */}
                    <div className="col-span-7 bg-white border border-gray-200 shadow-lg rounded-sm px-2 py-3 flex flex-col">
                        {/* Your exact inner content stays the same */}
                        <div className="inline-block w-full">
                            <h3 className="text-sm font-semibold tracking-tight flex items-center bg-violet-200 rounded-sm p-1 px-2 text-gray-900">
                                <Tent className="w-4 mr-2" /> Strategies & Indicators
                            </h3>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                            The strategies and indicators employed by the model to forecast outcomes, detect momentum, and provide trade signals.
                        </p>
                        <div className="w-full flex space-x-2 mt-4">
                            <div className="w-6/12 h-48 overflow-y-auto border rounded-sm shadow-sm">
                                <Table className="min-w-full border border-gray-200 text-xs">
                                    <TableHeader>
                                        <TableRow className="bg-violet-200 sticky top-0 z-20">
                                            <TableHead className="px-4 py-2 text-gray-900 text-left">
                                                Influential Strategies
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {strategiesInfluenced.map((reason, idx) => (
                                            <TableRow
                                                key={idx}
                                                className={`text-gray-800 ${idx % 2 === 0 ? "bg-white" : "bg-violet-50"
                                                    } hover:bg-violet-100 transition-colors`}
                                            >
                                                <TableCell className="px-4 py-2 whitespace-pre-wrap">{reason}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="w-6/12 h-48 overflow-y-auto border rounded-sm shadow-sm">
                                <Table className="min-w-full border border-gray-200 text-xs">
                                    <TableHeader>
                                        <TableRow className="bg-violet-200 sticky top-0 z-20">
                                            <TableHead className="px-4 py-2 text-gray-900 text-left">
                                                Computed Indicators
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {indicators.map((reason, idx) => (
                                            <TableRow
                                                key={idx}
                                                className={`text-gray-800 ${idx % 2 === 0 ? "bg-white" : "bg-violet-50"
                                                    } hover:bg-violet-100 transition-colors`}
                                            >
                                                <TableCell className="px-4 py-2 whitespace-pre-wrap">{reason}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <div className="inline-block mt-5 w-full">
                            <h3 className="text-sm font-semibold tracking-tight flex items-center bg-violet-200 rounded-sm p-1 px-2 text-gray-900">
                                <Brain className="w-4 mr-2" /> Reasoning
                            </h3>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                            The reasons identified and articulated by the model outlining why the respective momentum and trade signal were evaluated
                        </p>
                        <ReasonsDisplay reasons={reasons} />
                    </div>

                    {/* Right Column */}
                    <div className="col-span-5 bg-white border border-gray-200 shadow-lg rounded-sm px-2 py-3 flex flex-col">
                        {/* Keep all content the same */}
                        <div className="flex flex-col">
                            <div className="inline-block w-full">
                                <h3 className="text-sm font-semibold tracking-tight flex items-center bg-violet-200 rounded-sm p-1 px-2 text-gray-900">
                                    <Shield className="w-4 mr-2" /> Model Confidence
                                </h3>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                                The model’s evaluated confidence and error in its forecasted OHLC values, momentum shifts, deviations, and trade signals.
                            </p>
                            <div className="mt-4 w-full flex items-center justify-between">
                                <SmallCard title="Confidence" value="80%" />
                                <SmallCard title="Error" value="+-5%" />
                            </div>
                        </div>

                        <div className="flex flex-col mt-5">
                            <h3 className="text-sm font-semibold tracking-tight flex items-center bg-violet-200 rounded-sm p-1 px-2 text-gray-900">
                                <Weight className="w-4 mr-2" /> Model Weights
                            </h3>
                            <p className="text-xs text-gray-600 mt-2">
                                Dynamic weights reflecting the influence of each model’s predictions on the final forecast.
                            </p>
                            <div className="w-full bg-gray-100 shadow-sm rounded-sm overflow-hidden mt-4 max-h-40 overflow-y-auto scrollbar-none">
                                <PredsDisplay data={sampleData} />
                            </div>
                        </div>

                        <div className="flex flex-col mt-5">
                            <h3 className="text-sm font-semibold tracking-tight flex items-center bg-violet-200 rounded-sm p-1 px-2 text-gray-900">
                                <Pyramid className="w-4 mr-2" /> Model Metrics
                            </h3>
                            <p className="text-xs text-gray-600 mt-2">
                                Metrics like MAE, RMSE, and MAPE% provided for each model errors are adjusted for accurate predictions.
                            </p>
                            <div className="w-full bg-gray-100 shadow-sm rounded-sm overflow-hidden mt-4 max-h-40 overflow-y-auto scrollbar-none">
                                <PredsDisplay data={sampleData} />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Model Configurtaion & Feedback */}
                <div className="w-full grid grid-cols-12 gap-2">
                    <div className="col-span-7 bg-white border border-gray-200 shadow-lg rounded-sm px-2 py-3 flex flex-col">
                        <div className="inline-block w-full">
                            <h3 className="text-sm font-semibold tracking-tight flex items-center bg-violet-200 rounded-sm p-1 px-2 text-gray-900">
                                <Cog className="w-4 mr-2" /> Configuration
                            </h3>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                            Configuration settings and dependent variables of the model that greatly affect forecast outcomes and signal values.
                        </p>
                        <div className="grid grid-cols-4 w-full mt-4 gap-2">
                            {Object.entries(config).map(([key, value]) => (
                                <SmallCard title={key} value={value.toString()} width="100%" />
                            ))}
                        </div>
                    </div>
                    <FeedbackCard />
                </div>

                <div className="w-full border p-2 rounded-sm text-center bg-white border border-gray-200 shadow-lg">
                    <blockquote className="italic text-xs">
                        AlphaVision can make mistakes; use forecasts responsibly and review terms and conditions before making decisions.
                    </blockquote>
                </div>
            </div>
        </div>
    )
}



