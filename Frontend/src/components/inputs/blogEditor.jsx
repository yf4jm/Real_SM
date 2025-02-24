import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import './styles.css'
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttonClass = "btn btn-sm btn-outline m-1";

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button className={buttonClass + (editor.isActive('bold') ? ' btn-primary' : '')} onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
      <button className={buttonClass + (editor.isActive('italic') ? ' btn-primary' : '')} onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
      <button className={buttonClass + (editor.isActive('underline') ? ' btn-primary' : '')} onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
      <button className={buttonClass + (editor.isActive('strike') ? ' btn-primary' : '')} onClick={() => editor.chain().focus().toggleStrike().run()}>S</button>
      <button className={buttonClass + (editor.isActive('heading', { level: 1 }) ? ' btn-primary' : '')} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
      <button className={buttonClass + (editor.isActive('bulletList') ? ' btn-primary' : '')} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
      <button className={buttonClass + (editor.isActive('orderedList') ? ' btn-primary' : '')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
      <button className={buttonClass + (editor.isActive('blockquote') ? ' btn-primary' : '')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo; Blockquote</button>
      <button className={buttonClass + (editor.isActive('codeBlock') ? ' btn-primary' : '')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>&lt;/&gt; Code</button>
      <button className={buttonClass} onClick={() => {
        const url = window.prompt('Enter URL');
        if (url) editor.chain().focus().setLink({ href: url }).run();
      }}>Link</button>
      <button className={buttonClass} onClick={() => {
        const url = window.prompt('Enter Image URL');
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }}>Image</button>
      <button className={buttonClass} onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
      <button className={buttonClass} onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
      <button className={buttonClass} onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
      <button className={buttonClass} onClick={() => editor.chain().focus().undo().run()}>Undo</button>
      <button className={buttonClass} onClick={() => editor.chain().focus().redo().run()}>Redo</button>
    </div>
  );
};

const BlogEditor = () => {
  const [content, setContent] = useState('');
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: 'Write something …',
    }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const plain = editor.getText();
      const json = editor.getJSON();
      console.log('Editor Content:', json);
      setContent(html);
    },
  });
  useEffect(() => {
    const handlePaste = (event) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            const reader = new FileReader();
            reader.onload = () => {
              const imageUrl = reader.result;
              editor.chain().focus().setImage({ src: imageUrl }).run();
            };
            reader.readAsDataURL(file);
          }
        }
      }
    };
  
    // Attach paste event listener
    const editorElement = document.querySelector('.ProseMirror');
    if (editorElement) {
      editorElement.addEventListener('paste', handlePaste);
    }
  
    // Cleanup listener on unmount
    return () => {
      if (editorElement) {
        editorElement.removeEventListener('paste', handlePaste);
      }
    };
  }, [editor]);
  // Handle drag and drop image upload
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        editor.chain().focus().setImage({ src: imageUrl }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  // Prevent default behavior for dragover
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full mx-auto mt-8">
      <MenuBar editor={editor} />
      
      <div 
        onDrop={handleDrop} 
        onDragOver={handleDragOver} 
        style={{ minHeight: '100px', textAlign: 'left' }}
      >
        
      
      
      <EditorContent editor={editor} className="border border-primary rounded-lg textarea textarea-primary p-4 min-h-[200px]" />
      </div>
      <div className="border border-dashed border-primary rounded-lg p-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">Preview:</h2>
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl" 
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </div>
    </div>
  );
};

export default BlogEditor;
