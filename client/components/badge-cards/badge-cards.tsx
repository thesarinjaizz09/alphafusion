import React from 'react'

interface BadgeCardsProps {
    param: string,
    value: string
}

const BadgeCards = ({ param, value }: BadgeCardsProps) => {
    return (
        <div className="">
            <p className="font-semibold text-md text-black tracking-tight">{param}</p>
            <p className="text-xs text-zinc-600">{value}</p>
        </div>
    )
}

export default BadgeCards