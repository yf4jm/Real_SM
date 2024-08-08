import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../../components/cards/post';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SideLink from '../../components/alliance/sideLink';
import { Context } from '../../App';
import CommuntiyRouteHandler from './RouteHandler';
import Lisidebar from '../../components/li/sidebar';
import { Link } from 'react-router-dom';
import Cli from '../../components/li/cathegory';

const CommunityHome = () => {
  const { pk } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [profile, setProfile] = useContext(Context);
  const [blogData, setBlogData] = useState(null);
  const [cData, setCData] = useState(null);
  const cliContainerRef = useRef(null); // Ref for the Cli container

  useEffect(() => {
    const fetchCommunityData = async () => {
      const response = await CommuntiyRouteHandler(pk);
      setCData(response);
    };
    fetchCommunityData();
  }, [pk]);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:8000/api/blogs', {
          params: { profile_id: profile.id },
        });
        setBlogData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (profile) {
      fetchBlogsData();
    }
  }, [profile]);

  // Function to handle scrolling
  const scrollLeft = () => {
    cliContainerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    cliContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <div className='flex w-full h-screen relative'>
      {/* Toggle Button for Mobile */}
      <div className='bg-slate-400 top-36 left-0 p-3 lg:hidden fixed rounded-full cursor-pointer z-10' onClick={toggleSidebar}>
        <MenuIcon className='text-xl' />
      </div>

      {/* Left Sidebar */}
      <div className={`fixed inset-0 bg-slate-100 transition-transform duration-300 transform ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:w-1/4 lg:block z-20`}>
        <div className='flex justify-between items-center p-4 lg:hidden'>
          <h2 className='text-lg font-bold'>Menu</h2>
          <button onClick={toggleSidebar} className='text-gray-600'>
            <CloseIcon />
          </button>
        </div>
        <div className='overflow-y-auto h-full'>
          <ul className='text-black p-4'>
            <li className='flex justify-center items-center flex-col'>
              {cData && (
                <>
                  <img src={cData.image} alt="" className="lg:w-1/2 w-36"/>
                  <p className="text-xl font-semibold">sports</p>
                </>
              )}
            </li>
            <Link><Lisidebar value="Home"/></Link>
          </ul>
        </div>
      </div>

      {/* Middle Content */}
      <div className='flex-grow p-5 overflow-y-auto lg:mx-auto lg:max-w-3xl bg-slate-100'>
        <div className='sticky top-0 m-0'>
          <div className='relative flex items-center justify-center'>
            <button 
              onClick={scrollLeft} 
              className='absolute left-3 bg-gray-300 rounded-full flex items-center justify-center h-8 w-8'>
              <ArrowBackIosIcon className='text-sm' />
            </button>
            <ul 
              ref={cliContainerRef} 
              className='flex gap-3 overflow-x-auto no-scrollbar ml-12 mr-12'>
              <Cli value="featured" />
              <Cli value="blogs" />
              <Cli value="novels" />
              <Cli value="comics" />
              <Cli value="quizzes" />
              <Cli value="example" />
              <Cli value="example" />
              <Cli value="example" />
              <Cli value="example" />
              <Cli value="example" />  
            </ul>
            <button 
              onClick={scrollRight} 
              className='absolute right-0 bg-gray-300 rounded-full flex items-center justify-center h-8 w-8'>
              <ArrowForwardIosIcon className='text-sm' />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-5'>
          {blogData ? (
            blogData.map((postData) => (
              <PostCard
                key={postData.id}
                id={postData.id}
                title={postData.title}
                author={postData.author}
                description={postData.description}
                is_liked={postData.is_liked}
                likes_count={postData.likes_count}
                media={postData.media}
                created_on={postData.created_on}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='hidden lg:block lg:w-1/4 p-5 sticky top-0 right-0 h-screen'>
        <ul className='text-black p-4'>
          <li>Link1</li>
          <li>link2</li>
          <li>link3</li>
          <li>link4</li>
          <li>link5</li>
        </ul>
      </div>

      <SideLink />
    </div>
  );
};

export default CommunityHome;
