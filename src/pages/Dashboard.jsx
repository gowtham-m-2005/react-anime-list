import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {getAccessToken, logout} from "../auth.js";
import {getMyAnimeList} from "../api.js";
import SkeletonCard from "../components/SkeletonCard.jsx";
import Navbar from "../components/NavBar.jsx";
import AnimeCard from "../components/AnimeCard.jsx";
import AnimeModal from "../components/AnimeModal.jsx";

const STATUS = [
    { key: 'watching', label: 'Watching' },
    { key: 'completed', label: 'Completed' },
    { key: 'on_hold', label: 'On Hold' },
    { key: 'dropped', label: 'Dropped' },
    { key: 'plan_to_watch', label: 'Plan to Watch' },
]

const Dashboard = ({profile, setProfile}) => {
    const navigate = useNavigate()
    const [animeList, setAnimeList] = useState([])
    const [activeStatus, setActiveStatus] = useState(
        localStorage.getItem('mal_active_tab') || 'watching'
    )
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [selectedAnime, setSelectedAnime] = useState(null)
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [loadingMore, setLoadingMore] = useState(false)


    const allGenres = [...new Set(
        animeList.flatMap(({node}) => node.genres?.map(g=>g.name) || []).sort()
    )]

    const filteredList = selectedGenre ? animeList.filter(({node}) =>
            node.genres?.some(g => g.name === selectedGenre)) : (animeList)

    useEffect(() => {
        console.log('profile:', profile)
    }, [profile])

    useEffect(() => {
        if(!getAccessToken()){
            navigate('/')
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        setError(null)
        setOffset(0)
        setAnimeList([])
        setHasMore(true)
        setSelectedGenre(null)
        getMyAnimeList(activeStatus, 1000, 0)
            .then(data => {
                setAnimeList(data.data || [])
                setHasMore(!!data.paging?.next)
                setLoading(false)
            })
    }, [activeStatus]);

    function handleLogout() {
        logout()
        navigate('/')
    }

    function loadMore() {
        const newOffset = offset + 20
        setOffset(newOffset)
        setLoadingMore(true)
        getMyAnimeList(activeStatus, 20, newOffset)
            .then(data => {
                setAnimeList(prev => [...prev, ...(data.data || [])])
                setHasMore(!!data.paging?.next)
                setLoadingMore(false)
            })
            .catch(err => {
                setError(err.message)
                setLoadingMore(false)
            })
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/*Header*/}
            <Navbar profile={profile}/>

            {/* Status tabs */}
            <div className="flex gap-2 px-8 py-4 border-b border-gray-500 overflow-x-auto">
                {STATUS.map(s => {
                    const countKey = {
                        watching: 'num_items_watching',
                        completed: 'num_items_completed',
                        on_hold: 'num_items_on_hold',
                        dropped: 'num_items_dropped',
                        plan_to_watch: 'num_items_plan_to_watch'
                    }[s.key]

                    const count = profile?.anime_statistics?.[countKey]

                  return (
                    <button
                        key={s.key}
                        onClick={() => {
                            setActiveStatus(s.key)
                            localStorage.setItem('mal_active_tab', s.key)
                        }}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer
                        ${activeStatus === s.key ? `bg-blue-600 text-white` : `bg-gray-800 text-gray-400 hover:bg-gray-700`}`}>
                        {s.label}
                        {count !== undefined && (
                            <span className={`text-xs px-1.5 py-0.5 rounded-md ${activeStatus === s.key ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                {count}
                            </span>
                        )}
                    </button>
                  )
                })}
            </div>

            {/* Genre Filter */}
            {allGenres.length > 0 && (
                <div className="flex gap-2 px-8 py-3 border-b border-gray-800 overflow-x-auto">
                    <button
                        onClick={() => setSelectedGenre(null)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer
                        ${selectedGenre === null ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                        All
                    </button>
                    {allGenres.map(genre => (
                        <button
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer
                        ${selectedGenre === genre ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                            key={genre}
                            onClick={() => setSelectedGenre(prev => prev === genre ? null : genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="px-8 py-6">
                {loading && (
                    // <div className="fixed inset-0 flex flex-col justify-center items-center gap-3">
                    //     <div className="w-10 h-10 border-4 border-gray-700 rounded-full animate-spin"></div>
                    //     <p className="text-gray-400 animate-pulse">Loading...</p>
                    // </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {error && (
                    <p className="text-red-400">Error: {error}</p>
                )}

                {!loading && !error && animeList.length === 0 && (
                    <p className="text-gray-400">No anime in this list</p>
                )}

                {!loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                        {filteredList.map(({node, list_status}, index) =>
                            <AnimeCard key={node.id} node={node} list_status={list_status} index={index} onClick={() => setSelectedAnime({node, list_status})}/>
                        )}
                        {loadingMore && Array.from({ length: 10 }).map((_, i) => (
                            <SkeletonCard key={`skeleton-${i}`} />
                        ))}
                    </div>
                )}

                {!loading && hasMore && !loadingMore && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={loadMore}
                            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors cursor-pointer">
                            Load More
                        </button>
                    </div>
                )}
            </div>

            <AnimeModal
                node={selectedAnime?.node}
                list_status={selectedAnime?.list_status}
                onClose={() => setSelectedAnime(null)}/>
        </div>
    )
}
export default Dashboard
