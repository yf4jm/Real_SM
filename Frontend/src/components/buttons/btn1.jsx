import React from 'react'

const Button = ({value,className}) => {
  return (
    <div className={className}>
      <button className='bg-sky-500/100 rounded-lg py-2 px-3 w-auto'>{value}</button>
    </div>
  )
}

export default Button
