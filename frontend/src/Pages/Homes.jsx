import { useState, useEffect } from "react";
import api from "../api";
import Note from "../Components/Note";
import "../Styles/Home.css";
import "../styles/Note.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchNotes();
    }, []);

    // Fetch notes only ONCE (page load)
    const fetchNotes = async () => {
        try {
            const res = await api.get("/api/notes/");
            setNotes(res.data);
        } catch (err) {
            alert(err);
        }
    };

    // DELETE (fast)
    const deleteNote = async (id) => {
        try {
            await api.delete(`/api/notes/delete/${id}/`);
            setNotes((prev) => prev.filter((note) => note.id !== id));
        } catch (error) {
            alert(error);
        }
    };

    // UPDATE (fast)
    const updateNote = async (id, updatedData) => {
        try {
            const res = await api.put(`/api/notes/update/${id}/`, updatedData);
            setNotes((prev) =>
                prev.map((note) =>
                    note.id === id ? res.data : note
                )
            );
        } catch (error) {
            alert(error);
        }
    };

    // CREATE (fast)
    const createNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/notes/", { title, content });
            setNotes((prev) => [res.data, ...prev]);

            // Clear form
            setTitle("");
            setContent("");
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="home-container">
            <h2>Notes</h2>

            {notes.length === 0 && <p>No notes yet.</p>}

            {notes.map((note) => (
                <Note
                    key={note.id}
                    note={note}
                    onDelete={deleteNote}
                    onUpdate={updateNote}
                />
            ))}

            <h2>Create a Note</h2>

            <form onSubmit={createNote} className="note-form">
                <label>Title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Content</label>
                <textarea
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit">Add Note</button>
            </form>
        </div>
    );
}

export default Home;
