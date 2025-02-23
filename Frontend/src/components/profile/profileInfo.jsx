import React from 'react'

const ProfileInfo = ({profileData}) => {
  return (
    <div className="mb-6">
    <h2 className="text-xl font-semibold my-5">Profile Information</h2>
    <ul className="mt-4 space-y-2">
      {profileData.email && (
        <li className="flex justify-between">
          <span className="">Email:</span>
          <span className="">{profileData.email}</span>
        </li>
      )}
      {profileData.birth_date && (
        <li className="flex justify-between">
          <span className="">Birth Date:</span>
          <span className="">{profileData.birth_date}</span>
        </li>
      )}
      <li className="flex justify-between">
        <span className="">Member Since:</span>
        <span className="">
          {new Date(profileData.created_on).toLocaleDateString()}
        </span>
      </li>
    </ul>
  </div>
  )
}

export default ProfileInfo