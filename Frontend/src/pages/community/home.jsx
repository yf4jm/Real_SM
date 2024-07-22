import React from 'react';
import PostCard from '../../components/cards/post';

const CommunityHome = () => {
  return (
    <>
      <div className='flex w-full'>
        <div className='hidden lg:block lg:w-1/4 bg-slate-100 overscroll-auto'>
          <ul className='text-black'>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
          </ul>
        </div>
        <div className='w-full lg:w-3/4 p-5'>
          <div
            className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
          >
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
      </div>
    </>
  );
};

export default CommunityHome;
