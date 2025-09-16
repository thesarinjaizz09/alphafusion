import React from 'react'
import { Config } from '@/types/vision.types'
import { Cog } from 'lucide-react'
import SmallCard from '../ui/small-card';

interface ConfigurationCardProps {
    config: Config;
}

const ConfigurationCard = ({config}: ConfigurationCardProps) => {
    return (
        <div className="col-span-7 bg-white border border-gray-200 shadow-lg rounded-sm px-2 py-3 flex flex-col">
            <div className="inline-block w-full">
                <h3 className="text-sm font-semibold tracking-tight flex items-center bg-violet-200 rounded-sm p-1 px-2 text-gray-900">
                    <Cog className="w-4 mr-2" /> Configuration
                </h3>
            </div>
            <p className="text-xs text-gray-600 mt-2">
                Configuration settings and dependent variables of the model that greatly affect forecast outcomes and signal values.
            </p>
            <div className="grid grid-cols-4 w-full mt-4 gap-2">
                {Object.entries(config).map(([key, value]) => (
                    <SmallCard key={key} title={key} value={value.toString()} width="100%" />
                ))}
            </div>
        </div>
    )
}

export default ConfigurationCard