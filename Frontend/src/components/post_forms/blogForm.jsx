import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../../App.css'; // Ensure fonts are declared in your custom CSS
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import axios from 'axios'; // For API calls
import ImageResize from 'quill-image-resize-module-react';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';

// Register fancy fonts globally
const Quill = ReactQuill.Quill;
const Font = Quill.import("formats/font");
Font.whitelist = [
  "Roboto", "Raleway", "SUSE", "Montserrat", "Lato", 
  "Rubik", "Playfair_Display", "Merriweather", "Libre Baskerville", "Zilla Slab"
];
Quill.register(Font, true);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

const BlogForm = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null); // For uploaded image
  const [keywords, setKeywords] = useState([]); // Store keyword options
  const [selectedKeywords, setSelectedKeywords] = useState([]); // Store selected keywords
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

  // Function to handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0])); // Create preview URL
    }
  };

  // Fetch keyword suggestions from the API
  const fetchKeywords = async (inputValue) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/search-keywords/?q=${inputValue}`);
      const fetchedKeywords = response.data.map(keyword => ({
        value: keyword.keyword_name,
        label: keyword.keyword_name
      }));
      setKeywords(fetchedKeywords);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };

  // Handle keyword input change
  const handleKeywordInputChange = (inputValue) => {
    if (inputValue.length > 1) {
      fetchKeywords(inputValue);
    }
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const handlePost = () => {
    const editor = quillRef.current.getEditor();
    const plainText = editor.getText();
    console.log(editor);
    alert("clicked");
  };

  return (
    <>
      <p>Create Blog</p>
      <div className="flex flex-col justify-center w-full items-center gap-5">
        {/* Title Input */}
        <label htmlFor="title">Title: </label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="border-solid border-2 border-slate-400 w-1/2"
        />
        
        {/* Description (Quill Editor) */}
        <label htmlFor="description">Description: </label>
        <ReactQuill
          theme="snow"
          ref={quillRef}
          value={description}
          onChange={setDescription}
          modules={{
            imageActions: {},
            toolbar: toolbarOptions,
            imageResize: {
              parchment: Quill.import('parchment'),
              modules: ['Resize', 'DisplaySize']
            }
          }}
          className="w-1/2 h-auto border-solid border-2 border-slate-400"
        />
        
        {/* Alliance Selection */}
        <span>Alliance:</span>
        <Select
          name="Alliance"
          options={options} 
          onInputChange={handleKeywordInputChange}
          className="w-1/2"
        />

        {/* Status Selection */}
        <span>Status:</span>
        <select name="status" id="status" className="w-1/2">
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
          <option value="DRAFT">Draft</option>
        </select>
        
        {/* Keywords Selection */}
        <span>Keywords:</span>
        <CreatableSelect
          isMulti
          name="keywords"
          options={keywords}
          value={selectedKeywords}
          onChange={(newValue) => {
            const filteredKeywords = newValue.filter(keyword => !/\s/.test(keyword.label));
            if (filteredKeywords.length <= 10) {
              setSelectedKeywords(filteredKeywords);
            } else {
              alert("You can only select up to 10 keywords.");
            }
          }}
          onInputChange={handleKeywordInputChange}
          className="w-1/2"
          classNamePrefix="select"
        />
        
        {/* Image Upload */}
        <span>Cover:</span>
        <div className="flex flex-col items-center justify-center w-1/2">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        
        {/* Submit Button */}
        <button 
          className="bg-sky-300 w-1/2 py-2 rounded-lg"
          onClick={handlePost}
        >
          Submit
        </button>
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
