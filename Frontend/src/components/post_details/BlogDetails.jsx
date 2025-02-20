import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogDetailsFetch from '../../fetch/posts/blogDetailsFetch';
import getFormattedDate from '../../utils/getFormattedDate';
const BlogDetails = () => {
  const { pk } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]); // Comments state
  const [newComment, setNewComment] = useState(''); // New comment input
  useEffect(() => {
    const blogFetch = async () => {
      try {
        const res = await blogDetailsFetch(pk);
        setBlog(res);
        setComments([
            { id: 1, author: 'Alice', text: 'Great post! 🚀' },
            { id: 2, author: 'Bob', text: 'Very insightful. Thanks!' }
          ]);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch blog details.');
      }
    };

    blogFetch();
  }, [pk]);
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Add new comment to the list (mocked for now)
    const comment = { id: Date.now(), author: 'You', text: newComment };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!blog) return <div>Loading blog details...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Blog Cover Image */}
      {blog.media && <img src={blog.media} alt={blog.title} className="w-full h-64 object-cover rounded-lg" />}

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>



      {/* Blog Description */}
      <div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: blog.description.html }} />
      {/* Author Info */}
      <div className="flex items-center mt-4">
        <img src={blog.author.icon} alt={blog.author.name} className="w-12 h-12 rounded-full mr-3" />
        <div>
          <p className="text-lg font-medium">{blog.author.name}</p>
          <p className="text-sm text-gray-500">{getFormattedDate(blog.created_on)}</p>
        </div>
      </div>
      {/* Blog Stats */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex space-x-4">
          <p>👍 {blog.likes_count} Likes</p>
          <p>👁️ {blog.clicks_count} Views</p>
        </div>
        <p className={`px-3 py-1 rounded-full text-white ${blog.status === 'PUBLIC' ? 'bg-green-500' : 'bg-red-500'}`}>
          {blog.status}
        </p>
    </div>


{/* Comment Form */}
        <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">💬 Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                rows="4"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Post Comment
            </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
            {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
                comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-100 rounded-lg">
                    <p className="font-medium">{comment.author}</p>
                    <p>{comment.text}</p>
                </div>
                ))
            )}
            </div>
      </div>
    </div>
  );
};

export default BlogDetails;
