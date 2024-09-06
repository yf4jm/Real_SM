import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const BlogForm = () => {
  const [value, setValue] = useState('');
  const quillRef = useRef(null);

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean']
  ];

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor(); // You can access the Quill instance like this
      // Add any custom behavior here using the editor instance
    }
  }, []);

  return (
    <>
      <p>Create Blog</p>
      <label htmlFor="title">Title: </label>
      <ReactQuill
        ref={quillRef} // Attach the ref to the ReactQuill component
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{
          toolbar: toolbarOptions,
        }}
      />
      {value}
    </>
  );
};

export default BlogForm;
