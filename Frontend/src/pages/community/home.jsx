import React, { useState } from 'react';
import PostCard from '../../components/cards/post';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import SideLink from '../../components/alliance/sideLink';

const CommunityHome = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className='flex w-full relative'>
        <div className='bg-slate-400 top-20 left-0 p-3 lg:hidden fixed rounded-full cursor-pointer z-10' onClick={toggleSidebar}>
          <MenuIcon className='text-xl' />
        </div>
        <div className={`fixed inset-0 bg-slate-100 transition-transform duration-300 transform ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:w-1/4 lg:block z-20`}>
          <div className='flex justify-between items-center p-4 lg:hidden'>
            <h2 className='text-lg font-bold'>Menu</h2>
            <button onClick={toggleSidebar} className='text-gray-600'>
              <CloseIcon />
            </button>
          </div>
          <ul className='text-black p-4'>
            <li>link1</li>
            <li>link2</li>
            <li>link3</li>
            <li>link4</li>
            <li>link5</li>
          </ul>
        </div>
        <div className='flex p-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
        <SideLink />
        <div className='hidden lg:block lg:w-1/4 md:block p-5'>
        <ul className='text-black p-4'>
            <li>linnnnnnnnnnnnnnnnsqddk1</li>
            <li>link2</li>
            <li>link3</li>
            <li>link4</li>
            <li>link5</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CommunityHome;
