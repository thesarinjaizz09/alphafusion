import React from 'react'
import { ChartSpline, Target } from "lucide-react";
import SmallCard from '../ui/small-card';
import PredsDisplay from '../preds-display/preds-display';
import { PredictionData } from '@/types/vision.types';

interface PredictionCardProps {
    sampleData: PredictionData;
}

const PredictionCard = ({ sampleData }: PredictionCardProps) => {
    return (
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
    )
}

export default PredictionCard