import React, {useEffect, useState} from 'react'
import {getAccessToken} from "../auth.js";
import {useNavigate} from "react-router-dom";
import StatCard from "../components/StatCard.jsx";

import {
    TvIcon, CheckCircle, CirclePlay, PauseCircle, XCircle,
    LucideClock1, FilmIcon, LucideRefreshCw, Calendar, StarsIcon
} from "lucide-react";
import Navbar from "../components/NavBar.jsx";

const Stats = ({profile}) => {
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!getAccessToken()) {
            navigate('/')
            return
        }

        if(profile?.anime_statistics){
            setStats(profile.anime_statistics)
            setLoading(false)
        }
    }, [])

    if(loading) return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-950">
            <div className="w-10 h-10 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    )

    const statItems = [
        { label: 'Total Anime', value: stats?.num_items ?? 0, icon: TvIcon, color: 'bg-blue-500/20 text-blue-400' },
        { label: 'Completed', value: stats?.num_items_completed ?? 0, icon: CheckCircle, color: 'bg-green-500/20 text-green-400' },
        { label: 'Watching', value: stats?.num_items_watching ?? 0, icon: CirclePlay, color: 'bg-purple-500/20 text-purple-400' },
        { label: 'On Hold', value: stats?.num_items_on_hold ?? 0, icon: PauseCircle, color: 'bg-yellow-500/20 text-yellow-400' },
        { label: 'Dropped', value: stats?.num_items_dropped ?? 0, icon: XCircle, color: 'bg-red-500/20 text-red-400' },
        { label: 'Plan to Watch', value: stats?.num_items_plan_to_watch ?? 0, icon: LucideClock1, color: 'bg-gray-500/20 text-gray-400' },
        { label: 'Total Episodes', value: stats?.num_episodes ?? 0, icon: FilmIcon, color: 'bg-pink-500/20 text-pink-400' },
        { label: 'Times Rewatched', value: stats?.num_times_rewatched ?? 0, icon: LucideRefreshCw, color: 'bg-cyan-500/20 text-cyan-400' },
        { label: 'Days Watched', value: stats?.num_days_watched?.toFixed(1) ?? 0, icon: Calendar, color: 'bg-orange-500/20 text-orange-400' },
        { label: 'Mean Score', value: stats?.mean_score?.toFixed(2) ?? 0, icon: StarsIcon, color: 'bg-yellow-500/20 text-yellow-400' },
    ]

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/*Header*/}
            <Navbar profile={profile}/>

            {/* Stats Grid */}
            <div className="px-8 py-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {statItems.map(item => (
                        <StatCard key={item.label} label={item.label} value={item.value} icon={item.icon} color={item.color}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Stats
