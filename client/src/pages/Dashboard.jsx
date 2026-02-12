import { useEffect, useState } from "react";
import api from "../api/axios";
import NoteCard from "../components/NoteCard"
import Navbar from "./Navbar";


const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes/getnotes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔹 Create Note
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      setLoading(true);
      const res = await api.post("/notes/createnote", { title, content });
      setNotes([res.data, ...notes]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete Note
  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/deletenote/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Update Note
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await api.patch(`/notes/updatenote/${id}`, updatedData);
      setNotes(notes.map((n) => (n._id === id ? res.data : n)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
       <Navbar />
      
      <h1 style={styles.heading}>📝 My Notes</h1>

      {/* CREATE NOTE */}
      <form onSubmit={handleAdd} style={styles.form}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />
        <button style={styles.button}>
          {loading ? "Adding..." : "Add Note"}
        </button>
      </form>

      {/* NOTES LIST */}
      <div style={styles.grid}>
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "#f4f6fb",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "600px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    minHeight: "80px",
  },
  button: {
    alignSelf: "flex-end",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    cursor: "pointer",
  },
  grid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
};
