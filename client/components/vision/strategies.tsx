import React from 'react'
import { StrategiesInfluenced, Indicators, Reasons } from '@/types/vision.types'
import { Tent, Brain } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import StrategiesDisplay from '../preds-display/strategies-display';
interface StrategiesProps {
    strategies: StrategiesInfluenced;
    indicators: Indicators;
    reasons: Reasons;
}

const StrategiesCard = ({ strategies, indicators, reasons }: StrategiesProps) => {
    return (
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
                    <StrategiesDisplay mode='strategies' strategies={strategies} />
                </div>
                <div className="w-6/12 h-48 overflow-y-auto border rounded-sm shadow-sm">
                    <StrategiesDisplay mode='indicators' indicators={indicators} />
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
            <div className="max-h-64 overflow-y-auto border rounded-sm shadow-sm mt-4">
                <StrategiesDisplay mode='reasons' reasons={reasons} />
            </div>
        </div>
    )
}

export default StrategiesCard