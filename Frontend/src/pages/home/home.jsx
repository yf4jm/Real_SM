import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import profileAllianceData from '../../fetch/profileAllianceData';
import defaultAllianceIcon from '../../assets/alliance.png';
import Lisidebar from '../../components/li/sidebar';
const RealHome = () => {
  const [profile] = useContext(Context);
  const [alliance, setAlliance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlliance = async () => {
      if (profile) {
        try {
          const res = await profileAllianceData(profile.id);
          setAlliance(res.alliance);
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
      {profile ? (
        loading ? (
          <p className="text-center text-lg font-semibold text-gray-600">Loading...</p>
        ) : (
          alliance && (
            <div className='flex'>
              <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
                <div className="flex justify-center mb-4">
                  <img
                    src={alliance.icon || defaultAllianceIcon}
                    alt="Alliance Icon"
                    className="w-36 h-36 rounded-full border-4 border-gray-300"
                  />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800 mb-2">{alliance.name}</p>
                  <p className="text-gray-600 mb-4">{alliance.description}</p>
                  {alliance.community_list && alliance.community_list.length > 0 ? (
                    <ul className="flex flex-wrap justify-center gap-2">
                      {alliance.community_list.map((community) => (
                        <li
                          className="text-white bg-blue-600 p-2 rounded-full text-sm"
                          key={community.slug}
                        >
                          {community.name}
                        </li>
                      ))}
                    </ul>
                   
                  ) : (
                    <p className="text-gray-500 italic">No communities available.</p>
                  )}
                  <p>LvL 0</p>
                   <progress value={32} max={100}></progress>
                </div>
                <ul className='flex flex-col gap-3 mt-5'>
                <Lisidebar >members </Lisidebar>
                <Lisidebar >stats </Lisidebar>
                <Lisidebar>vault</Lisidebar>
                <Lisidebar>missions</Lisidebar>
                </ul>

              </div>
              <div className='flex items-center bg-slate-300 min-h-8 max-h-14 p-5 rounded-lg gap-3 w-full justify-end'>
                {profile.name}:
                <div className='w-8 h-8 bg-yellow-300 rounded-full'>
                </div>
                0 coins
                <div className='w-8 h-8 bg-green-300 rounded-full'>
                </div>
                0 contribution power 
                <div className='w-8 h-8 bg-blue-300 rounded-full'>
                </div>
                members count 0
                <div className='bg-cyan-200 p-2 rounded-lg'>
                  create post
                </div>
              </div>
                
            </div>
          )
        )
      ) : (
        <p className="text-center text-lg font-semibold text-gray-600">Please log in to view your alliance.</p>
      )}
    </>
  );
};

export default RealHome;
