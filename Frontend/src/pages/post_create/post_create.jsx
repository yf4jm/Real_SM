import React, { useState } from 'react';
import BlogForm from '../../components/post_forms/blogForm';
import PollForm from '../../components/post_forms/pollForm';
import QuizForm from '../../components/post_forms/quizForm';
import ComicForm from '../../components/post_forms/comicForm';
import NovelForm from '../../components/post_forms/novelForm.jsx';

const PostCreate = () => {
    const [postType, setPostType] = useState("blog");

    return (
        <>
            <ul className='flex gap-5'>
                <li onClick={() => setPostType("blog")}>blog</li>
                <li onClick={() => setPostType("poll")}>poll</li>
                <li onClick={() => setPostType("quiz")}>quiz</li>
                <li onClick={() => setPostType("comic")}>comic</li>
                <li onClick={() => setPostType("novel")}>novel</li>
            </ul>

            {/* Conditional rendering based on postType */}
            {postType === "blog" && <BlogForm />}
            {postType === "poll" && <PollForm />}
            {postType === "quiz" && <QuizForm />}
            {postType === "comic" && <ComicForm />}
            {postType === "novel" && <NovelForm />}
        </>
    );
};

export default PostCreate;
