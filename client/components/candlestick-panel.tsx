'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries, IChartApi, CandlestickData, UTCTimestamp } from 'lightweight-charts';
import WindowLayout from './window-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartCandlestick } from 'lucide-react';

const timeframes = ['1D', '1W', '1M', '1Y'];

const CandlestickPanel = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ReturnType<IChartApi['addSeries']> | null>(null);
    const [selectedTF, setSelectedTF] = useState('1D');

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: { background: { color: '#0B1220' }, textColor: '#DDD' },
            grid: { vertLines: { color: '#1E293B' }, horzLines: { color: '#1E293B' } },
            width: chartContainerRef.current.clientWidth,
            height: 350,
            timeScale: { borderColor: '#1E293B' },
            rightPriceScale: { borderColor: '#1E293B' },
        });

        // ✅ Create candlestick series using addSeries(CandlestickSeries)
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
    }, []);

    useEffect(() => {
        if (!seriesRef.current) return;

        const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
        const data: CandlestickData<UTCTimestamp>[] = Array.from({ length: 60 }, (_, i) => ({
            time: (now - (60 - i) * 86400) as UTCTimestamp,
            open: 150 + Math.random() * 10,
            high: 160 + Math.random() * 10,
            low: 140 - Math.random() * 10,
            close: 150 + Math.random() * 15,
        }));

        seriesRef.current.setData(data);
    }, [selectedTF]);

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowLayout title="Charting Panel" icon={ChartCandlestick} fit={true}>

            {/* {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={selectedTF === tf ? 'default' : 'outline'}
              size="icon"
              className={`text-[10px] ${selectedTF === tf ? 'bg-accent text-black' : 'text-gray-300'}`}
              onClick={() => setSelectedTF(tf)}
            >
              {tf}
            </Button>
          ))} */}

            <div ref={chartContainerRef} className="w-full rounded-lg overflow-hidden"  />

        </WindowLayout>
    );
};

export default CandlestickPanel;
