import React from 'react'

interface SmallCardProps {
    title: string,
    value: string,
    width?: string
}

const SmallCard = ({title, value, width = '49%'}: SmallCardProps) => {
    return (
        <div style={{
            width: width
        }} className="rounded-sm p-2 bg-gray-100 shadow-sm hover:bg-blue-200">
            <h3 className="text-xs font-semibold tracking-tight">
                {title}
            </h3>
            <p className="text-xs text-gray-600">
                {value}
            </p>
        </div>
    )
}

export default SmallCard