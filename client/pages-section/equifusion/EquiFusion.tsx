"use client"

import React from 'react'

import ExchangeInfoBox from '@/components/exchange-info-box'
import GlobalIndicesSummary from '@/components/global-indices-summary'
import TradesharkSuggestions from '@/components/tradeshark-suggestions'
import MoversLosersBox from '@/components/movers-losers'
import MarketOrbitCloud from '@/components/market-orbit-cloud'

const EquiFusionPage = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-[#050914] text-[#F5F6FA] min-h-screen">
            {/* TOP SUMMARY BOX */}
            <div className="grid grid-cols-1">
                <GlobalIndicesSummary selectedExchange="NASDAQ" />
            </div>

            {/* ROW 1 EXCHANGE & TRADESHARK INSIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ExchangeInfoBox selectedExchange='NASDAQ' />
                <TradesharkSuggestions selectedExchange="NASDAQ" />
            </div>

            {/* ROW 2 MARKET MOVERS & HEATMAP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MoversLosersBox selectedExchange='NASDAQ' />
                <MarketOrbitCloud />
            </div>
        </div >
    )
}

export default EquiFusionPage