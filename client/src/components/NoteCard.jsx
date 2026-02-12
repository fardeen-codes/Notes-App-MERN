import { useState } from "react";

const NoteCard = ({ note, onDelete, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onUpdate(note._id, { title, content });
    setEdit(false);
  };

  return (
    <div style={styles.card}>
      {edit ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
          />
          <button onClick={handleSave} style={styles.saveBtn}>
            Save
          </button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div style={styles.actions}>
            <button onClick={() => setEdit(true)}>✏️</button>
            <button onClick={() => onDelete(note._id)}>🗑️</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;

/* ---------------- STYLES ---------------- */

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    position: "relative",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    minHeight: "60px",
  },
  saveBtn: {
    marginTop: "8px",
    padding: "6px 12px",
    background: "#49a09d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
