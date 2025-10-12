'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries, IChartApi, CandlestickData, UTCTimestamp } from 'lightweight-charts';
import WindowLayout from './window-layout';
import { ChartCandlestick } from 'lucide-react';

interface CandlestickPanelProps {
    count?: number;
}

const CandlestickPanel: React.FC<CandlestickPanelProps> = ({ count = 5 }) => {
    const maxPerRow = 4;

    return (
        <WindowLayout title="Watchlist Charting" icon={ChartCandlestick} fit={false}>
            <div className="relative overflow-hidden w-full">
                <div
                    className="grid gap-2"
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
}

const SingleChart: React.FC<SingleChartProps> = ({ count }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ReturnType<IChartApi['addSeries']> | null>(null);
    const [selectedTF, setSelectedTF] = useState('1D');

    // Shrink axes/font sizes for more charts
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
            height: width, // square
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

    // Real-time updates
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

        const interval = setInterval(() => {
            const newCandle: CandlestickData<UTCTimestamp> = {
                time: Math.floor(Date.now() / 1000) as UTCTimestamp,
                open: 150 + Math.random() * 10,
                high: 160 + Math.random() * 10,
                low: 140 - Math.random() * 10,
                close: 150 + Math.random() * 15,
            };
            seriesRef.current!.update(newCandle);
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedTF]);

    // Resize chart on container resize
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
        <div
            ref={chartContainerRef}
            className="rounded-sm overflow-hidden border border-gray-800"
            style={{ aspectRatio: '1 / 1' }} // square
        />
    );
};

export default CandlestickPanel;
