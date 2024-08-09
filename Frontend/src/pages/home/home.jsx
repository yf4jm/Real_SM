import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import allianceFetch from '../../fetch/allianceFetch';
import defaultAllianceIcon from '../../assets/alliance.png';

const RealHome = () => {
  const [profile] = useContext(Context);
  const [alliance, setAlliance] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchAlliance = async () => {
      if (profile && profile.alliance) {
        try {
          const res = await allianceFetch(profile.alliance);
          setAlliance(res);
        } catch (error) {
          console.error("Error fetching alliance:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchAlliance();
  }, [profile]);

  console.log(alliance);

  return (
    <>
      {loading ? (  // Show loading while fetching
        <p>Loading...</p>
      ) : (
        alliance && (
          <div className='flex flex-wrap justify-center items-center'>
            <div>
            <img src={alliance.icon || defaultAllianceIcon} alt="Alliance Icon" />
            </div>
            <div className='flex flex-col'>
            <p className='text-4xl'>{alliance.name}</p>
            <p>{alliance.description}</p>
            {alliance.community_list && alliance.community_list.length > 0 ? (
              <ul className='flex gap-5'>
                {alliance.community_list.map((community) => (
                  <li className='text-white bg-black p-2 w-fit rounded-full' key={community.slug}>
                    {community.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No communities available.</p> // Handle empty community list
            )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default RealHome;
