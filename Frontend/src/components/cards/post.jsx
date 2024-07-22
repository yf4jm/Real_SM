import React, { useEffect, useState } from 'react';
import anime from '../../assets/anime.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
const PostCard = () => {
    const [liked,setLiked] =useState(true)


    return (
        <>
            {/* <div className='flex justify-center items-center min-h-screen'> */}
                <div className='flex flex-col justify-center bg-slate-50 max-w-72 gap-5'>
                    <div className='h-48 w-full'>
                        <img src={anime} alt="" className='h-full w-full object-cover' />
                    </div>
                    <h1 className='text-2xl'>This is the first post</h1>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non fuga voluptatibus expedita, impedit possimus velit. Laudantium perspiciatis expedita numquam labore autem veniam pariatur nemo, modi vel, sint tenetur repellendus itaque?</p>
                    <div className='flex justify-between'>
                        {liked ? <FavoriteIcon className='text-red-500'/>:<FavoriteBorderIcon className='text-red-800'/>}
                        <ModeCommentOutlinedIcon />
                        <SendOutlinedIcon />
                        <MoreHorizOutlinedIcon />
                    </div>
                </div>
            {/* </div> */}
        </>
    );
}

export default PostCard;
