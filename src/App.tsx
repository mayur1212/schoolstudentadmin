// src/App.tsx
import React, { useState } from "react";
import { usersData, User } from "./data/usersData";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import StudentPage from "./pages/StudentPage";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage users={usersData} onLogin={handleLogin} />;
  }

  if (currentUser.type === "admin") {
    return <AdminPage currentUser={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.type === "student") {
    return <StudentPage currentUser={currentUser} onLogout={handleLogout} />;
  }

  return null;
};

export default App;
