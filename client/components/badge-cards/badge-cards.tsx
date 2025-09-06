import React from 'react'
import { Separator } from "@/components/ui/separator"


interface BadgeCardsProps {
    param: string,
    value: string
}

const BadgeCards = ({ param, value }: BadgeCardsProps) => {
    return (
        <div className="bg-white border border-gray-300 shadow-lg flex flex-col items-start justify-start rounded-sm h-full col-span-1 overflow-hidden hover:bg-violet-100">
            <p className="bg-violet-200 p-2 w-full font-semibold text-xs text-gray-900 text-black tracking-tight">{param}</p>
            <p className="text-xs font-semibold text-gray-600 bg-gray-100 w-full h-full flex items-center justify-start p-1">{value}</p>
        </div>
    )
}

export default BadgeCards