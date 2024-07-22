import React from 'react'
import Button from '../buttons/btn1'
const Navbar = () => {
  return (
    <>
    <div className='m-0 w-screen p-2 flex justify-between items-center text-gray-50 bg-gradient-to-r from-pink-700 to-gray-900'>
    <div>
    <h1>Real</h1>
    </div>
    <ul className='flex justify-between gap-5 items-center'>
        <li>Home</li>
        <li>Discover</li>
        <li><Button 
        value={"Login/Register"}
        ></Button></li>
    </ul> 
    </div>

    </>
  )
}

export default Navbar
