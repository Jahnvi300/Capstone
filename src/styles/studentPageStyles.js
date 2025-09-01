// styles/studentPageStyles.js

const ui = {
  // App layout
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f3f4f6", // slate-100
    fontFamily: "Segoe UI, Arial, sans-serif"
  },

  // Sidebar
  sidebar: {
    width: 260,
    background: "#111827", // gray-900
    color: "#e5e7eb", // gray-200
    display: "flex",
    flexDirection: "column",
    padding: 16,
    boxShadow: "2px 0 12px rgba(0,0,0,0.08)"
  },
  sidebarHeader: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    paddingBottom: 12,
    borderBottom: "1px solid #374151", // gray-700
    marginBottom: 12
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#374151",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    color: "#e5e7eb"
  },
  welcomeLabel: {
    fontSize: 12,
    color: "#9ca3af" // gray-400
  },
  welcomeName: {
    fontSize: 14,
    fontWeight: 700
  },

  // Sidebar menu
  menu: {
    display: "grid",
    gap: 6,
    marginTop: 8
  },
  menuItem: {
    textAlign: "left",
    background: "transparent",
    color: "#e5e7eb",
    border: "1px solid transparent",
    padding: "10px 12px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background 160ms ease, border-color 160ms ease"
  },
  menuItemActive: {
    background: "#1f2937", // gray-800
    borderColor: "#374151"
  },
  sidebarFooter: {
    marginTop: "auto"
  },

  // Main content column
  main: {
    flex: 1,
    padding: 16,
    display: "grid",
    gap: 16
  },

  // Top stats row
  topRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap"
  },
  stat: {
    background: "#f7f9ff",
    padding: 12,
    borderRadius: 10,
    fontWeight: 700,
    color: "#1f2937",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
  },

  // Cards and text inputs
  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 12px 24px rgba(0,0,0,0.06)"
  },
  h2: {
    marginTop: 0
  },
  input: {
    border: "1px solid #d7dbe0",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    background: "#fff"
  },
  textarea: {
    border: "1px solid #d7dbe0",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    minHeight: 120,
    background: "#fff"
  },
  button: {
    background: "#2166f7",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer"
  },

  // Complaint items
  item: {
    border: "1px solid #eef1f5",
    borderRadius: 10,
    padding: 12,
    background: "#fff"
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  chip: status => ({
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    background:
      status === "Open"
        ? "#fdecec"
        : status === "In Progress"
        ? "#fff7e6"
        : status === "Rejected"
        ? "#fdecec"
        : "#e9f9ef",
    color:
      status === "Open"
        ? "#c0392b"
        : status === "In Progress"
        ? "#ad6a00"
        : status === "Rejected"
        ? "#b91c1c"
        : "#1e7e34",
    fontWeight: 700
  }),
  time: {
    marginLeft: "auto",
    fontSize: 12,
    color: "#6b7280"
  },
  response: {
    marginTop: 8,
    background: "#f7f9ff",
    padding: 10,
    borderRadius: 8
  }
};

export default ui;
