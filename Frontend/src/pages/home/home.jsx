import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import allianceFetch from '../../fetch/allianceFetch';
import defaultAllianceIcon from '../../assets/alliance.png';
import { Link } from 'react-router-dom';
const RealHome = () => {
  const [profile] = useContext(Context);
  const [alliance, setAlliance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlliance = async () => {
      if (profile && profile.alliance) {
        try {
          const res = await allianceFetch(profile.alliance);
          setAlliance(res);
        } catch (error) {
          console.error("Error fetching alliance:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAlliance();
  }, [profile]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        alliance && (
          <div className='flex justify-center items-center'>
            <div className='flex flex-col w-full md:w-3/5 p-5 mt-10 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500'>
              <div className='flex flex-col md:flex-row items-center mb-5'>
                <div className=''>
                  <img
                    src={alliance.icon || defaultAllianceIcon}
                    alt="Alliance Icon"
                    className='max-w-72' // Fixed width and height
                  />
                </div>
                <div className='flex flex-col ml-0 md:ml-5 mt-5 md:mt-0'>
                  <p className='text-2xl md:text-4xl text-white font-bold'>{alliance.name}</p>
                  <p className='text-white'>{alliance.description}</p>
                  {alliance.community_list && alliance.community_list.length > 0 ? (
                    <ul className='flex gap-2 mt-2 flex-wrap'>
                      {alliance.community_list.map((community) => (
                        <li className='text-white bg-black p-2 rounded-full' key={community.slug}>
                          <Link to={`/c/${community.slug}`}>{community.name}</Link>
                          
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-white'>No communities available.</p>
                  )}
                </div>
              </div>
              <div className='mt-auto text-right'>
                <a href="" className='text-white underline hover:text-gray-200'>
                  View Details
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default RealHome;
