import React from 'react'
import { Shield, Weight, Pyramid } from "lucide-react";
import SmallCard from '../ui/small-card';
import PredsDisplay from '../preds-display/preds-display';
import { PredictionData } from '@/types/vision.types';

interface ModelCardProps {
    sampleData: PredictionData;
}

const ModelCard = ({ sampleData }: ModelCardProps) => {
    return (
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
    )
}

export default ModelCard