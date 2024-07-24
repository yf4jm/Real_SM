import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar'
import Community from './pages/community/community'
import CommunityHome from './pages/community/home';
import PostCard from './components/cards/post';
import Chat from './pages/chat'
import Login from './pages/auth/login';
function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path="/community/:pk" element={<Community />} />
        <Route path="/c/:pk" element={<CommunityHome />} />
        <Route path="/" element={<PostCard />} />
        <Route path="/chat/:roomId"  element={<Chat />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
