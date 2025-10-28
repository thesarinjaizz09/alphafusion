'use client'
import React, { useState } from 'react'
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox"
import BadgeCards from "@/components/badge-cards/badge-cards"
import { tickers, horizons, timeframes } from "@/data/stocks.parameters"
import { StockGeneralItem } from '@/types/vision.types';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TopbarCardProps {
    stockGeneralData: StockGeneralItem[];
}

const TopbarCard = ({ stockGeneralData }: TopbarCardProps) => {
    const [config, setConfig] = useState({
        candles: 720,
        valHorizon: 72,
        lstmEpochs: 100,
        lstmBatch: 32,
    });

    const handleChange = (field: keyof typeof config, value: number) => {
        setConfig((prev) => ({ ...prev, [field]: value }));
    };

    return (
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
                            <div key={index}>
                                <BadgeCards param={data.param} value={data.value} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex flex-col text-zinc-900 items-center justify-center col-span-1 h-full">
                <Dialog>
                    <form>
                        <DialogTrigger asChild className='w-full cols-span-1 h-full'>
                            <Button variant="outline" className='h-full shadow-lg w-full font-normal cursor-pointer rounded-sm bg-white border'>
                                <Bot className="text-gray-900" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px] rounded-sm px-3 shadow-lg">
                            <DialogHeader>
                                <DialogTitle>Run AlphaVision</DialogTitle>
                                <DialogDescription className='text-xs text-gray-600 '>
                                    Configure the model to tailor predictions.
                                    Adjust parameters to fine-tune performance or leave them at defaults for a standard forecast.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 grid-cols-2 mt-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="candles" className='text-xs font-medium'>Candles</Label>
                                    <Input
                                        id="candles"
                                        type="number"
                                        value={config.candles}
                                        onChange={(e) => handleChange("candles", Number(e.target.value))}
                                        className='text-xs'
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="valHorizon" className='text-xs font-medium'>Validation Horizon</Label>
                                    <Input
                                        id="valHorizon"
                                        type="number"
                                        value={config.valHorizon}
                                        onChange={(e) => handleChange("valHorizon", Number(e.target.value))}
                                        className='text-xs'
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="lstmEpochs" className='text-xs font-medium'>LSTM Epochs</Label>
                                    <Input
                                        id="lstmEpochs"
                                        type="number"
                                        value={config.lstmEpochs}
                                        onChange={(e) => handleChange("lstmEpochs", Number(e.target.value))}
                                        className='text-xs'
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="lstmBatch" className='text-xs font-medium'>LSTM Batch Size</Label>
                                    <Input
                                        id="lstmBatch"
                                        type="number"
                                        value={config.lstmBatch}
                                        onChange={(e) => handleChange("lstmBatch", Number(e.target.value))}
                                        className='text-xs'
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" className='cursor-pointer rounded-sm  text-xs'>Cancel</Button>
                                </DialogClose>
                                <Button type="submit" className='bg-violet-200 text-black cursor-pointer rounded-sm  text-xs'>Run Vision</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>
        </div>
    )
}

export default TopbarCard