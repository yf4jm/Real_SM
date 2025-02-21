import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import profileAllianceData from '../../fetch/profileAllianceData';
import defaultAllianceIcon from '../../assets/alliance.png';
import AllianceLeftCard from '../../components/alliance/allianceLeftCard';
import ProfileMiniStatsBar from '../../components/profile/profileMiniStatsBar';

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
              <AllianceLeftCard alliance={alliance} />
              <ProfileMiniStatsBar profile={profile} />
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
