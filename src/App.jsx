import { useState, useEffect } from "react";

export default function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("diaryEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!text.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: title || "Untitled",
      text,
      date: new Date().toLocaleString(),
    };

    setEntries([newEntry, ...entries]);
    setText("");
    setTitle("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>My Diary</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <textarea
        placeholder="Write your thoughts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: 100, padding: 8 }}
      />

      <button onClick={addEntry} style={{ marginTop: 10, padding: 10 }}>
        Save
      </button>

      <div style={{ marginTop: 30 }}>
        {entries.map((e) => (
          <div key={e.id} style={{ marginBottom: 20, borderBottom: "1px solid #ccc" }}>
            <h3>{e.title}</h3>
            <small>{e.date}</small>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
