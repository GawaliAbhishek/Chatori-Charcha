import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import ChatPage from '../components/ChatPage'
import NotFound from '../components/NotFound'
import About from '../components/About'
import RoomList from '../components/Roomlist'
function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/chat' element={<ChatPage/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/rooms' element={<RoomList/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}

export default AppRoutes