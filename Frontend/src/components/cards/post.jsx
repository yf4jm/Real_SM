import React from 'react'
import BlogCard from './blog'
import QuizCard from './quiz'
import PollCard from './poll'
const PostCard = ({id,title,author,opts={},is_liked,likes_count,description="",media, created_on,type,clicks_count}) => {
    switch(type){
        case("blog"):
            return(
            <BlogCard
                id={id}
                title={title}
                author={author}
                description={description}
                is_liked={is_liked}
                likes_count={likes_count}
                media={media}
                created_on={created_on}
                clicks_count={clicks_count}
              />
            )
        case("poll"):
            return(
                <PollCard
                    id={id}
                    title={title}
                    author={author}
                    opts={opts}
                    is_liked={is_liked}
                    likes_count={likes_count}
                    created_on={created_on}
                    clicks_count={clicks_count}
                />
            )
        case("quiz"):
            return(
                <QuizCard
                    id={id}
                    title={title}
                    author={author}
                    opts={opts}
                    is_liked={is_liked}
                    likes_count={likes_count}
                    created_on={created_on}
                    clicks_count={clicks_count}
                />
            )
        

    }
}

export default PostCard
