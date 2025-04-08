import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import no_img from '../../assets/no_img.png';
import toggleLike from '../../posts/like_post';
import getFormattedDate from '../../utils/getFormattedDate';
import PostActions from '../common/postActions';
import { useNavigate } from 'react-router-dom';
const PollCard = ({ id, title, author, opts, is_liked, likes_count, created_on, clicks_count }) => {
  const [liked, setLiked] = useState(is_liked);
  const [likeCount, setLikeCount] = useState(likes_count);
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(is_liked);
  }, [is_liked]);

  useEffect(() => {
    setLikeCount(likes_count);
  }, [likes_count]);

  const handleToggleLike = async () => {
    try {
      await toggleLike(id, 'poll');
      setLiked(!liked);
      setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  const handleModal = ()=>{
    navigate(`?post_id=${id}&post_type=polls`);
    
  }
  const formattedDate = getFormattedDate(created_on);
  return (
    <div className="card w-full bg-base-100">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold ">{title}</h2>
        <ul className="flex flex-col gap-4 my-4">
          {opts.map((opt) => (
            <li key={opt.id} className="flex items-center bg-primary p-4 rounded-lg">
              {opt.image && <img src={opt.image} alt="Option" className="w-16 h-16 rounded-md object-cover" />}
              <span className="ml-4 text-secondary-content font-medium">{opt.text}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 mt-4">
          <img src={author.icon || no_img} alt={author.name} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <h3 className="text-lg font-semibold  ">{author.name}</h3>
            <p className="text-sm ">{formattedDate}</p>
          </div>
        </div>
        <div className="my-2">
          <span>{clicks_count} clicks</span>
        </div>
        
        <PostActions liked={liked} likeCount={likeCount} onToggleLike={handleToggleLike} onModalOpen={handleModal} />
      </div>
    </div>
  );
};

export default PollCard;
