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
            <div className='flex justify-center gap-20'>
                <ul className='flex gap-3 flex-col'>
                    <li  className='w-48 bg-green-500 rounded-xl p-3' onClick={() => setPostType("blog")}>blog</li>
                    <li className='w-48 bg-green-500 rounded-xl p-3' onClick={() => setPostType("poll")}>poll</li>
                    <li className='w-48 bg-green-500 rounded-xl p-3' onClick={() => setPostType("quiz")}>quiz</li>
                    <li className='w-48 bg-green-500 rounded-xl p-3' onClick={() => setPostType("comic")}>comic</li>
                    <li className='w-48 bg-green-500 rounded-xl p-3'onClick={() => setPostType("novel")}>novel</li>
                </ul>
                <div className='bg-gray-200'>
                    {/* Conditional rendering based on postType */}
                    {postType === "blog" && <BlogForm />}
                    {postType === "poll" && <PollForm />}
                    {postType === "quiz" && <QuizForm />}
                    {postType === "comic" && <ComicForm />}
                    {postType === "novel" && <NovelForm />}
                </div>
            </div>
        </>
    );
};

export default PostCreate;
