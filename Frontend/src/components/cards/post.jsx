import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import no_img from '../../assets/no_img.png';
import toggleLike from '../../posts/like_post';

const PostCard = ({ id, title, author, description, is_liked, likes_count, media, created_on }) => {
  const [liked, setLiked] = useState(is_liked);
  const [likeCount, setLikeCount] = useState(likes_count);

  useEffect(() => {
    setLiked(is_liked);
  }, [is_liked]);

  useEffect(() => {
    setLikeCount(likes_count);
  }, [likes_count]);

  const handleToggleLike = async () => {
    try {
      await toggleLike(id, 'blog');
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };


    const getFormattedDate = (created_on) => {
      const postDate = new Date(created_on);
      const now = new Date();
      const timeDiff = now - postDate;
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
  
      if (hours < 24) {
        if (hours >= 1) {
          return `${hours}h ago`;
        } else if (minutes >= 1) {
          return `${minutes}m ago`;
        } else {
          return `${seconds}s ago`;
        }
      } else {
        return postDate.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
      }
    };
  
    const formattedDate = getFormattedDate(created_on);
  return (
    <div className='flex flex-col justify-between bg-white w-full lg:w-80 md:w-auto p-6 rounded-lg shadow-lg' style={{ height: '450px' }}>

      <Link to={`posts/${id}`} className='block'>
        <div className='h-40 w-full rounded-lg overflow-hidden'>
          <img src={media || no_img} alt="Post image" className='h-full w-full object-cover' />
        </div>
        <h1 className='text-xl font-bold text-gray-800 mt-3'>{title}</h1>
      </Link>
      <p className='text-gray-600 text-sm overflow-hidden overflow-ellipsis' style={{ height: '4rem' }}>
        {description.plain}
      </p>
            <div className='flex items-center gap-3'>
        <img src={author.icon} alt={author.name} className='h-10 w-10 rounded-full object-cover' />
        <div>
          <h2 className='text-lg font-bold text-gray-800'>{author.name}</h2>
          <p className='text-sm text-gray-500'>{formattedDate}</p>
        </div>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <div onClick={handleToggleLike} className='cursor-pointer flex items-center'>
          {liked ? <FavoriteIcon className='text-red-500' /> : <FavoriteBorderIcon className='text-gray-400' />}
          <span className='text-gray-400 ml-1'>{likeCount}</span>
        </div>
        <div className='flex items-center space-x-4'>
          <ModeCommentOutlinedIcon className='cursor-pointer text-gray-400' />
          <SendOutlinedIcon className='cursor-pointer text-gray-400' />
          <MoreHorizOutlinedIcon className='cursor-pointer text-gray-400' />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
