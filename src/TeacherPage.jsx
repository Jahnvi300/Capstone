import React, { useMemo, useState } from "react";
import Sidebar from "./Sidebar";

export default function TeacherPage({ userName, onLogout, addGrievance, grievances, stats }) {
  const [selected, setSelected] = useState("newComplaint");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");

  const myList = useMemo(
    () => grievances.filter(g => g.submittedBy === "Teacher" && (g.submitterName || "").toLowerCase() === (userName || "").toLowerCase()),
    [grievances, userName]
  );

  const submit = () => {
    if (!text.trim()) return;
    addGrievance(text, "Teacher", userName, category);
    setText("");
    setCategory("General");
  };

  const renderContent = () => {
    if (selected === "newComplaint") {
      return (
        <>
          <h2>Submit New Complaint</h2>
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: "100%", padding: 10, marginTop: 4, marginBottom: 16 }}>
            <option>General</option><option>Examination</option><option>Infrastructure</option><option>Finance</option><option>Hostel</option><option>Faculty</option>
          </select>
          <label>Complaint</label>
          <textarea
            placeholder="Describe your issue clearly..."
            value={text}
            onChange={e => setText(e.target.value)}
            style={{ width: "100%", minHeight: 120, padding: 12, marginTop: 4 }}
          />
          <button
            onClick={submit}
            style={{ marginTop: 12, padding: "10px 16px", backgroundColor: "#2166f7", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
          >
            Submit
          </button>
        </>
      );
    }

    if (selected === "myComplaints") {
      return (
        <>
          <h2>My Complaint Status</h2>
          {myList.length === 0 ? (
            <div>No complaints yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {myList.map(item => (
                <div key={item.id} style={{ padding: 12, border: "1px solid #eef1f5", borderRadius: 10, background: "#fff" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <strong>{item.category}</strong>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      fontSize: 12,
                      background: item.status === "Open" ? "#fdecec" : item.status === "In Progress" ? "#fff7e6" : "#e9f9ef",
                      color: item.status === "Open" ? "#c0392b" : item.status === "In Progress" ? "#ad6a00" : "#1e7e34",
                      fontWeight: 700
                    }}>{item.status}</span>
                    <span style={{ marginLeft: "auto", fontSize: 12, color: "#6b7280" }}>{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                  <div style={{ marginTop: 8 }}>{item.text}</div>
                  {item.response && (
                    <div style={{ marginTop: 8, backgroundColor: "#f7f9ff", padding: 10, borderRadius: 8 }}>
                      <strong>Admin Response:</strong> {item.response}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      );
    }

    if (selected === "stats") {
      return (
        <>
          <h2>Statistics</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>Total Grievances: {stats.total}</li>
            <li>Open: {stats.open}</li>
            <li>In Progress: {stats.inProgress}</li>
            <li>Resolved: {stats.resolved}</li>
          </ul>
        </>
      );
    }

    return null;
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="teacher" selected={selected} setSelected={setSelected} userName={userName} onLogout={onLogout} />
      <main style={{ marginLeft: 260, padding: 24, flexGrow: 1 }}>
        {renderContent()}
      </main>
    </div>
  );
}
