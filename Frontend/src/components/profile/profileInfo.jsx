import React from 'react'

const ProfileInfo = ({profileData}) => {
  return (
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
  )
}

export default ProfileInfo