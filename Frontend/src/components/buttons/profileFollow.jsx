import React from 'react'
import { Context } from '../../App'
import { useContext } from 'react'
const ProfileFollowButton = ({id}) => {
  const [profile] = useContext(Context);
  return (
    <>
    {
      profile.id !== id &&(

        <button className='btn btn-primary btn-sm'>follow</button>
      )

    }
    
    </>
  )
}

export default ProfileFollowButton