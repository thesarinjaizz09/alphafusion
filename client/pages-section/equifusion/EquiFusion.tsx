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


            {/* GRID SECTION */}
            {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#16223B]/80 aspect-video rounded-2xl transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 hover:border hover:border-[#E3B341]/30"
                    />
                ))}
            </div> */}

            {/* LARGE CONTENT SECTION */}
            {/* <div className="bg-[#0D1426]/90 min-h-[100vh] flex-1 rounded-2xl md:min-h-min transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 hover:border hover:border-[#E3B341]/30" /> */}
        </div >
    )
}

export default EquiFusionPage