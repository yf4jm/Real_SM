import React from 'react'
import ElementCard from '../cards/element'
const NovelsList = ({postsData}) => {
  return (
    <div className='my-12'>
    <h1 className='text-xl font-semibold text-gray-700 underline decoration-double my-5'>Novels</h1>
    {postsData.filter(postData => postData.type === 'novel').map(
      (novel) => (
        <ElementCard
          key={novel.id}
          media={novel.media}
          title={novel.title}
        />
      )
    )}
  </div>
  )
}

export default NovelsList