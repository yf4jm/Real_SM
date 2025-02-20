import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BlogDetails from './components/post_details/BlogDetails'
const PostRoutes = () => {
  return (
    <Routes>
      <Route path='blog/:pk' element={<BlogDetails />} />
    </Routes>
  )
}

export default PostRoutes
