import React from "react";

const BlogModal = ({ id, title, formattedDate, media, description, author, onClose }) => {
  return (
    <dialog id={`post_modal_${id}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-gray-600">{formattedDate}</p>
        {media && (
          <figure className="max-h-96 w-full overflow-hidden">
            <img
              src={media}
              alt="Post image"
              className="h-full w-full object-cover"
            />
          </figure>
        )}
        {description?.text && <p className="py-4">{description.text}</p>}
        <div className="flex items-center gap-3 mt-4">
          <img
            src={author.icon}
            alt={author.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{author.name}</h3>
          </div>
        </div>
        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default BlogModal;
