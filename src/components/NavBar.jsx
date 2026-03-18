import {useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../auth'

const Navbar = ({ profile }) => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const [showToast, setShowToast] = useState(false)

    function handleLogout() {
        logout()
        setShowToast(true)
        setTimeout(() => {
            navigate('/')
        }, 2500)
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if(menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, []);

    return (
        <div className="flex justify-between items-center px-4 sm:px-8 py-4 border-b border-gray-800">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <h1 className="text-lg sm:text-2xl font-bold">MAL Dashboard</h1>
                {profile && (
                    <div className="flex items-center gap-2 ml-2 sm:ml-4">
                        <img
                            src={profile.picture}
                            alt={profile.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        />
                        <p className="text-gray-400 text-sm hidden sm:block">@{profile.name}</p>
                    </div>
                )}
            </div>

            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setMenuOpen(prev => !prev)}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                    Menu ▾
                </button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden z-10">
                        <button
                            onClick={() => { navigate('/dashboard'); setMenuOpen(false) }}
                            className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => { navigate('/stats'); setMenuOpen(false) }}
                            className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            Stats
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
            {showToast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-medium z-50">
                    Logged out successfully
                </div>
            )}
        </div>
    )
}

export default Navbar