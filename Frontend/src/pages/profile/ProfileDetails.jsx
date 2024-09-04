import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import defaultProfileIcon from '../../assets/guild-icon.svg';
import defaultAllianceIcon from '../../assets/guild-icon.svg';
import bg from '../../assets/bg.avif';
import profileAllianceData from '../../fetch/profileAllianceData';
import profileFetch from '../../fetch/profile/profileFetch';
import { useParams } from 'react-router-dom';
import profilePostsFetch from '../../fetch/profile/profilePostsFetch';
// import BlogCard from '../../components/cards/blog';
// import PollCard from '../../components/cards/poll';
import NovelCard from '../../components/cards/novel';
import PostCard from '../../components/cards/post';
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
    <div
      className="min-h-screen flex justify-center items-center bg-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img
            src={profileData.icon || defaultProfileIcon}
            alt="Profile Icon"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
        </div>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{profileData.name}</h1>
          <p className="text-gray-500">@{profileData.username}</p>
          {profileData.bio && <p className="text-gray-600 mt-2">{profileData.bio}</p>}
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 my-5">Profile Information</h2>
          <ul className="mt-4 space-y-2">
            {profileData.email && (
              <li className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-800">{profileData.email}</span>
              </li>
            )}
            {profileData.birth_date && (
              <li className="flex justify-between">
                <span className="text-gray-600">Birth Date:</span>
                <span className="text-gray-800">{profileData.birth_date}</span>
              </li>
            )}
            <li className="flex justify-between">
              <span className="text-gray-600">Member Since:</span>
              <span className="text-gray-800">
                {new Date(profileData.created_on).toLocaleDateString()}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700 my-5">Alliance</h2>
          <div className="mt-4 flex items-center">
            <img
              src={allianceData.icon || defaultAllianceIcon}
              alt="Alliance Icon"
              className="w-12 h-12 rounded-full border-2 border-gray-300 mr-4"
            />
            <div>
              <p className="text-gray-800 text-lg">{allianceData.name}</p>
              <p className="text-gray-600 text-sm">{allianceData.description}</p>
              <ul className="flex flex-wrap justify-center gap-2 mt-2">
                {allianceData.community_list?.map((community) => (
                  <li
                    className="text-white bg-blue-600 p-2 rounded-full text-sm"
                    key={community.slug}
                  >
                    {community.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='my-12'>
          <h1 className='text-xl font-semibold text-gray-700 underline decoration-double my-5'>Novels</h1>
          {postsData.filter(postData => postData.type==='novel').map(
            (novel)=>(
                <NovelCard 
                key={novel.id}
                media={novel.media}
                title={novel.title}
                />
            )
          )
          
}
        </div>

        <div>
          {postsData.length > 0 ? (
            postsData
              .filter(postData => postData.status === 'PUBLIC')
              .map(postData => (
                <div className='my-5' key={postData.id}>
                    <PostCard
                    
                      id={postData.id}
                      title={postData.title}
                      author={postData.author}
                      description={postData.description}
                      is_liked={postData.is_liked}
                      likes_count={postData.likes_count}
                      media={postData.media}
                      opts={postData.choices}
                      created_on={postData.created_on}
                      type={postData.type}
                    />

              </div>
              ))
          ) : (
            <p className="text-gray-500 text-center">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
