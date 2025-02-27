import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import profileAllianceData from '../../fetch/profileAllianceData';
import defaultAllianceIcon from '../../assets/alliance.png';
import AllianceLeftCard from '../../components/alliance/allianceLeftCard';
import ProfileMiniStatsBar from '../../components/profile/profileMiniStatsBar';
import PostsList from '../../components/render/postsList';
import alliancePostsFetch from '../../fetch/alliance/alliancePostsFetch';
import { all } from 'axios';
const RealHome = () => {
  const [profile] = useContext(Context);
  const [alliance, setAlliance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postsData,setPostsData] = useState([]);
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
  useEffect(() => {
    const fetchAlliancePosts = async () => {
      if (alliance) {
        try {
          const res = await alliancePostsFetch(alliance.id,profile.id);
          setPostsData(res);
        } catch (error) {
          console.error("Error fetching alliance posts:", error);
        }
      }
    };

    if (alliance) {
      fetchAlliancePosts();
    }
  }, [alliance]);
  return (
    <>
      {profile ? (
        loading ? (
          <p className="text-center text-lg font-semibold text-gray-600">Loading...</p>
        ) : (
          alliance && (
            <div className='flex'>
              <AllianceLeftCard alliance={alliance} />
              <div className='flex flex-col w-full'>
              <ProfileMiniStatsBar profile={profile} />
              <div className='w-2/3 min-w-[500px]  mx-auto'>
              <PostsList postsData={postsData}/>
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
