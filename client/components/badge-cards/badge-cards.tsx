import React from 'react'
import { AlignHorizontalDistributeCenter } from 'lucide-react'


interface BadgeCardsProps {
    param: string,
    value: string
}

const BadgeCards = ({ param, value }: BadgeCardsProps) => {
    return (
        <div className="bg-white border shadow-lg flex flex-col items-start justify-start rounded-sm h-full col-span-1 overflow-hidden hover:bg-violet-100">
            <p className="flex items-center gap-1 text-left bg-violet-200 p-2 w-full font-semibold text-xs text-gray-900 text-black tracking-tight"><AlignHorizontalDistributeCenter className='w-3 h-3' />{param}</p>
            <p className="text-xs font-semibold text-gray-600 bg-gray-100 w-full h-full flex items-center justify-start p-1 pl-2">{value}</p>
        </div>
    )
}

export default BadgeCards