import React from 'react'

const SecondaryTag = ({object}) => {
  return (
    <li
        className=" bg-secondary text-white p-2 rounded-full text-sm"
        key={object.slug}
            >
              {object.name}
    </li>
  )
}

export default SecondaryTag