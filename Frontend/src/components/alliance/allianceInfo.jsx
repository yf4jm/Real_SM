import React from 'react'
import SecondaryTag from '../li/secondaryTag';
const AllianceInfo = ({allianceData}) => {
  return (
    <div>
    <h2 className="text-xl font-semibold my-5">Alliance</h2>
    <div className="mt-4 flex items-center">
      <img
        src={allianceData.icon || defaultAllianceIcon}
        alt="Alliance Icon"
        className="w-12 h-12 rounded-full border-2  mr-4"
      />
      <div>
        <p className=" text-lg">{allianceData.name}</p>
        <p className=" text-sm">{allianceData.description}</p>
        <ul className="flex flex-wrap justify-center gap-2 mt-2">
          {allianceData.community_list?.map((community) => (
            <SecondaryTag  key={community.slug} object={community}/>
          ))}
        </ul>
      </div>
    </div>
  </div>
  )
}

export default AllianceInfo;