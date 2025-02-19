import React from 'react'
import { Link } from 'react-router-dom'
const Lisidebar = ({children ,to,key}) => {
  return (
    <>
      <li key={key || ""} className='text-gray-600 hover:text-blue-600 transition-colors'>                
        <Link to={to || "#"} className='block py-2 px-3 rounded-lg hover:bg-gray-50'>
                  {children}
        </Link></li>
    </>
  )
}

export default Lisidebar
