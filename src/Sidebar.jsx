import React from "react";

const sidebarStyle = {
  width: 260,
  background: "#111827",
  color: "#e5e7eb",
  display: "flex",
  flexDirection: "column",
  padding: "16px 0",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  boxShadow: "2px 0 12px rgba(0,0,0,0.08)"
};

const menuItemStyle = (active) => ({
  padding: "12px 24px",
  cursor: "pointer",
  backgroundColor: active ? "#1f2937" : "transparent",
  color: active ? "#60a5fa" : "#e5e7eb",
  fontWeight: active ? "700" : "500",
  userSelect: "none"
});

export default function Sidebar({ role, selected, setSelected, userName, onLogout }) {
  const studentMenus = [
    { key: "newComplaint", label: "Submit Complaint" },
    { key: "myComplaints", label: "My Complaints" },
    { key: "stats", label: "Statistics" }
  ];
  const teacherMenus = [
    { key: "newComplaint", label: "Submit Complaint" },
    { key: "myComplaints", label: "My Complaints" },
    { key: "stats", label: "Statistics" }
  ];
  const adminMenus = [
    { key: "inbox", label: "Complaint Inbox" },
    { key: "sorted", label: "Sorted Complaints" },
    { key: "replied", label: "Replied Complaints" },
    { key: "history", label: "History" },
    { key: "stats", label: "Statistics" }
  ];

  let menus = [];
  if (role === "student") menus = studentMenus;
  else if (role === "teacher") menus = teacherMenus;
  else if (role === "admin") menus = adminMenus;

  return (
    <div style={sidebarStyle}>
      <div style={{ color: "#60a5fa", fontSize: 20, fontWeight: 700, padding: "0 24px 24px 24px" }}>
        College Grievance
      </div>
      <div style={{ padding: "0 24px 12px 24px", fontSize: 14, color: "#94a3b8" }}>
        Welcome, {userName}
      </div>
      <nav style={{ flexGrow: 1 }}>
        {menus.map(item => (
          <div
            key={item.key}
            style={menuItemStyle(selected === item.key)}
            onClick={() => setSelected(item.key)}
          >
            {item.label}
          </div>
        ))}
      </nav>
      <div style={{ padding: "0 24px 12px 24px", fontSize: 14, color: "#94a3b8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <div>Welcome, {userName}</div>
  <button
    onClick={onLogout}
    style={{
      backgroundColor: "#cf5c36",
      border: "none",
      borderRadius: 6,
      color: "white",
      fontWeight: 600,
      padding: "4px 10px",
      cursor: "pointer",
      fontSize: 12
    }}
  >
    Logout
  </button>
</div>

    </div>
  );
}
