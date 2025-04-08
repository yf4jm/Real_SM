import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Link } from "react-router-dom";
const PostActions = ({ liked, likeCount, onToggleLike,onModalOpen}) => {
  return (
    <div className="card-actions flex justify-between items-center px-6 py-4 border-t border-base-100 mt-auto">
      <div
        onClick={onToggleLike}
        className="flex items-center cursor-pointer p-3 pr-10 shadow-base-300 shadow-xl rounded-full btn h-full"
      >
        {liked ? (
          <FavoriteIcon sx={{ fontSize: 50 }} className="text-primary" />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 50 }} className="text-primary" />
        )}
        <span className="ml-1">{likeCount}</span>
      </div>
      <div className="flex items-center justify-between w-1/2">
        <div
          className="flex items-center cursor-pointer p-3 pr-10 shadow-base-300 shadow-xl rounded-full btn h-full"
          onClick={onModalOpen}
          
        >
          <ModeCommentOutlinedIcon sx={{ fontSize: 35 }} />
          <span className="ml-1">100</span>
          
        </div>
        <div className="flex items-center cursor-pointer p-3 shadow-base-300 shadow-xl rounded-full btn h-full">
          <SendOutlinedIcon sx={{ fontSize: 35 }} />
        </div>
        <div className="flex items-center cursor-pointer p-3 shadow-base-300 shadow-xl rounded-full btn h-full">
          <MoreHorizOutlinedIcon sx={{ fontSize: 35 }} />
        </div>
      </div>
    </div>
  );
};

export default PostActions;
