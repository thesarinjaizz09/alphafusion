"use client"

import ExchangeInfoWidget from '@/components/global/exchange-info-widget'
import GlobalIndicesWidget from '@/components/global/global-indices-widget'
import TradesharkSuggestionsWidget from './components/tradeshark-suggestions-widget'
import MoversLosersWidget from './components/movers-losers-widget'
import WatchlistWidget from './components/watchlist-widget'
import EquitiesWidget from './components/equities-widget'
import NewsBoxWidget from './components/news-box-widget'
import InstitutionalFlow from '@/pages-section/equifusion/components/institutional-flow-widget'
import WatchlisetChartingWidget from './components/watchlist-charting-widget'
import SectorHeatMapWidget from './components/sector-heatmap-widget'
import InsiderTradingWidget from './components/insider-trading-widget'
import MarketSentimentWidget from './components/market-sentiment-widget'
import TradesharkAlertsWidget from './components/tradeshark-alerts-widget'
import MacroDataPanelWidget from './components/macrodata-panel-widget'
import SocialSentimentBoardWidget from './components/social-sentiment-board-widget'
import EventsEarningsWidget from './components/events-earnings-widget'
import UserNotesWidget from './components/user-notes-widget'

const EquiFusionPage = () => {
    return (
        <div className="flex flex-1 flex-col gap-3 p-4 bg-[#050914] text-[#F5F6FA] min-h-screen">
            <div className="grid grid-cols-1">
                <GlobalIndicesWidget selectedExchange="NASDAQ" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 auto-rows-min">
                {/* COL 1 */}
                <div className="flex flex-col col-span-2 gap-3">
                    <ExchangeInfoWidget selectedExchange='NASDAQ' />
                    <MoversLosersWidget />
                    <EquitiesWidget />
                    <WatchlisetChartingWidget />
                    <InstitutionalFlow />
                    <MarketSentimentWidget />
                    <MacroDataPanelWidget />
                    <UserNotesWidget />
                </div>
                {/* COL 2 */}
                <div className="flex flex-col gap-3">
                    <TradesharkSuggestionsWidget />
                    <SectorHeatMapWidget />
                    <NewsBoxWidget />
                    <WatchlistWidget />
                    <InsiderTradingWidget />
                    <TradesharkAlertsWidget />
                    <SocialSentimentBoardWidget />
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