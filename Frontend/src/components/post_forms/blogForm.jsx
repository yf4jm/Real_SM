import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import '../../App.css'; // Ensure fonts are declared in your custom CSS

// Register fancy fonts globally
const Quill = ReactQuill.Quill;
const Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway","SUSE", "Montserrat", "Lato", "Rubik", "Playfair_Display", "Merriweather", "Libre Baskerville", "Zilla Slab"];
Quill.register(Font, true);

const BlogForm = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const quillRef = useRef(null);

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: Font.whitelist }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }, { direction: 'rtl' }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }, 'formula'],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ];

  return (
    <>
      <p>Create Blog</p>
      <label htmlFor="title">Title: </label>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <div className='w-full'>
        <ReactQuill
        theme='bubble'
          ref={quillRef}
          value={description}
          onChange={setDescription}
          modules={{
            toolbar: toolbarOptions,
          }}
          className='w-1/2 h-auto'
        />
      </div>

      {/* Preview the description */}
      <div className="preview">
        <h2>{description}</h2>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </>
  );
};

export default BlogForm;
