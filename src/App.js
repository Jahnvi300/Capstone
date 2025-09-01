import React, { useMemo, useState } from "react";
import LoginPage from "./LoginPage";
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";
import AdminPage from "./AdminPage";

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [grievances, setGrievances] = useState([]);
  const [history, setHistory] = useState([]);

  const onLogin = (loginRole, username) => {
    setRole(loginRole);
    setUser({ name: username || loginRole });
  };

  const handleLogout = () => {
    setRole(null);
    setUser(null);
  };

  const addGrievance = (text, submittedBy, submitterName, category = "General") => {
    const newItem = {
      id: Date.now(),
      text,
      submittedBy,
      submitterName,
      category,
      status: "Open",
      response: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setGrievances(prev => [newItem, ...prev]);
    setHistory(prev => [
      { ts: new Date().toISOString(), action: "SUBMIT", item: newItem },
      ...prev
    ]);
  };

  const updateGrievance = (id, updates, actionLabel = "UPDATE") => {
    setGrievances(prev =>
      prev.map(g =>
        g.id === id ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g
      )
    );
    const updated = grievances.find(g => g.id === id);
    if (updated) {
      setHistory(prev => [
        { ts: new Date().toISOString(), action: actionLabel, item: { ...updated, ...updates } },
        ...prev
      ]);
    }
  };

  const addResponse = (id, response, status = "In Progress") => {
    updateGrievance(id, { response, status }, "RESPOND");
  };

  const setStatus = (id, status) => {
    updateGrievance(id, { status }, "STATUS_CHANGE");
  };

  const stats = useMemo(() => {
    const total = grievances.length;
    const open = grievances.filter(g => g.status === "Open").length;
    const inProgress = grievances.filter(g => g.status === "In Progress").length;
    const resolved = grievances.filter(g => g.status === "Resolved").length;
    return { total, open, inProgress, resolved };
  }, [grievances]);

  const myName = user?.name || "";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {!role && (
        <LoginPage onLogin={onLogin} />
      )}

      {role === "student" && (
        <StudentPage
          userName={myName}
          onLogout={handleLogout}
          addGrievance={addGrievance}
          grievances={grievances}
          stats={stats}
        />
      )}

      {role === "teacher" && (
        <TeacherPage
          userName={myName}
          onLogout={handleLogout}
          addGrievance={addGrievance}
          grievances={grievances}
          stats={stats}
        />
      )}

      {role === "admin" && (
        <AdminPage
          onLogout={handleLogout}
          grievances={grievances}
          addResponse={addResponse}
          setStatus={setStatus}
          history={history}
          stats={stats}
        />
      )}
    </div>
  );
}

export default App;
