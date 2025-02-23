import React from 'react'

const ProfileMiniStatsBar = ({profile}) => {
  return (
    <div className='flex items-center bg-base-200 min-h-8 max-h-14 p-5 rounded-lg gap-3 w-full justify-end'>
    {profile.name}:
    <div className='w-8 h-8 bg-yellow-300 rounded-full'></div>
    0 coins
    <div className='w-8 h-8 bg-green-300 rounded-full'></div>
    0 contribution power
    <div className='w-8 h-8 bg-blue-300 rounded-full'></div>
    members count 0
    <button className='btn btn-secondary btn-md'>
      create post
    </button>
  </div>
  )
}

export default ProfileMiniStatsBar