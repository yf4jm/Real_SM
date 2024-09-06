import React from 'react'

const ElementCard = ({media,title}) => {
  return (
    <>
    <div className='relative'>
    <img className="w-36 h-56 rounded-lg" src={media} alt="" />
    <span className='absolute bottom-0 left-0 text-white text-clip w-36 text-center'>{title}</span>

    </div>
     
    </>
  )
}

export default ElementCard
