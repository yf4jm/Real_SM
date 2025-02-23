import React from 'react'

const AllianceLeaderboard = () => {
  return (
   <>
   <div>
    <ul className='flex justify-between mx-60 my-16'>
        <li>Community</li>
        <li>Alliance</li>
        <li>User</li>
    </ul>
    <table className='w-full '>
        <tr className='justify-center items-center'>
            <th>rank</th>
            <th>user</th>
            <th>Contributions</th>
            <th>Contributions(community)</th>
        </tr>
        <tr className='justify-center items-center'>
            <td>#1</td>
            <td>user</td>
            <td>10000</td>
            <td>8653</td>
        </tr>
    </table>
   
   
   
   </div>
   </>
  )
}

export default AllianceLeaderboard