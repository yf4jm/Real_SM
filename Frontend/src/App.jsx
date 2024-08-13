import { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Community from './pages/community/community';
import CommunityHome from './pages/community/home';
import PostCard from './components/cards/post';
import Chat from './pages/chat/chat';
import Login from './pages/auth/login';
import React from 'react';
import SideLink from './components/alliance/sideLink';
import RealHome from './pages/home/home';
import Page_404 from './pages/error/404_page';
import ProfileDetails from './pages/profile/ProfileDetails';

export const Context = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={[ user, setUser ]}>
      <Router>
        <Navbar />
        {/* <SideLink /> */}
        <Routes>
          <Route path='/error/404' element={<Page_404 />}></Route>
          <Route path="/community/:pk" element={<Community />} />
          <Route path="/c/:pk" element={<CommunityHome />} />
          <Route path="/" element={<RealHome />} />
          <Route path="/chat/:roomId" element={<Chat />} />
          <Route path="/login/" element={<Login />} />
          <Route path='/profile/:pk' element={<ProfileDetails/>} />
        </Routes>
        
      </Router>
    </Context.Provider>
  );
}

export default App;
