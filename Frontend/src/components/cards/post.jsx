import React, { useState } from 'react';
import anime from '../../assets/anime.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const PostCard = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className='flex flex-col justify-center bg-white w-full lg:w-96 md:w-auto p-6 rounded-lg shadow-lg gap-5'>
      <div className='h-72 w-full rounded-lg overflow-hidden'>
        <img src={anime} alt="Post image" className='h-full w-full object-cover' />
      </div>
      <h1 className='text-2xl font-bold text-gray-800'>This is the first post</h1>
      <p className='text-gray-600 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non fuga voluptatibus expedita, impedit possimus velit. Laudantium perspiciatis expedita numquam labore autem veniam pariatur nemo, modi vel, sint tenetur repellendus itaque?</p>
      <div className='flex justify-between items-center mt-4'>
        <div onClick={toggleLike} className='cursor-pointer'>
          {liked ? <FavoriteIcon className='text-red-500' /> : <FavoriteBorderIcon className='text-gray-400' />}
        </div>
        <ModeCommentOutlinedIcon className='cursor-pointer text-gray-400' />
        <SendOutlinedIcon className='cursor-pointer text-gray-400' />
        <MoreHorizOutlinedIcon className='cursor-pointer text-gray-400' />
      </div>
    </div>
  );
}

export default PostCard;
