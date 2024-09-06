import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import no_img from '../../assets/no_img.png';
import toggleLike from '../../posts/like_post';
import getFormattedDate from '../../utils/getFormattedDate';
const QuizCard = ({id,title,author,opts,is_liked,likes_count, created_on,clicks_count}) => {
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
          await toggleLike(id, 'quiz');
          setLiked(!liked);
          setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
        } catch (error) {
          console.error('Error toggling like:', error);
        }
    
      };

    
      const formattedDate = getFormattedDate(created_on);
  return (
    <>
      <div className='flex flex-col justify-between bg-white w-full p-6 rounded-lg shadow-lg'>
      <h1 className='text-xl font-bold text-gray-800 my-3'>{title}</h1>
      <ul className='flex flex-col gap-5'>
        {opts.map((opt)=>(
            <li key={opt.id} className='bg-blue-400 p-5 rounded-lg flex items-center'>
                 {opt.image && <img src={opt.image} className="w-16 rounded-md"alt="" />}   <span className='ml-5'>{opt.text}</span>
                 </li>
        ))}

      </ul>
        <div className='flex items-center gap-3 my-5'>
        <img src={author.icon} alt={author.name} className='h-10 w-10 rounded-full object-cover' />
        <div>
          <h2 className='text-lg font-bold text-gray-800'>{author.name}</h2>
          <p className='text-sm text-gray-500'>{formattedDate}</p>
        </div>
      </div>
      <div className='text-gray-400'>
          <span>{clicks_count} clicks</span>
        </div>
      <div className='flex justify-between items-center my-5'>
        <div onClick={handleToggleLike} className='cursor-pointer flex items-center'>
          {liked ? <FavoriteIcon className='text-red-500' /> : <FavoriteBorderIcon className='text-gray-400' />}
          <span className='text-gray-400 ml-1'>{likeCount}</span>
        </div>

        <div className='flex items-center space-x-4 gap-7'>
          <ModeCommentOutlinedIcon className='cursor-pointer text-gray-400' />
          <SendOutlinedIcon className='cursor-pointer text-gray-400' />
          <MoreHorizOutlinedIcon className='cursor-pointer text-gray-400' />
        </div>
      </div>
      </div>
    </>
  )
}

export default QuizCard
