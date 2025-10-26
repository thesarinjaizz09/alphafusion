"use client"

import ExchangeInfoBox from '@/components/exchange-info-box'
import GlobalIndicesSummary from '@/components/global-indices-summary'
import TradesharkSuggestions from '@/components/tradeshark-suggestions'
import MoversLosersBox from '@/components/movers-losers'
import WatchlistBox from '@/components/watchlist-box'
import EquitiesWidget from './components/equities-widget'
import NewsBox from '@/components/news-box'
import InstitutionalFlow from '@/components/institutional-flow'
import WatchlisetChartingWidget from './components/watchlist-charting-widget'
import SectorHeatMap from '@/components/sector-heatmap'
import InsiderTable from '@/components/insider-table'
import MarketSentimentPanel from '@/components/market-sentiment'
import TradesharkAlertsWidget from './components/tradeshark-alerts-widget'
import MacroDataPanel from '@/components/macrodata-panel'
import SocialSentimentBoard from '@/components/social-sentiment-board'
import EventsEarningsWidget from './components/events-earnings-widget'
import UserNotes from '@/components/user-notes'

const EquiFusionPage = () => {
    return (
        <div className="flex flex-1 flex-col gap-3 p-4 bg-[#050914] text-[#F5F6FA] min-h-screen">
            <div className="grid grid-cols-1">
                <GlobalIndicesSummary selectedExchange="NASDAQ" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 auto-rows-min">
                {/* COL 1 */}
                <div className="flex flex-col col-span-2 gap-3">
                    <ExchangeInfoBox selectedExchange='NASDAQ' />
                    <MoversLosersBox />
                    <EquitiesWidget />
                    <WatchlisetChartingWidget />
                    <InstitutionalFlow />
                    <MarketSentimentPanel />
                    <MacroDataPanel />
                    <UserNotes />
                </div>
                {/* COL 2 */}
                <div className="flex flex-col gap-3">
                    <TradesharkSuggestions />
                    <SectorHeatMap />
                    <NewsBox />
                    <WatchlistBox />
                    <InsiderTable />
                    <TradesharkAlertsWidget />
                    <SocialSentimentBoard />
                    <EventsEarningsWidget />
                </div>
            </div>

            <div className="w-full bg-[#0A0F1C] px-4 py-3 text-gray-400 flex items-center justify-center border border-gray-800 rounded-sm w-full text-gray-200 text-[10px] transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 relative overflow-hidden">
                ⚠️ This is a research tool. Data may contain errors and does not constitute financial advice. Users should conduct their own research before investing.
            </div>

            {/* <FloatingAIButton /> */}
        </div >
    )
}

export default EquiFusionPage