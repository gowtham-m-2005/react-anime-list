import React from 'react'

const AnimeCard = ({node, list_status, index, onClick}) => {
    return (
        (
            <div key={node.id}
                 onClick={onClick}
                 className="anime-card bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform"
                 style={{animationDelay: `${index * 0.05}s`, opacity:0}}
                 title={node.alternative_titles?.en || node.title}>
                {node.main_picture && (
                    <img
                        src={node.main_picture.medium}
                        alt={node.title}
                        className="w-full aspect-[2/3] object-cover"
                    />
                )}
                <div className="p-3">
                    <p className="text-sm font-medium line-clamp-1 leading-snug">{node.title}</p>
                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-gray-400">
                                            {list_status.num_episodes_watched ?? 0}/{node.num_episodes || "?"} eps
                                        </span>
                        <span className="text-xs text-yellow-400 font-medium">
                                            ★ {list_status.score}
                                        </span>
                    </div>
                </div>
            </div>
        )
    )
}
export default AnimeCard
