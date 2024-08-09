import React from 'react'
import { Link } from 'react-router-dom';
const Cli = ({value,url}) => {
  return (
    <div>
      <Link to={url}><li className='rounded-full p-3 bg-black text-white'>{value}</li></Link>
    </div>
  )
}

export default Cli