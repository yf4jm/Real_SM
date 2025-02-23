import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
// import defaultProfileIcon from '../../assets/guild-icon.svg';
// import defaultAllianceIcon from '../../assets/guild-icon.svg';
// import bg from '../../assets/bg.avif';
import profileAllianceData from '../../fetch/profileAllianceData';
import profileFetch from '../../fetch/profile/profileFetch';
import { useParams } from 'react-router-dom';
import profilePostsFetch from '../../fetch/profile/profilePostsFetch';

import NovelsList from '../../components/render/novelsList';
import ProfileHeader from '../../components/profile/profileHeader';
import PostsList from '../../components/render/postsList';
import AllianceInfo from '../../components/alliance/allianceInfo';
import ProfileInfo from '../../components/profile/profileInfo';
const ProfileDetails = () => {
  const [profile] = useContext(Context);
  const [allianceData, setAllianceData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [postsData, setPostsData] = useState([]);
  const { pk } = useParams();

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const [profileResponse, allianceResponse, postsResponse] = await Promise.all([
          profileFetch(pk),
          profileAllianceData(pk),
          profilePostsFetch(pk, profile?.id)
        ]);

        setProfileData(profileResponse);
        setAllianceData(allianceResponse.alliance);
        setPostsData(postsResponse);

      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, [pk, profile]);

  if (!profileData || !allianceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-repeat">
    <div className="max-w-3xl w-full p-6 shadow-lg rounded-lg">
      <ProfileHeader profileData={profileData} />
      <ProfileInfo profileData={profileData} />
      <AllianceInfo allianceData={allianceData} />
      <NovelsList postsData={postsData} />
      <PostsList postsData={postsData} />
    </div>
  </div>
  );
};

export default ProfileDetails;
