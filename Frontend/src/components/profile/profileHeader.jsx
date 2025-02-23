import React from 'react'

const ProfileHeader = ({profileData}) => {
  return (
    <div className="text-center mb-6">
    <img
      src={profileData.icon || defaultProfileIcon}
      alt="Profile Icon"
      className="w-32 h-32 rounded-full border-4 border-gray-300 mx-auto"
    />
    <h1 className="text-3xl font-bold  mt-4">{profileData.name}</h1>
    <p className="">@{profileData.username}</p>
    {profileData.bio && <p className="mt-2">{profileData.bio}</p>}
  </div>
  )
}

export default ProfileHeader