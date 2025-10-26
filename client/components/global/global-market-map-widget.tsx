'use client';

import React, { useEffect, useState } from 'react';
// Example:
import WindowLayout from '../window-layout';
const { ComposableMap, Geographies, Geography } = require('react-simple-maps') as any;

import { scaleLinear } from 'd3-scale';
import { Earth } from 'lucide-react';

type RegionData = {
    id: string; // ISO-3166-1 alpha-2 country code
    name: string;
    change: number; // percentage change
};

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

const mockData: RegionData[] = [
    { id: 'US', name: 'USA', change: 1.2 },
    { id: 'JP', name: 'Japan', change: -0.7 },
    { id: 'GB', name: 'UK', change: 0.3 },
    { id: 'CN', name: 'China', change: -1.1 },
    { id: 'DE', name: 'Germany', change: 0.5 },
    { id: 'IN', name: 'India', change: 0.8 },
    // Add more regions as needed
];

const GlobalMarketMapWidget = () => {
    const [data, setData] = useState<RegionData[]>([]);

    useEffect(() => {
        // Replace this with real API call
        setData(mockData);
    }, []);

    // Color scale: red = negative, green = positive
    const colorScale = scaleLinear<string>()
        .domain([-3, 0, 3])
        .range(['#ef4444', '#f9fafb', '#4ade80']); // red -> neutral -> green

    return (
        <WindowLayout title="Global Market Map" height="400px" fit={true} icon={Earth}>
            <ComposableMap projectionConfig={{ scale: 150 }} width={400} height={200}>
                <Geographies geography={geoUrl}>
                    {({ geographies }: { geographies: any[] }) =>
                        geographies.map((geo) => {
                            const region = data.find((d) => d.id === geo.id);
                            const color = region ? colorScale(region.change) : '#f3f4f6'; // default gray
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={color}
                                    stroke="#0F172A"
                                    style={{
                                        default: { outline: 'none' },
                                        hover: { fill: '#60a5fa', outline: 'none', cursor: 'pointer' },
                                        pressed: { outline: 'none' },
                                    }}
                                    title={region ? `${region.name}: ${region.change > 0 ? '+' : ''}${region.change}%` : undefined}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </WindowLayout>
    );
};

export default GlobalMarketMapWidget;
