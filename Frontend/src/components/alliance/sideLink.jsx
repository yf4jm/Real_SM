import React from 'react'
import guild_icon from '../../assets/guild-icon.svg'
import { Link } from 'react-router-dom';
const SideLink = () => {
  return (
    <>
    <Link to="/alliance">
      <div className=' bottom-5 right-5 fixed'>
        <img src={guild_icon} alt="" className='w-16 h-16 rounded-full z-10'/>
      </div>
      </Link>
    </>
  )
}

export default SideLink
