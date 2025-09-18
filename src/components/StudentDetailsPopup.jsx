import React from "react";

const StudentDetailsPopup = ({ student, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(270deg, #ff0000, #ff4d4d, #8b0000, #ff1a1a)",
          backgroundSize: "800% 800%",
          animation: "gradientShift 15s ease infinite",
          zIndex: -1,
        }}
      />

      {/* Popup card */}
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "450px",
          boxShadow: "0 0 25px rgba(215,0,0,0.7)",
          textAlign: "center",
          position: "relative",
          animation: "popupFade 0.5s ease forwards",
        }}
      >
        <h2 style={{ color: "#d70000", marginBottom: "20px" }}>
          {student.name}'s Details
        </h2>
        <p><b>Email:</b> {student.email}</p>
        <p><b>Language:</b> {student.language}</p>
        <p><b>Address:</b> {student.address}</p>
        <p><b>Standard:</b> {student.standard}</p>
        <p><b>Subjects:</b> {student.subjects.join(", ")}</p>

        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#d70000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 0 10px rgba(215,0,0,0.6)",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 20px rgba(215,0,0,1)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 10px rgba(215,0,0,0.6)")
          }
        >
          Close
        </button>
      </div>

      <style>
        {`
          @keyframes popupFade {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default StudentDetailsPopup;
