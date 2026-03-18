import React from 'react'

const StatCard = ({label, value, icon: Icon, color}) => {
    return (
        <div className="bg-gray-900 rounded-xl p-5 flex flex-col gap-1">
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon size={20}/>
            </div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    )
}
export default StatCard
