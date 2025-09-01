import React, { useState } from "react";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
    fontFamily: "Segoe UI, Arial, sans-serif"
  },
  card: {
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    width: 460,
    maxWidth: "90%"
  },
  h1: { margin: 0, marginBottom: 16 },
  row: { display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" },
  label: { fontWeight: 600, marginBottom: 6, display: "block" },
  input: { padding: "10px 12px", borderRadius: 8, border: "1px solid #d7dbe0", minWidth: 220, width: "100%" },
  select: { padding: "10px 12px", borderRadius: 8, border: "1px solid #d7dbe0", width: "100%" },
  button: {
    background: "#2166f7",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer"
  },
  error: { color: "#c0392b", marginTop: 8, fontWeight: 600 }
};

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const credentials = { student: "student123", teacher: "teacher123", admin: "admin123" };

  const submit = e => {
    e.preventDefault();
    if (password === credentials[role]) {
      onLogin(role, username || role);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.h1}>College Grievance Portal</h1>
        <form onSubmit={submit}>
          <div style={styles.row}>
            <div style={{ flex: "1 1 200px" }}>
              <label style={styles.label}>Role</label>
              <select value={role} onChange={e => setRole(e.target.value)} style={styles.select}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <label style={styles.label}>Name</label>
              <input style={styles.input} placeholder="Enter name" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                style={styles.input}
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <button type="submit" style={styles.button}>
                Login
              </button>
            </div>
          </div>
          {error && <div style={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
}
