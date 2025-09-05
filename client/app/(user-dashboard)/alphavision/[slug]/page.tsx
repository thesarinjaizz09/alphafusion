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
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Loader2Icon, Bot, Braces } from "lucide-react"
import { Button } from "@/components/ui/button"
import Charts from "@/components/charts/charts"
import { tickers, horizons, timeframes } from "@/data/stocks.parameters"
import BadgeCards from "@/components/badge-cards/badge-cards"
import PredsDisplay, { PredictionData } from "@/components/preds-display/preds-display"
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
            param: 'Market Cap',
            value: "₹ 100.21B"
        },
        {
            param: 'Volume (24H)',
            value: "2003d"
        },
        {
            param: '24H Change',
            value: "₹ 23.21"
        },
        {
            param: 'Bid/Ask',
            value: "₹ 250.36"
        },

    ]

    const sampleData: PredictionData = {
        open: {
            "2025-09-06 04:00:00": 219.2,
            "2025-09-07 04:00:00": 220.1,
            "2025-09-08 04:00:00": 218.7,
            "2025-09-09 04:00:00": 218.7,
            "2025-09-10 04:00:00": 218.7,
        },
        high: {
            "2025-09-06 04:00:00": 221.3,
            "2025-09-07 04:00:00": 222.0,
            "2025-09-08 04:00:00": 219.5,
            "2025-09-09 04:00:00": 219.5,
            "2025-09-10 04:00:00": 219.5,
        },
        low: {
            "2025-09-06 04:00:00": 218.1,
            "2025-09-07 04:00:00": 219.4,
            "2025-09-08 04:00:00": 217.6,
            "2025-09-09 04:00:00": 217.6,
            "2025-09-10 04:00:00": 217.6,
        },
        close: {
            "2025-09-06 04:00:00": 220.0,
            "2025-09-07 04:00:00": 221.2,
            "2025-09-09 04:00:00": 221.2,
            "2025-09-10 04:00:00": 221.2,
            "2025-09-08 04:00:00": 218.9,
        },
    };

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
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
            <div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Top Bar */}
                <div className="w-full flex items-center justify-between">
                    <div className="w-3/12">
                        <Combobox mode="Ticker" span="full" items={tickers} />
                        <div className="mt-2 flex items-center justify-between">
                            <Combobox mode="Timeframe" span="half" items={timeframes} />
                            <Combobox mode="Horizon" span="half" items={horizons} />
                        </div>
                    </div>
                    <div className="ml-2 w-7/12 rounded-md h-[81px] border flex items-center justify-between px-5">
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
                                        <Separator orientation="vertical" style={{
                                            height: 30
                                        }} />
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col w-2/12 ml-2 text-zinc-900 items-center justify-center">
                        <Button variant="outline" className="h-[36px] shadow-none w-full font-normal cursor-pointer rounded-sm">
                            {/* <Loader2Icon className="animate-spin" /> */}
                            <Bot />Run Vision-v1
                        </Button>
                        <Button variant="outline" className="h-[36px] shadow-none mt-2 w-full font-normal cursor-pointer rounded-sm">
                            {/* <Loader2Icon className="animate-spin" /> */}
                            <Braces />Run Vision-v2
                        </Button>
                    </div>
                </div>

                {/* Charts & Predictions */}
                <div className="w-full flex">
                    <Charts />
                    <div className="w-5/12 ml-2">
                        <div className="w-full h-fit flex items-center justify-between">
                            <div style={{
                                width: '49%'
                            }} className="w-6/12 border rounded-md p-3">
                                <h3 className="text-md font-semibold tracking-tight">
                                    Generated At
                                </h3>
                                <p className="text-sm text-gray-600">
                                    2025-09-01 16:40:12.45
                                </p>
                            </div>
                            <div style={{
                                width: '49%'
                            }} className="w-6/12 border rounded-md p-3">
                                <h3 className="text-md font-semibold tracking-tight">
                                    Generated For
                                </h3>
                                <p className="text-sm text-gray-600">
                                    AAPL_1D_+5CN
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-fit mt-2 flex items-center justify-between">
                            <div style={{
                                width: '49%'
                            }} className="w-6/12 border rounded-md p-3">
                                <h3 className="text-md font-semibold tracking-tight">
                                    Momentum at
                                </h3>
                                <p className="text-sm text-gray-600">
                                    BEARISH - PLUNGING
                                </p>
                            </div>
                            <div style={{
                                width: '49%'
                            }} className="w-6/12 border rounded-md p-3">
                                <h3 className="text-md font-semibold tracking-tight">
                                    Momentum to
                                </h3>
                                <p className="text-sm text-gray-600">
                                    STRONG_SELL
                                </p>
                            </div>
                        </div>
                        <div className="w-full rounded-md mt-2 h-fit border flex flex-col items-start justify-center p-3">
                            <h3 className="text-xl font-semibold tracking-tight">
                                AlphaVision
                            </h3>
                            <p className="text-sm text-gray-600">
                                Predictions of AAPL's OHLC values for the next respective timeframe and horizons.
                            </p>
                            <div className="w-full border rounded-md overflow-hidden mt-3 max-h-47 overflow-y-auto">
                                <PredsDisplay data={sampleData} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
