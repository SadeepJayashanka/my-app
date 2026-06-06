import { useState, useEffect } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/items")
      .then((r) => r.json())
      .then(setItems)
      .catch((err) => console.error(err));
  }, []);

  async function addItem() {
    if (!name.trim()) return;

    const res = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const item = await res.json();

    setItems((prev) => [item, ...prev]);
    setName("");
  }

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h1>Items</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          style={{ flex: 1, padding: "8px 12px" }}
        />

        <button onClick={addItem}>Add</button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id || item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
