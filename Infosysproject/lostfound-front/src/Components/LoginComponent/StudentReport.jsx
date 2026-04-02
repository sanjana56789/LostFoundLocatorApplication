
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudents, deleteUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const StudentReport = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = () => {
    getAllStudents().then((response) => setStudents(response.data));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const removeStudent = (id) => {
    deleteUser(id).then(() => {
      setStudents((prev) => prev.filter((s) => s.username !== id));
    });
  };

  const filtered = students.filter(
    (s) =>
      s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.personalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        {/* ── Header ── */}
        <div className="dashboard-header">
          <h1>
            <span style={{
              background: "var(--g-teal)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Student Directory
            </span>
          </h1>
          <p>{students.length} registered student{students.length !== 1 ? "s" : ""} on campus</p>
        </div>

        {/* ── Table card ── */}
        <div style={{
          background: "var(--navy-800)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-lg)",
          boxShadow: "var(--s-card)",
          overflow: "hidden",
        }}>

          {/* Table toolbar */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
          }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "#E2EAF4",
            }}>
              👥 All Students
            </span>

            {/* Search */}
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-input"
              style={{ width: "240px" }}
            />
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["#", "Username", "Full Name", "Email", "Actions"].map((h) => (
                    <th key={h} style={{
                      padding: "13px 20px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "var(--teal)",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: "40px",
                        textAlign: "center",
                        color: "var(--muted)",
                      }}
                    >
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((student, index) => (
                    <tr
                      key={student.username}
                      style={{
                        borderBottom: "1px solid rgba(0,212,180,.06)",
                        transition: "background .2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(0,212,180,.04)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {/* Row number */}
                      <td style={{ padding: "14px 20px", color: "var(--muted)" }}>
                        {index + 1}
                      </td>

                      {/* Username with avatar */}
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, var(--navy-500), var(--navy-400))",
                            border: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "var(--teal)",
                            flexShrink: 0,
                          }}>
                            {student.username.charAt(0).toUpperCase()}
                          </div>
                          <span style={{ color: "#E2EAF4", fontWeight: 600 }}>
                            {student.username}
                          </span>
                        </div>
                      </td>

                      {/* Personal name */}
                      <td style={{ padding: "14px 20px", color: "#CBD5E1" }}>
                        {student.personalName}
                      </td>

                      {/* Email with badge */}
                      <td style={{ padding: "14px 20px" }}>
                        <span className="badge-pill badge-sky">
                          {student.email}
                        </span>
                      </td>

                      {/* Delete action */}
                      <td style={{ padding: "14px 20px" }}>
                        <button
                          onClick={() => removeStudent(student.username)}
                          style={{
                            padding: "7px 16px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,107,107,.25)",
                            background: "rgba(255,107,107,.08)",
                            color: "var(--coral)",
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 700,
                            fontSize: "13px",
                            cursor: "pointer",
                            transition: "background .2s, box-shadow .2s, transform .15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,107,107,.16)";
                            e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,107,107,.20)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255,107,107,.08)";
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          ✕ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer row */}
          <div style={{
            padding: "14px 24px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              Showing {filtered.length} of {students.length} students
            </span>
            <button
              className="modern-btn"
              style={{ width: "auto", padding: "10px 24px", fontSize: "13px" }}
              onClick={() => navigate("/admin-menu")}
            >
              ← Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentReport;
