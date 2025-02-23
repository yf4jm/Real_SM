import React from 'react'
import { Link } from 'react-router-dom'
const Lisidebar = ({children ,to,key}) => {
  return (
    <>
      <li key={key || ""} className='btn-primary btn'>                
        <Link to={to || "#"} className='block py-2 px-3 rounded-lg'>
                  {children}
        </Link></li>
    </>
  )
}

export default Lisidebar
