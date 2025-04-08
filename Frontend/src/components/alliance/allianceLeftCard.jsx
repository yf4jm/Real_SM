  import React from 'react'
  import Lisidebar from '../li/sidebar'
  import SecondaryTag from '../li/secondaryTag'
  const AllianceLeftCard = ({alliance}) => {
    return (
      <div className="max-w-md w-full p-6 shadow-lg rounded-lg">
      <div className="flex justify-center mb-4">
        <img
          src={alliance.icon || defaultAllianceIcon}
          alt="Alliance Icon"
          className="w-36 h-36 rounded-full border-4 border-gray-300"
        />
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold mb-2">{alliance.name}</p>
        <p className="mb-4">{alliance.description}</p>
        {alliance.community_list && alliance.community_list.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-2">
            {alliance.community_list.map((community) => (
              <SecondaryTag key={community.slug} object={community}/>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No communities available.</p>
        )}
        <div className='flex items-center justify-evenly container bg-base-300 p-3 rounded-lg my-4'>
        <p>LvL 0</p>
        <progress className='progress progress-secondary w-56' value={32} max={100}></progress>
        </div>
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