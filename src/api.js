import {getAccessToken} from "./auth.js";


const BASE = '/api/v2'

async function malFetch(endpoint){
    const token = getAccessToken()

    const res = await fetch(`${BASE}${endpoint}`, {
        headers: {
            'Authorization' : `Bearer ${token}`,
            'X-MAL-CLIENT-ID': import.meta.env.VITE_MAL_CLIENT_ID
        }
    })

    if(!res.ok) throw new Error(`MAL API error : ${res.status}`)
    return res.json()
}

export async function getMyAnimeList(status = 'completed', limit = 20, offset = 0){
    return malFetch(
        `/users/@me/animelist?status=${status}&limit=${limit}&offset=${offset}&fields=list_status,num_episodes,mean,synopsis,genres,start_date,end_date,status,alternative_titles`
    )
}

export async function getMyProfile(){
    return malFetch(
        '/users/@me?fields=anime_statistics'
    )
}
