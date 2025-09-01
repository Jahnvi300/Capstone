import React, { useMemo, useState } from "react";
import Sidebar from "./Sidebar";

const statuses = ["Open", "In Progress", "Resolved", "Rejected"];

export default function AdminPage({ onLogout, grievances, addResponse, setStatus, history, stats }) {
  const [selected, setSelected] = useState("inbox");
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [responses, setResponses] = useState({});

  const categories = useMemo(() => {
    const s = new Set(["All"]);
    grievances.forEach(g => s.add(g.category));
    return Array.from(s);
  }, [grievances]);

  const filtered = useMemo(() => {
    return grievances.filter(g => {
      const matchesText =
        !query.trim() ||
        g.text.toLowerCase().includes(query.toLowerCase()) ||
        (g.submitterName || "").toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categoryFilter === "All" || g.category === categoryFilter;
      const matchesStatus = statusFilter === "All" || g.status === statusFilter;
      return matchesText && matchesCategory && matchesStatus;
    });
  }, [grievances, query, categoryFilter, statusFilter]);

  const repliedComplaints = grievances.filter(g => g.response?.trim());
  const sortedComplaints = [...grievances].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const respond = (id) => {
    const text = responses[id]?.trim();
    if (!text) return;
    addResponse(id, text, "In Progress");
    setResponses(prev => ({ ...prev, [id]: "" }));
  };

  const renderContent = () => {
    if (selected === "inbox") {
      return (
        <>
          <h2>Complaint Inbox</h2>
          <div style={{ marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              placeholder="Search by text or submitter..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ flexGrow: 1, padding: 10, borderRadius: 8, border: "1px solid #d7dbe0" }}
            />
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ borderRadius: 8, border: "1px solid #d7dbe0", padding: 10 }}>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ borderRadius: 8, border: "1px solid #d7dbe0", padding: 10 }}>
              {["All", ...statuses].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          {filtered.length === 0 ? (
            <div>No complaints match your filters.</div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {filtered.map(item => (
                <div key={item.id} style={{ padding: 12, border: "1px solid #eef1f5", borderRadius: 10, background: "#fff" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <strong>{item.submitterName} ({item.submittedBy})</strong>
                    <span style={{ padding: "4px 10px", borderRadius: 999, fontSize: 12, background: "#f1f5ff", color: "#274690", fontWeight: 700 }}>{item.category}</span>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      fontSize: 12,
                      background: item.status === "Open" ? "#fdecec" : item.status === "In Progress" ? "#fff7e6" : "#e9f9ef",
                      color: item.status === "Open" ? "#c0392b" : item.status === "In Progress" ? "#ad6a00" : "#1e7e34"
                    }}>{item.status}</span>
                    <span style={{ marginLeft: "auto", fontSize: 12, color: "#6b7280" }}>{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                  <div style={{ marginTop: 8 }}>{item.text}</div>
                  {item.response && (
                    <div style={{ marginTop: 8, backgroundColor: "#f7f9ff", padding: 10, borderRadius: 8 }}>
                      <strong>Response:</strong> {item.response}
                    </div>
                  )}

                  <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      placeholder="Write response"
                      value={responses[item.id] || ""}
                      onChange={e => setResponses(prev => ({ ...prev, [item.id]: e.target.value }))}
                      style={{ flexGrow: 1, padding: 10, borderRadius: 8, border: "1px solid #d7dbe0" }}
                    />
                    <button
                      style={{ backgroundColor: "#2166f7", color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer" }}
                      onClick={() => respond(item.id)}
                    >
                      Send
                    </button>
                    <select
                      value={item.status}
                      onChange={e => setStatus(item.id, e.target.value)}
                      style={{ borderRadius: 8, border: "1px solid #d7dbe0", padding: 10 }}
                    >
                      {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      );
    }

    if (selected === "sorted") {
      return (
        <>
          <h2>Sorted Complaints</h2>
          {sortedComplaints.length === 0 ? (
            <div>No complaints.</div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {sortedComplaints.map(g => (
                <li key={g.id} style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
                  <strong>{g.submitterName}</strong> ({g.submittedBy}) - {g.category} - {g.status} - {new Date(g.createdAt).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </>
      );
    }

    if (selected === "replied") {
      return (
        <>
          <h2>Replied Complaints</h2>
          {repliedComplaints.length === 0 ? (
            <div>No replied complaints yet.</div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {repliedComplaints.map(g => (
                <li key={g.id} style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
                  <div>
                    <strong>{g.submitterName}</strong> ({g.submittedBy}) - {g.category} - {g.status}
                  </div>
                  <div style={{ fontStyle: "italic", marginTop: 4 }}>Response: {g.response}</div>
                </li>
              ))}
            </ul>
          )}
        </>
      );
    }

    if (selected === "history") {
      return (
        <>
          <h2>History</h2>
          {history.length === 0 ? (
            <div>No activity yet.</div>
          ) : (
            <div style={{ maxHeight: 520, overflowY: "auto" }}>
              {history.map((h, i) => (
                <div key={i} style={{ border: "1px solid #eef1f5", padding: 10, borderRadius: 10, marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{h.action}</strong>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{new Date(h.ts).toLocaleString()}</span>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 14 }}>
                    <div>
                      <strong>By:</strong> {h.item.submitterName} ({h.item.submittedBy})
                    </div>
                    <div>
                      <strong>Category:</strong> {h.item.category}
                    </div>
                    <div>
                      <strong>Status:</strong> {h.item.status}
                    </div>
                    <div style={{ marginTop: 6 }}>{h.item.text}</div>
                    {h.item.response && (
                      <div style={{ marginTop: 6 }}>
                        <strong>Response:</strong> {h.item.response}
                      </div>
                    )}
                  </div>
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
      <Sidebar role="admin" selected={selected} setSelected={setSelected} userName="Admin" onLogout={onLogout} />
      <main style={{ marginLeft: 260, padding: 24, flexGrow: 1 }}>
        {renderContent()}
      </main>
    </div>
  );
}
