import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../../components/cards/blog';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Lisidebar from '../../components/li/sidebar';
import { Context } from '../../App';
import CommuntiyRouteHandler from './RouteHandler';
import '../../styles/scrollbar.css'; // Import the custom scrollbar styles
import SecondaryTag from '../../components/li/secondaryTag';
const CommunityHome = () => {
  const { pk } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [profile] = useContext(Context);
  const [blogData, setBlogData] = useState(null);
  const [cData, setCData] = useState(null);
  const cliContainerRef = useRef(null);

  const categories = [
    { slug: 'featured', name: 'Featured' },
    { slug: 'blogs', name: 'Blogs' },
    { slug: 'novels', name: 'Novels' },
    { slug: 'comics', name: 'Comics' },
    { slug: 'quizzes', name: 'Quizzes' },
    { slug: 'example', name: 'Example' },
    { slug: 'example', name: 'Example' },
    { slug: 'example', name: 'Example' },
    { slug: 'example', name: 'Example' },
    { slug: 'example', name: 'Example' }
  ];

  useEffect(() => {
    const fetchCommunityData = async () => {
      const response = await CommuntiyRouteHandler(pk);
      setCData(response);
    };
    fetchCommunityData();
  }, [pk]);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:8000/api/blogs', {
          params: { profile_id: profile?.id },
        });
        setBlogData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    profile?.id && fetchBlogsData();
  }, [profile]);

  const toggleSidebar = () => setIsVisible(!isVisible);
  const scroll = (direction) => () => {
    cliContainerRef.current.scrollBy({
      left: direction === 'left' ? -150 : 150,
      behavior: 'smooth'
    });
  };

  return (
    <div className='flex w-full h-[calc(100vh-74px)] '>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className='fixed top-24 left-4 z-50 lg:hidden p-3 rounded-lg btn-primary btn text-white shadow-lg transition-all'
        aria-label="Toggle sidebar"
      >
        <MenuIcon className='text-xl' />
      </button>

      {/* Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 shadow-lg transform transition-transform duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:w-1/4 z-40`}
      >
        <div className='flex justify-between items-center p-4  lg:hidden'>
          <h2 className='text-lg font-semibold text-gray-800'>Menu</h2>
          <button
            onClick={toggleSidebar}
            className='text-gray-600 hover:text-gray-800'
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>

        <div className='overflow-y-auto h-full p-4 custom-scrollbar'>
          {cData && (
            <div className='flex flex-col items-center mb-6'>
              <img
                src={cData.image}
                alt="Community banner"
                className="lg:w-1/2 w-36 object-cover"
              />
              <p className="text-xl font-semibold mt-4 ">{cData.name}</p>
            </div>
          )}
          <ul>
            <Lisidebar>home</Lisidebar>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-grow overflow-y-auto lg:mx-auto lg:max-w-4xl shadow-sm custom-scrollbar'>
        <section className='sticky top-0 z-30 bg-base-300'>
          <div className='relative flex items-center p-4'>
            <button
              onClick={scroll('left')}
              className='absolute left-4 rounded-full h-10 w-10 flex items-center justify-center shadow-md transition-all'
              aria-label="Scroll left"
            >
              <ArrowBackIosIcon/>
            </button>

            <ul
              ref={cliContainerRef}
              className='flex gap-4 overflow-x-auto no-scrollbar mx-16 custom-scrollbar'
            >
              {categories.map((category, index) => (
                <SecondaryTag object={category}/>
              ))}
            </ul>

            <button
              onClick={scroll('right')}
              className='absolute right-4 rounded-full h-10 w-10 flex items-center justify-center shadow-md transition-all'
              aria-label="Scroll right"
            >
              <ArrowForwardIosIcon className='' />
            </button>
          </div>
        </section>

        <section className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            {blogData ? (
              blogData.map((post) => (
                <BlogCard
                
                  key={post.id}
                  {...post}
                />
              ))
            ) : (
              <p className="text-center col-span-full">Loading posts...</p>
            )}
          </div>
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className='hidden lg:block w-1/4 p-6 custom-scrollbar'>
        <nav>
          <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
          <ul className='space-y-3'>
            {['Link 1', 'Link 2', 'Link 3', 'Link 4', 'Link 5'].map((link) => (
              <Lisidebar key={link} to={link}>
                {link}
              </Lisidebar>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default CommunityHome;
