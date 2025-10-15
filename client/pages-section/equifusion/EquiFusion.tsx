"use client"

import React from 'react'

import ExchangeInfoBox from '@/components/exchange-info-box'
import GlobalIndicesSummary from '@/components/global-indices-summary'
import TradesharkSuggestions from '@/components/tradeshark-suggestions'
import MoversLosersBox from '@/components/movers-losers'
import WatchlistBox from '@/components/watchlist-box'
import EquitiesIndicesBox from '@/components/equities-indices-box'
import NewsBox from '@/components/news-box'
import InstitutionalFlow from '@/components/institutional-flow'
import CandlestickPanel from '@/components/candlestick-panel'
import SectorHeatMap from '@/components/sector-heatmap'

const EquiFusionPage = () => {
    return (
        <div className="flex flex-1 flex-col gap-3 p-4 bg-[#050914] text-[#F5F6FA] min-h-screen">
            {/* TOP SUMMARY BOX */}
            <div className="grid grid-cols-1">
                <GlobalIndicesSummary selectedExchange="NASDAQ" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 auto-rows-min">
                {/* COL 1 */}
                <div className="flex flex-col col-span-2 gap-3">
                    <ExchangeInfoBox selectedExchange='NASDAQ' />
                    <MoversLosersBox />
                    <EquitiesIndicesBox />
                    <CandlestickPanel />
                    <InstitutionalFlow />
                </div>
                {/* COL 2 */}
                <div className="flex flex-col gap-3">
                    <TradesharkSuggestions />
                    <SectorHeatMap />
                    <NewsBox />
                    <WatchlistBox />
                </div>
            </div>


        </div >
    )
}

export default EquiFusionPage