import Login from "./pages/Login.jsx";
import Callback from "./pages/Callback.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Stats from "./pages/Stats.jsx";

import { useState, useEffect } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import { getAccessToken } from './auth'
import { getMyProfile } from './api'

function App() {
    const [profile, setProfile] = useState(null)
    const location = useLocation()

    useEffect(() => {
        if (getAccessToken()) {
            getMyProfile().then(setProfile).catch(console.error)
        }
    }, [location.pathname])

  return (
      <Routes>
          <Route path="/" element={<Dashboard profile={profile} setProfile={setProfile} />} />
          <Route path='/callback' element={<Callback/>} />
          <Route path='/dashboard' element={<Dashboard profile={profile} setProfile={setProfile}/>} />
          <Route path='/stats' element={<Stats profile={profile}/>}/>
      </Routes>
  )
}

export default App
