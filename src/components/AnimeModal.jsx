import React from 'react'
import {X} from "lucide-react";

const AnimeModal = ({node,list_status, onClose}) => {
    if(!node) return null

    const enTitle = node.alternative_titles?.en
    const genres = node.genres?.map(g => g.name).join(', ') || 'N/A'
    const airStart = node.start_date || 'N/A'
    const airEnd = node.end_date || 'N/A'
    const myStart = list_status?.start_date || 'N/A'
    const myFinish = list_status?.finish_date || 'N/A'


    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={onClose}>
            <div
                className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}>

                {/*Top Section */}
                <div className="flex gap-4 p-6">
                    {node.main_picture && (
                        <img src={node.main_picture.large || node.main_picture.medium}
                             alt={node.title}
                             className="w-32 rounded-xl object-cover shrink-0"/>
                    )}
                    <div className="flex flex-col gap-2 flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-lg font-bold leading-snug">{node.title}</h2>
                                {enTitle && <p>{enTitle}</p>}
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white cursor-pointer shrink-0">
                                    <X size={20}/>
                            </button>
                        </div>

                        {/*Quick stats */}
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-gray-800 rounded-lg p-2">
                                <p className="text-gray-400 text-xs">MAL Score</p>
                                <p className="text-yellow-400 font-bold">{node.mean ?? 'N/A'}</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-2">
                                <p className="text-gray-400 text-xs">Episodes</p>
                                <p className="font-bold">{node.num_episodes || '?'}</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-2">
                                <p className="text-gray-400 text-xs">Status</p>
                                <p className="font-bold capitalize">{node.status?.replace(/_/g, ' ') ?? 'N/A'}</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-2">
                                <p className="text-gray-400 text-xs">Your Score</p>
                                <p className="font-bold">{list_status?.score > 0 ? `★ ${list_status.score}` : 'Unrated'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="px-6 pb-6 flex flex-col gap-4">

                    {/*Genres*/}
                    <div>
                        <p className="text-gray-400 text-sm mb-2">Genres</p>
                        <div className="flex flex-wrap gap-2">
                            {node.genres?.map(g => (
                                <span key={g.id} className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                                    {g.name}
                                </span>
                            )) || <span className="text-gray-500 text-sm">N/A</span>}
                        </div>
                    </div>

                    {/* Airing Dates */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-800 rounded-lg p-3">
                            <p className="text-gray-400 text-sm mb-1">Aired</p>
                            <p className="text-sm">{airStart} to {airEnd}</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3">
                            <p className="text-gray-400 text-sm mb-1">You watched</p>
                            <p className="text-sm">{myStart} to {myFinish}</p>
                        </div>
                    </div>

                    {/* Synopsis */}
                    <div>
                        <p className="text-gray-400 text-sm mb-2">Synopsis</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{node.synopsis}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AnimeModal
