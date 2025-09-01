const ui = {
  shell: { maxWidth: 980, margin: "28px auto", padding: 16, fontFamily: "Segoe UI, Arial, sans-serif" },
  topRow: { display: "flex", gap: 12, marginBottom: 16, alignItems: "center" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  card: { background: "#fff", padding: 16, borderRadius: 12, boxShadow: "0 12px 24px rgba(0,0,0,0.06)" },
  h2: { marginTop: 0 },
  input: { border: "1px solid #d7dbe0", borderRadius: 8, padding: 12, width: "100%" },
  textarea: { border: "1px solid #d7dbe0", borderRadius: 8, padding: 12, width: "100%", minHeight: 120 },
  button: { background: "#2166f7", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 8, fontWeight: 700, cursor: "pointer" },
  chip: status => ({ padding: "4px 10px", borderRadius: 999, fontSize: 12, background: status==="Open"?"#fdecec":status==="In Progress"?"#fff7e6":"#e9f9ef", color: status==="Open"?"#c0392b":status==="In Progress"?"#ad6a00":"#1e7e34" }),
  stat: { background: "#f7f9ff", padding: 12, borderRadius: 10, fontWeight: 700 },
  item: { border: "1px solid #eef1f5", borderRadius: 10, padding: 12 },
  itemHeader: { display: "flex", alignItems: "center", gap: 8 },
  time: { marginLeft: "auto", fontSize: 12, color: "#6b7280" },
  response: { marginTop: 8, background: "#f7f9ff", padding: 10, borderRadius: 8 }
};
export default ui;
