'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries, IChartApi, CandlestickData, UTCTimestamp } from 'lightweight-charts';
import WindowLayout from '../../../components/window-layout';
import { ChartCandlestick } from 'lucide-react';

interface WatchlisetChartingWidgetProps {
    count?: number;
}

const WatchlisetChartingWidget: React.FC<WatchlisetChartingWidgetProps> = ({ count = 5 }) => {
    const maxPerRow = 4;

    return (
        <WindowLayout title="Watchlist Charting" icon={ChartCandlestick} fit={false}>
            <div className="relative overflow-hidden w-full">
                <div
                    className="grid gap-1"
                    style={{
                        gridTemplateColumns: `repeat(${Math.min(count, maxPerRow)}, 1fr)`,
                    }}
                >
                    {Array.from({ length: count }).map((_, idx) => (
                        <SingleChart key={idx} count={count} />
                    ))}
                </div>
            </div>
        </WindowLayout>
    );
};

interface SingleChartProps {
    count: number;
    ticker?: string; // optional ticker name
}

const SingleChart: React.FC<SingleChartProps> = ({ count, ticker = "AAPL" }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ReturnType<IChartApi['addSeries']> | null>(null);
    const [selectedTF, setSelectedTF] = useState('1D');
    const [livePrice, setLivePrice] = useState<number>(0);

    const chartOptions = {
        layout: {
            background: { color: '#0B1220' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#1E293B' },
            horzLines: { color: '#1E293B' },
        },
        timeScale: {
            borderColor: '#1E293B',
            timeVisible: true,
            secondsVisible: false,
            rightOffset: 3,
            barSpacing: count > 2 ? 4 : 6,
            tickMarkFormatter: count > 2 ? (time: any) => time : undefined,
        },
        rightPriceScale: {
            borderColor: '#1E293B',
            scaleMargins: { top: 0.2, bottom: 0.2 },
        },
    };

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const container = chartContainerRef.current;
        const width = container.clientWidth;

        const chart = createChart(container, {
            ...chartOptions,
            width,
            height: width,
        });

        const series = chart.addSeries(CandlestickSeries, {
            upColor: '#4ade80',
            downColor: '#ef4444',
            borderVisible: false,
            wickUpColor: '#4ade80',
            wickDownColor: '#ef4444',
        });

        chartRef.current = chart;
        seriesRef.current = series;

        return () => chart.remove();
    }, [count]);

    // Real-time updates with live price
    useEffect(() => {
        if (!seriesRef.current) return;

        const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
        const initialData: CandlestickData<UTCTimestamp>[] = Array.from({ length: 60 }, (_, i) => ({
            time: (now - (60 - i) * 86400) as UTCTimestamp,
            open: 150 + Math.random() * 10,
            high: 160 + Math.random() * 10,
            low: 140 - Math.random() * 10,
            close: 150 + Math.random() * 15,
        }));

        seriesRef.current.setData(initialData);
        setLivePrice(initialData[initialData.length - 1].close); // initial price

        const interval = setInterval(() => {
            const newCandle: CandlestickData<UTCTimestamp> = {
                time: Math.floor(Date.now() / 1000) as UTCTimestamp,
                open: 150 + Math.random() * 10,
                high: 160 + Math.random() * 10,
                low: 140 - Math.random() * 10,
                close: 150 + Math.random() * 15,
            };
            seriesRef.current!.update(newCandle);
            setLivePrice(newCandle.close); // update live price
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedTF]);

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
                const width = chartContainerRef.current.clientWidth;
                chartRef.current.applyOptions({ width, height: width });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col rounded-sm border border-accent/30 overflow-hidden">
            {/* Header with ticker and live price */}
            <div className="flex justify-between items-center px-2 py-1 bg-[#0f172a] text-white text-[10px] font-semibold border-b border-accent/30">
                <span>{ticker}</span>
                <span>${livePrice.toFixed(2)}</span>
            </div>

            {/* Chart container */}
            <div
                ref={chartContainerRef}
                className="flex-1"
                style={{ aspectRatio: '1 / 1' }}
            />
        </div>
    );
};

export default WatchlisetChartingWidget;
