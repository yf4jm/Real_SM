import React from 'react'

const SecondaryTag = ({object}) => {
  return (
    <li
        className=" bg-secondary text-white p-2 rounded-full text-sm"
        
            >
              {object.name}
    </li>
  )
}

export default SecondaryTag