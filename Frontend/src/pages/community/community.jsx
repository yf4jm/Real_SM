import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/buttons/btn1';
import axios from 'axios';
import CommuntiyRouteHandler from './RouteHandler';
import { Link } from 'react-router-dom';
const Community = () => {
  const { pk } = useParams(); // Get pk from route parameters
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await CommuntiyRouteHandler(pk)
        setCommunity(response);
      } catch (error) {
        console.error("Error fetching community:", error); // Log the error
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [pk]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='w-full h-full'>
      {community && (
        <div className='flex items-center justify-center gap-5 flex-wrap  p-8'>
          <div className="w-52 h-96 rounded-lg overflow-hidden">
            <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
          </div>
          <div className='flex w-96 flex-col'>
            <h1 className='text-2xl'>{community.name}</h1>
            <p>{community.description}</p>
          </div>
        </div>
      )}

      <div className='w-full mt-8 flex flex-col items-center bg-gradient-to-r from-pink-700 to-gray-900'>
        <div className='w-4/6 p-6  rounded-lg flex flex-col items-center'>
          <h1 className='text-2xl mb-4'>Want to join?</h1>
          <p className='w-5/6 text-center mb-4'>Become a part of our amazing community and enjoy exclusive content, participate in events, and make new friends who share your passion for anime. Click below to get started!</p>
          <div className='flex gap-10 flex-wrap mt-4 '>
            <Link to={`/c/${community.slug}`}><Button value={"Preview"} /></Link>
            <Button value={"Join"} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Community;
