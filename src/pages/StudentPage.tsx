import React from "react";
import { User } from "../data/usersData";

type StudentPageProps = {
  currentUser: User;
  onLogout: () => void;
};

const StudentPage: React.FC<StudentPageProps> = ({ currentUser, onLogout }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Profile Card */}
        <div style={styles.card}>
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            style={styles.avatar}
          />
          <h2>{currentUser.name}</h2>
          <p style={{ color: "rgba(255,255,255,0.85)" }}>
            {currentUser.standard} | {currentUser.language}
          </p>
          <button onClick={onLogout} style={styles.logout}>
            Logout
          </button>
        </div>

        {/* Details Section */}
        <div style={styles.details}>
          <h3>📌 Details</h3>
          <p>
            <b>Email:</b> {currentUser.email}
          </p>
          <p>
            <b>Address:</b> {currentUser.address}
          </p>

          <h3>📚 Subjects</h3>
          {currentUser.subjects.map((sub, idx) => (
            <div key={idx} style={styles.subjectRow}>
              <span>{sub}</span>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${50 + idx * 10}%`,
                    transition: "width 0.8s ease",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f0f9f0, #e0f2e9)",
    padding: 30,
  },
  container: {
    display: "flex",
    gap: 30,
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 900,
    width: "100%",
    fontFamily: "Segoe UI, Arial, sans-serif",
  },
  card: {
    background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
    color: "#fff",
    padding: 25,
    borderRadius: 16,
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: 280,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  avatar: {
    borderRadius: "50%",
    width: 120,
    height: 120,
    marginBottom: 15,
    border: "4px solid #fff",
  },
  logout: {
    marginTop: 18,
    padding: "10px 20px",
    backgroundColor: "#d70000",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  details: {
    background: "#fff",
    padding: 25,
    borderRadius: 14,
    width: 380,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  subjectRow: {
    marginBottom: 14,
  },
  progressBar: {
    width: "100%",
    height: 8,
    background: "#e0e0e0",
    borderRadius: 4,
    marginTop: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #66bb6a, #388e3c)",
    borderRadius: 4,
  },
};

export default StudentPage;
