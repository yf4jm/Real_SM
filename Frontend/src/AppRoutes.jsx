// src/AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Community from './pages/community/community';
import CommunityHome from './pages/community/home';
import Chat from './pages/chat/chat';
import Login from './pages/auth/login';
import RealHome from './pages/home/home';
import Page_404 from './pages/error/404_page';
import ProfileDetails from './pages/profile/ProfileDetails';
import HorizentalImages from './components/containers/horizentalImages';
import PostCreate from './pages/post_create/post_create';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/error/404' element={<Page_404 />} />
      <Route path="/community/:pk" element={<Community />} />
      <Route path="/c/:pk" element={<CommunityHome />} />
      <Route path="/" element={<RealHome />} />
      <Route path="/chat/:roomId" element={<Chat />} />
      <Route path="/login/" element={<Login />} />
      <Route path='/profile/:pk' element={<ProfileDetails />} />
      <Route path='/test/' element={<HorizentalImages />} />
      <Route path='/create_post/' element={<PostCreate />} />
    </Routes>
  );
};

export default AppRoutes;
