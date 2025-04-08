import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import blogDetailsFetch from '../../fetch/posts/blogDetailsFetch';
import Api from '../../AxiosInstance';

const Modal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const postId = searchParams.get('post_id');
  const postType = searchParams.get('post_type');
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  
  // Function to close the modal and remove the parameters
  const handleCloseModal = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('post_id');
    newSearchParams.delete('post_type');
    navigate({ search: newSearchParams.toString() }, { replace: true });
  }, [searchParams, navigate]);

  // Effect to show the modal and fetch data when postId is present
  useEffect(() => {
    const fetchData = async () => {
      if (!postId || !postType) return;
      
      try {
        // Show modal first - better user experience
        const modalElement = document.getElementById(`modal-${postId}`);
        if (modalElement) modalElement.showModal();
        
        setLoading(true);
        const res = await Api.get(`/api/${postType}/${postId}`);
        setPostData(res.data);
      } catch (error) {
        console.error("Error getting post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Clean up function to reset state when component unmounts or postId changes
    return () => {
      setPostData(null);
      setLoading(false);
    };
  }, [postId, postType]);

  // Effect to handle the Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCloseModal]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;
    
    try {
      // Implement comment submission logic here
      // await Api.post(`/api/${postType}/${postId}/comments`, { content: comment });
      
      // Clear comment field after submission
      setComment('');
      
      // Optionally refresh comment list
      // const res = await Api.get(`/api/${postType}/${postId}`);
      // setPostData(res.data);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!postId) return null;

  return (
    <dialog id={`modal-${postId}`} className="modal overflow-auto w-1/3">
      <div className=" w-full h-full bg-base-100 p-5">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleCloseModal}
        >
          ✕
        </button>
        <div className='mt-10'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            postData && (
              <div className="space-y-4">
                {postData.media && (
                  <img 
                    src={postData.media} 
                    alt={postData.title} 
                    className="w-full  object-cover rounded-lg" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <h2 className="text-xl font-bold">{postData.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: postData.description }} />
                
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2">Comments</h3>
                  <div className="flex flex-col gap-2">
                    <textarea 
                      className="textarea textarea-bordered textarea-secondary w-full" 
                      placeholder="Add your comment..."
                      value={comment}
                      onChange={handleCommentChange}
                    />
                    <button 
                      className="btn btn-primary self-end" 
                      onClick={handleSubmitComment}
                      disabled={!comment.trim()}
                    >
                      Submit
                    </button>
                    
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;