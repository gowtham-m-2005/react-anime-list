import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {exchangeCodeForToken} from "../auth.js";

const Callback = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get("code")

        if(code){
            exchangeCodeForToken(code)
                .then(() => navigate('/dashboard'))
                .catch(err => console.error('Token exchange failed', err))
        }
    }, [])

    return (
        <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
            <p className="text-gray-400 text-lg animate-pulse">Logging you in...</p>
        </div>
    )
}
export default Callback
