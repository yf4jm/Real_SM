import React from 'react'
import PostCard from '../cards/post'
const PostsList = ({postsData}) => {
  return (
    <div>
    {postsData.length > 0 ? (
      postsData
        .filter(postData => postData.status === 'PUBLIC')
        .map(postData => (
          <div className='my-5' key={postData.id}>
            <PostCard
              id={postData.id}
              title={postData.title}
              author={postData.author}
              description={postData.description}
              is_liked={postData.is_liked}
              likes_count={postData.likes_count}
              media={postData.media}
              opts={postData.choices}
              created_on={postData.created_on}
              clicks_count={postData.clicks_count}
              type={postData.type}
            />
          </div>
        ))
    ) : (
      <p className="text-gray-500 text-center">No posts available.</p>
    )}
  </div>
  )
}

export default PostsList