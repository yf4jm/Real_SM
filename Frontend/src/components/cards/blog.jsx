import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toggleLike from "../../posts/like_post";
import getFormattedDate from "../../utils/getFormattedDate";
import PostActions from "../common/postActions";
import BlogModal from "../modals/blogModal";
import { useNavigate } from "react-router-dom";
import Modal from "../modals/modal";
const BlogCard = ({
  id,
  title,
  author,
  description,
  is_liked,
  likes_count,
  media,
  created_on,
  clicks_count,
}) => {
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
      await toggleLike(id, "blog");
      setLiked(!liked);
      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  const handleModal = ()=>{
    navigate(`?post_id=${id}&post_type=blogs`);
    
  }
  const formattedDate = getFormattedDate(created_on);
  return (

    <>
      {/* Blog Card */}
      <Modal />
      <div
        className="card w-full bg-base-100 rounded-lg shadow-lg overflow-hidden flex flex-col"
        style={{ maxHeight: "750px" }}
      >
        <Link to={`/post/blog/${id}`} className="block flex-grow">
          {media && (
            <figure className="max-h-96 min-h-40 w-full overflow-hidden">
              <img
                src={media}
                alt="Post image"
                className="h-full w-full object-cover"
              />
            </figure>
          )}
          <div className="card-body p-6 flex-grow">
            <h2 className="card-title text-2xl font-semibold mb-2">{title}</h2>
          </div>
        </Link>
        <Link to={`/profile/${author.id}`}>
          <div className="flex items-center gap-3 px-6 pb-4">
            <img
              src={author.icon}
              alt={author.name} 
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{author.name}</h3>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
          </div>
        </Link>
        <div className="px-6 mb-4">
          <span className="text-sm text-gray-600">{clicks_count} clicks</span>
        </div>
        <PostActions
          liked={liked}
          likeCount={likeCount}
          onToggleLike={handleToggleLike}
          onModalOpen={handleModal}
        />
      </div>
      </>
  );
};

export default BlogCard;
