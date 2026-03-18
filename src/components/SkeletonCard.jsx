import React from 'react'

const SkeletonCard = () => {
    return (
        <div className="bg-gray-900 rounded-xl overflow-hidden animate-pulse">
            <div className="w-full aspect-[2/3] bg-gray-800"/>
            <div className="p-3 flex flex-col gap-2">
                <div className="h-3 bg-gray-800 rounded w-4/5"></div>
                <div className="h-3 bg-gray-800 rounded w-2/5"></div>
            </div>
        </div>
    )
}
export default SkeletonCard
