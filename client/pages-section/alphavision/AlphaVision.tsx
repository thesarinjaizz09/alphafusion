import React from 'react'
import Charts from "@/components/charts/charts"
import { ConfigurationCard, FeedbackCard, StrategiesCard, ModelCard, PredictionCard, TopbarCard } from '@/components/vision';
import { StockGeneralItem, Config, Indicators, PredictionData, Reasons, StrategiesInfluenced } from '@/types/vision.types';

interface AlphaVisionPageProps {
    stockGeneralData: StockGeneralItem[];
    sampleData: PredictionData;
    config: Config;
    reasons: Reasons;
    indicators: Indicators;
    strategiesInfluenced: StrategiesInfluenced;
}

const AlphaVisionPage = ({
    stockGeneralData,
    sampleData,
    config,
    reasons,
    indicators,
    strategiesInfluenced
} : AlphaVisionPageProps) => {
    return (
        <div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0 mt-5">
            {/* Top Bar */}
            <TopbarCard stockGeneralData={stockGeneralData} />

            {/* Charts & Predictions */}
            <div className="w-full flex space-x-2">
                <Charts />
                <PredictionCard sampleData={sampleData} />
            </div>

            {/* Strategies & Model Metrics */}
            <div className="w-full grid grid-cols-12 gap-2">
                <StrategiesCard strategies={strategiesInfluenced} indicators={indicators} reasons={reasons} />
                <ModelCard sampleData={sampleData} />
            </div>


            {/* Model Configurtaion & Feedback */}
            <div className="w-full grid grid-cols-12 gap-2">
                <ConfigurationCard config={config} />
                <FeedbackCard />
            </div>

            <div className="w-full border p-2 rounded-sm text-center bg-white border border-gray-200 shadow-lg">
                <blockquote className="italic text-xs">
                    AlphaVision can make mistakes; use forecasts responsibly and review terms and conditions before making decisions.
                </blockquote>
            </div>
        </div>
    )
}

export default AlphaVisionPage