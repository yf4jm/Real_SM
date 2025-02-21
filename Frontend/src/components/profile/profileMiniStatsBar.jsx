import React from 'react'

const ProfileMiniStatsBar = ({profile}) => {
  return (
    <div className='flex items-center bg-slate-300 min-h-8 max-h-14 p-5 rounded-lg gap-3 w-full justify-end'>
    {profile.name}:
    <div className='w-8 h-8 bg-yellow-300 rounded-full'></div>
    0 coins
    <div className='w-8 h-8 bg-green-300 rounded-full'></div>
    0 contribution power
    <div className='w-8 h-8 bg-blue-300 rounded-full'></div>
    members count 0
    <div className='bg-cyan-200 p-2 rounded-lg'>
      create post
    </div>
  </div>
  )
}

export default ProfileMiniStatsBar