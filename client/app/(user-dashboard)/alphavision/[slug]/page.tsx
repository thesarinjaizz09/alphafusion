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

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function AlphaVisionPage({ params }: PageProps) {
    const { slug } = await params
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
                <div className="w-full flex items-center justify-between">
                    <div className="w-3/12">
                        <Combobox mode="ticker" />
                        <div className="mt-2 flex items-center justify-between">
                            <Combobox mode="exchange" />
                            <Combobox mode="timeframe" />
                        </div>
                    </div>
                    <div className="ml-2 w-7/12 rounded-lg h-[80px] border flex items-center justify-between px-5">
                        <div className="">
                            <p className="font-semibold text-md text-black tracking-tight">Price</p>
                            <p className="text-xs text-zinc-600">₹ 200.09</p>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <div className="">
                            <p className="font-semibold text-md text-black tracking-tight">Market Cap</p>
                            <p className="text-xs text-zinc-600">₹ 200.09</p>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <div className="">
                            <p className="font-semibold text-md text-black tracking-tight">Volume (24H)</p>
                            <p className="text-xs text-zinc-600">₹ 200.09</p>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <div className="">
                            <p className="font-semibold text-md text-black tracking-tight">24h Change</p>
                            <p className="text-xs text-zinc-600">₹ 200.09</p>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <div className="">
                            <p className="font-semibold text-md text-black tracking-tight">Bid/Ask</p>
                            <p className="text-xs text-zinc-600">₹ 200.09</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-2/12 ml-2 text-zinc-700 items-center justify-center">
                        <Button variant="outline" className="h-[30px] p-4 w-full font-normal cursor-pointer">
                            {/* <Loader2Icon className="animate-spin" /> */}
                            <Bot />Run AlphaVision
                        </Button>
                        <Button variant="outline" className="h-[30px] p-4 mt-2 w-full font-normal cursor-pointer">
                            {/* <Loader2Icon className="animate-spin" /> */}
                            <Braces />Run Datafetcher
                        </Button>
                    </div>
                </div>
                <div className="w-full flex">
                    <Charts />

                    <div className="w-5/12 ml-2">
                        <div className="w-full rounded-lg h-fit border flex flex-col items-start justify-center p-3">
                            <h3 className="text-xl font-semibold tracking-tight">
                                AlphaVision
                            </h3>
                            <p className="text-sm text-gray-600">
                                The predictions of the stock's next OHLC values for the next respective timeframe.
                            </p>
                            <div className="w-full flex items-center justify-between mt-3">
                                <div className="">
                                    <p className="font-semibold text-md text-slate-600">Open</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 data-[orientation=vertical]:h-4"
                                />
                                <div className="">
                                    <p className="font-semibold text-md text-slate-600">High</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 data-[orientation=vertical]:h-4"
                                />
                                <div className="">
                                    <p className="font-semibold text-md text-slate-600">Low</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 data-[orientation=vertical]:h-4"
                                />
                                <div className="">
                                    <p className="font-semibold text-md text-slate-600">Close</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-fit flex mt-2 items-center justify-between">
                            <div style={{
                                width: '49%'
                            }} className="w-6/12 border rounded-lg p-3">
                                <h3 className="text-md font-semibold tracking-tight">
                                    Generated At
                                </h3>
                                <p className="text-sm text-gray-600">
                                    2025-09-01 16:40:12.45
                                </p>
                            </div>
                            <div style={{
                                width: '49%'
                            }} className="w-6/12 border rounded-lg p-3">
                                <h3 className="text-md font-semibold tracking-tight">
                                    Generated For
                                </h3>
                                <p className="text-sm text-gray-600">
                                    2025-09-01 16:40:12.45
                                </p>
                            </div>
                        </div>
                        <div className="w-full rounded-lg h-fit border flex flex-col items-start justify-center p-3 mt-2">
                            <h3 className="text-xl font-semibold tracking-tight">
                                Indicators
                            </h3>
                            <p className="text-sm text-gray-600">
                                The indicators derived from the stock's historical data of the respective timeframe.
                            </p>
                            <div className="w-full flex items-center justify-between mt-3">
                                <div className="border p-2 rounded-md">
                                    <p className="font-semibold text-sm text-slate-600">EMA_12</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <div className="border p-2 rounded-md">
                                    <p className="font-semibold text-sm text-slate-600">EMA_16</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <div className="border p-2 rounded-md">
                                    <p className="font-semibold text-sm text-slate-600">SMA_20</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <div className="border p-2 rounded-md">
                                    <p className="font-semibold text-sm text-slate-600">MACD</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <div className="border p-2 rounded-md">
                                    <p className="font-semibold text-sm text-slate-600">RSI_14</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between mt-3">
                                <div className="border p-2 rounded-md">
                                    <p className="font-semibold text-sm text-slate-600">BB</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <div className="border p-2 rounded-md">
                                    <p className="font-semibold text-sm text-slate-600">BB_PCT</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <div className="border p-2 rounded-md">
                                    <p className="font-semibold text-sm text-slate-600">ATR_14</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <div className="border p-2 rounded-md">
                                    <p className="font-semibold text-sm text-slate-600">OBV</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                                <div className="border p-2 rounded-md">
                                    <p className="font-semibold text-sm text-slate-600">RETR</p>
                                    <p className="text-xs text-zinc-600">₹ 200.09</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                </div>
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
            </div>
        </>
    )
}
