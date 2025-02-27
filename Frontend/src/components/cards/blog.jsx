import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import no_img from "../../assets/no_img.png";
import toggleLike from "../../posts/like_post";
import getFormattedDate from "../../utils/getFormattedDate";

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

  const formattedDate = getFormattedDate(created_on);

  return (
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
          {/* <p className="text-gray-700 overflow-auto overflow-ellipsis" style={{ maxHeight: '6rem' }}>
            {description.text}
          </p> */}
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
      <div className="card-actions flex justify-between items-center px-6 py-4 border-t border-base-100 mt-auto">
        <div
          onClick={handleToggleLike}
          className="flex items-center cursor-pointer  p-3 pr-10 shadow-base-300 shadow-xl rounded-full btn h-full"
        >
          {liked ? (
            <FavoriteIcon sx={{ fontSize: 50 }} className="text-primary  " />
          ) : (
            <FavoriteBorderIcon
              sx={{ fontSize: 50 }}
              className="text-primary"
            />
          )}
          <span className="ml-1">{likeCount}</span>
        </div>
        <div className="flex items-center justify-between w-1/2 ">
          <div className="flex items-center cursor-pointer p-3 pr-10 shadow-base-300 shadow-xl rounded-full btn h-full">
            <ModeCommentOutlinedIcon
              sx={{ fontSize: 35 }}
              className=""
            />
            <span className="ml-1">100</span>
          </div>
          <div className="flex items-center cursor-pointer p-3 shadow-base-300 shadow-xl rounded-full btn h-full">
            <SendOutlinedIcon
              sx={{ fontSize: 35 }}
            />
          </div>
          <div className="flex items-center cursor-pointer p-3  shadow-base-300 shadow-xl rounded-full btn h-full">
            <MoreHorizOutlinedIcon
              sx={{ fontSize: 35 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
