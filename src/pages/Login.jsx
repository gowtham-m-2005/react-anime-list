import React, {useEffect} from 'react'
import {
    redirectToMALLogin,
    getAccessToken,
} from "../auth.js";
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    console.log('client id:', import.meta.env.VITE_MAL_CLIENT_ID) // ← add this

    useEffect(() => {
        if(getAccessToken()){
            navigate('/dashboard')
        }
    }, [])

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-950 text-white gap-4'>
            <h1 className="text-4xl font-bold">MAL Dashboard</h1>
            <p className="text-gray-400">Connect your MYAnimeList account to get started</p>
            <button
                onClick={redirectToMALLogin}
                className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors cursor-pointer">
                Login with MAL
            </button>
        </div>
    )
}
export default Login
