import React from 'react'
import Lisidebar from '../li/sidebar'
const AllianceLeftCard = ({alliance}) => {
  return (
    <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
    <div className="flex justify-center mb-4">
      <img
        src={alliance.icon || defaultAllianceIcon}
        alt="Alliance Icon"
        className="w-36 h-36 rounded-full border-4 border-gray-300"
      />
    </div>
    <div className="text-center">
      <p className="text-2xl font-bold text-gray-800 mb-2">{alliance.name}</p>
      <p className="text-gray-600 mb-4">{alliance.description}</p>
      {alliance.community_list && alliance.community_list.length > 0 ? (
        <ul className="flex flex-wrap justify-center gap-2">
          {alliance.community_list.map((community) => (
            <li
              className="text-white bg-blue-600 p-2 rounded-full text-sm"
              key={community.slug}
            >
              {community.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No communities available.</p>
      )}
      <p>LvL 0</p>
      <progress value={32} max={100}></progress>
    </div>
    <ul className='flex flex-col gap-3 mt-5'>
      <Lisidebar>members</Lisidebar>
      <Lisidebar>stats</Lisidebar>
      <Lisidebar>vault</Lisidebar>
      <Lisidebar>missions</Lisidebar>
    </ul>
  </div>
  )
}

export default AllianceLeftCard