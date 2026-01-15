import React, { useState } from "react";
import "../Styles/EditNote.css";

function EditNote({ note, onUpdate, onCancel }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate(note.id, {
      title,
      content,
    });
  };

  return (
    <div className="note-container edit-mode">
      <form onSubmit={handleSubmit}>
        <input
          className="note-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
        />

        <textarea
          className="note-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note content"
          required
        />

        <div className="note-actions">
          <button type="submit" className="update-button">
            Update
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNote;
