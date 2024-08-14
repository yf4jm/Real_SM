import React, { useContext } from 'react';
import { Context } from '../../App';
import defaultProfileIcon from '../../assets/guild-icon.svg';
import defaultAllianceIcon from '../../assets/guild-icon.svg';
import bg from '../../assets/bg.avif';

const ProfileDetails = () => {
  const [profile] = useContext(Context);
    
  // Static random data
  const staticProfile = {
    icon: profile?.icon || defaultProfileIcon,
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    bio: "Just a random user on the internet.",
    birth_date: "1990-01-01",
    created_on: "2024-07-14T13:24:45.587629Z",
  };

  const staticAlliance = {
    icon: defaultAllianceIcon,
    name: "Random Alliance",
    description: "This is a description of a random alliance.",
    community_list: [
      { slug: "community-1", name: "Community One" },
      { slug: "community-2", name: "Community Two" },
    ],
  };

  return (
<div 
  className="min-h-screen flex justify-center items-center bg-repeat" 
  style={{ backgroundImage: `url(${bg})` }}
>
      <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img
            src={staticProfile.icon}
            alt="Profile Icon"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
        </div>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{staticProfile.name}</h1>
          <p className="text-gray-500">@{staticProfile.username}</p>
          {staticProfile.bio && <p className="text-gray-600 mt-2">{staticProfile.bio}</p>}
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Profile Information</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-800">{staticProfile.email}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Birth Date:</span>
              <span className="text-gray-800">{staticProfile.birth_date}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Member Since:</span>
              <span className="text-gray-800">
                {new Date(staticProfile.created_on).toLocaleDateString()}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Alliance</h2>
          <div className="mt-4 flex items-center">
            <img
              src={staticAlliance.icon}
              alt="Alliance Icon"
              className="w-12 h-12 rounded-full border-2 border-gray-300 mr-4"
            />
            <div>
              <p className="text-gray-800 text-lg">{staticAlliance.name}</p>
              <p className="text-gray-600 text-sm">{staticAlliance.description}</p>
              <ul className="flex flex-wrap justify-center gap-2 mt-2">
                {staticAlliance.community_list.map((community) => (
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
      </div>

    </div>
  );
};

export default ProfileDetails;
