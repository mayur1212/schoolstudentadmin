import React, { useState } from "react";
import { User } from "../data/usersData";

type AdminPageProps = {
  currentUser: User;
  onLogout: () => void;
};

const AdminPage: React.FC<AdminPageProps> = ({ currentUser, onLogout }) => {
  const [search, setSearch] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStandard, setFilterStandard] = useState<string>("");
  const [filterLanguage, setFilterLanguage] = useState<string>("");

  const students: User[] = JSON.parse(localStorage.getItem("usersData") || "[]");

  // Filtered students
  let filteredStudents = students.filter(
    (s) =>
      s.type === "student" &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.subjects.some((sub) =>
          sub.toLowerCase().includes(search.toLowerCase())
        )) &&
      (filterStandard ? s.standard === filterStandard : true) &&
      (filterLanguage ? s.language === filterLanguage : true)
  );

  // Sorting
  filteredStudents = filteredStudents.sort((a, b) => {
    const valA = (a as any)[sortField];
    const valB = (b as any)[sortField];
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Export CSV
  const exportCSV = () => {
    const header = ["Name", "Email", "Standard", "Language", "Subjects"];
    const rows = filteredStudents.map((s) => [
      s.name,
      s.email,
      s.standard,
      s.language,
      s.subjects.join(" | "),
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "students.csv";
    link.click();
  };

  // Unique filters
  const standards = [...new Set(students.map((s) => s.standard))];
  const languages = [...new Set(students.map((s) => s.language))];

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.header}>
        <h2>📊 Admin Dashboard - {currentUser.name}</h2>
        <button onClick={onLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          👨‍🎓 Total Students:{" "}
          <b>{students.filter((s) => s.type === "student").length}</b>
        </div>
        <div style={styles.card}>🏫 Standards: <b>{standards.length}</b></div>
        <div style={styles.card}>🌍 Languages: <b>{languages.length}</b></div>
      </div>

      {/* Search + Filters + Export */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Search by name or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
        <select
          value={filterStandard}
          onChange={(e) => setFilterStandard(e.target.value)}
          style={styles.select}
        >
          <option value="">All Standards</option>
          {standards.map((std, i) => (
            <option key={i} value={std}>
              {std}
            </option>
          ))}
        </select>
        <select
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value)}
          style={styles.select}
        >
          <option value="">All Languages</option>
          {languages.map((lang, i) => (
            <option key={i} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <button onClick={exportCSV} style={styles.exportButton}>
          ⬇ Export CSV
        </button>
      </div>

      {/* Table */}
      {filteredStudents.length > 0 ? (
        <>
          <p style={styles.resultCount}>
            Showing <b>{filteredStudents.length}</b> of{" "}
            {students.filter((s) => s.type === "student").length} students
          </p>
          <table style={styles.table}>
            <thead>
              <tr>
                {["name", "email", "standard", "language"].map((field) => (
                  <th
                    key={field}
                    style={styles.th}
                    onClick={() => {
                      setSortField(field);
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    {field.toUpperCase()}{" "}
                    {sortField === field
                      ? sortOrder === "asc"
                        ? "⬆"
                        : "⬇"
                      : ""}
                  </th>
                ))}
                <th style={styles.th}>Subjects</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, idx) => (
                <tr
                  key={idx}
                  style={{
                    ...(idx % 2 === 0 ? styles.trEven : styles.trOdd),
                    ...styles.rowHover,
                  }}
                >
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <span style={styles.badge}>{student.standard}</span>
                  </td>
                  <td>
                    <span
                      style={{ ...styles.badge, background: "#007bff" }}
                    >
                      {student.language}
                    </span>
                  </td>
                  <td>{student.subjects.join(", ")}</td>
                  <td>
                    <button
                      onClick={() => setSelectedStudent(student)}
                      style={styles.detailsButton}
                    >
                      👁 View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p style={styles.noData}>⚠ No students found</p>
      )}

      {/* Details Popup */}
      {selectedStudent && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3 style={{ color: "#d70000" }}>{selectedStudent.name}</h3>
            <p><b>Email:</b> {selectedStudent.email}</p>
            <p><b>Address:</b> {selectedStudent.address}</p>
            <p><b>Standard:</b> {selectedStudent.standard}</p>
            <p><b>Language:</b> {selectedStudent.language}</p>
            <p><b>Subjects:</b> {selectedStudent.subjects.join(", ")}</p>
            <button
              onClick={() => setSelectedStudent(null)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    padding: 20,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logout: {
    padding: "8px 16px",
    backgroundColor: "#d70000",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
  cardsContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    background: "#ffffff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontWeight: "bold",
    textAlign: "center",
  },
  controls: {
    display: "flex",
    gap: "10px",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  search: {
    flex: 1,
    padding: "10px",
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
  },
  select: {
    padding: "10px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  exportButton: {
    padding: "10px 16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#ffcccc",
    color: "#000000",
    padding: "10px",
    textAlign: "left",
    cursor: "pointer",
    position: "sticky",
    top: 0,
  },
  trEven: { backgroundColor: "#ffffff" },
  trOdd: { backgroundColor: "#ffe6e6" },
  rowHover: {
    transition: "background 0.2s",
  },
  detailsButton: {
    padding: "6px 12px",
    backgroundColor: "#d70000",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  badge: {
    padding: "4px 8px",
    background: "#17a2b8",
    color: "#fff",
    borderRadius: "12px",
    fontSize: "12px",
  },
  resultCount: {
    marginBottom: 8,
    fontSize: "14px",
    color: "#555",
  },
  noData: {
    marginTop: 20,
    fontSize: "16px",
    color: "#999",
    textAlign: "center",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    background: "#ffffff",
    padding: 30,
    borderRadius: 12,
    width: 400,
    textAlign: "center",
    boxShadow: "0 0 20px rgba(215,0,0,0.5)",
  },
  closeButton: {
    marginTop: 15,
    padding: "8px 16px",
    backgroundColor: "#d70000",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default AdminPage;
