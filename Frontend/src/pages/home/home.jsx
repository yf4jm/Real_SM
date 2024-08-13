import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import profileAllianceData from '../../fetch/profileAllianceData';
import defaultAllianceIcon from '../../assets/alliance.png';

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
            <div className="max-w-md w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
              <div className="flex justify-center mb-4">
                <img
                  src={alliance.icon || defaultAllianceIcon}
                  alt="Alliance Icon"
                  className="w-24 h-24 rounded-full border-4 border-gray-300"
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
