import React from "react";

const PollModal = ({ id, title, opts, author, formattedDate, onClose, actions }) => {
  return (
    <dialog id={`poll_modal_${id}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-gray-600">{formattedDate}</p>
        <ul className="flex flex-col gap-4 my-4">
          {opts.map((opt) => (
            <li key={opt.id} className="flex items-center bg-primary p-4 rounded-lg">
              {opt.image && (
                <img
                  src={opt.image}
                  alt="Option"
                  className="w-16 h-16 rounded-md object-cover"
                />
              )}
              <span className="ml-4 text-secondary-content font-medium">{opt.text}</span>
            </li>
          ))}
        </ul>
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
        {/* Render the shared PostActions component */}
        {/* {actions && <div className="mt-4">{actions}</div>} */}
      </div>
    </dialog>
  );
};

export default PollModal;
