import React from 'react'

const AllianceInfo = ({allianceData}) => {
  return (
    <div>
    <h2 className="text-xl font-semibold text-gray-700 my-5">Alliance</h2>
    <div className="mt-4 flex items-center">
      <img
        src={allianceData.icon || defaultAllianceIcon}
        alt="Alliance Icon"
        className="w-12 h-12 rounded-full border-2 border-gray-300 mr-4"
      />
      <div>
        <p className="text-gray-800 text-lg">{allianceData.name}</p>
        <p className="text-gray-600 text-sm">{allianceData.description}</p>
        <ul className="flex flex-wrap justify-center gap-2 mt-2">
          {allianceData.community_list?.map((community) => (
            <li
              className="text-white bg-blue-600 p-2 rounded-full text-sm"
              key={community.slug}
            >
              {community.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  )
}

export default AllianceInfo;