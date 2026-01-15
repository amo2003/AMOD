import React, { useState } from "react";
import EditNote from "../Pages/EditNote";
import "../styles/Note.css";

function Note({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  if (isEditing) {
    return (
      <EditNote
        note={note}
        onUpdate={(id, data) => {
          onUpdate(id, data);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>

      <div className="note-actions">
        <button
          className="edit-button"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Note;
