
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const ShowStudent = () => {
  const navigate = useNavigate();

  const [lostFoundUser, setLostFoundUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    getUser().then((response) => {
      setLostFoundUser(response.data);
    });
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container" style={{ maxWidth: "680px" }}>

        {/* ── Header ── */}
        <div className="dashboard-header">
          <h1>
            <span style={{
              background: "var(--g-teal)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Personal Details
            </span>
          </h1>
          <p>Your campus account information</p>
        </div>

        {/* ── Profile card ── */}
        <div style={{
          background: "var(--navy-800, #0D1526)",
          backgroundImage: "linear-gradient(145deg, rgba(255,255,255,.055) 0%, rgba(255,255,255,.018) 100%)",
          border: "1px solid var(--border, rgba(0,212,180,.13))",
          borderRadius: "var(--r-xl, 30px)",
          boxShadow: "var(--s-card)",
          overflow: "hidden",
          position: "relative",
        }}>

          {/* Top glow bar */}
          <div style={{
            position: "absolute",
            top: 0, left: "15%", right: "15%",
            height: "2px",
            background: "var(--g-teal, linear-gradient(135deg,#00D4B4,#38BDF8))",
            borderRadius: "99px",
            boxShadow: "0 0 14px #00D4B4",
          }} />

          {/* Avatar section */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px 32px 28px",
            borderBottom: "1px solid var(--border, rgba(0,212,180,.13))",
            gap: "14px",
          }}>

            {/* Avatar ring */}
            <div style={{ position: "relative", width: "80px", height: "80px" }}>
              <div style={{
                position: "absolute", inset: "-3px",
                borderRadius: "50%",
                border: "2px solid transparent",
                borderTopColor: "#00D4B4",
                borderRightColor: "#38BDF8",
                animation: "spinRing 3s linear infinite",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1E2D52, #2A3F6E)",
                border: "1px solid rgba(0,212,180,.20)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "30px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                color: "#00D4B4",
              }}>
                {lostFoundUser.username
                  ? lostFoundUser.username.charAt(0).toUpperCase()
                  : "?"}
              </div>
            </div>

            {/* Name & role badge */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "20px",
                fontWeight: 800,
                color: "#E2EAF4",
                marginBottom: "8px",
              }}>
                {lostFoundUser.personalName || "—"}
              </div>
              {lostFoundUser.role && (
                <span className="badge-pill badge-teal">
                  ✦ {lostFoundUser.role}
                </span>
              )}
            </div>
          </div>

          {/* Details rows */}
          <div style={{ padding: "8px 0" }}>
            {[
              { icon: "🪪", label: "Username",      value: lostFoundUser.username,     accent: "#00D4B4" },
              { icon: "👤", label: "Full Name",      value: lostFoundUser.personalName, accent: "#38BDF8" },
              { icon: "📧", label: "Email Address",  value: lostFoundUser.email,        accent: "#34D399" },
              { icon: "🎓", label: "Role",           value: lostFoundUser.role,         accent: "#FFB347" },
            ].map(({ icon, label, value, accent }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 32px",
                  borderBottom: "1px solid rgba(0,212,180,.06)",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,212,180,.04)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                {/* Icon badge */}
                <div style={{
                  width: "40px", height: "40px",
                  borderRadius: "11px",
                  background: `rgba(${accent === "#00D4B4" ? "0,212,180" : accent === "#38BDF8" ? "56,189,248" : accent === "#34D399" ? "52,211,153" : "255,179,71"},.12)`,
                  border: `1px solid ${accent}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                }}>
                  {icon}
                </div>

                {/* Label + value */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: accent,
                    marginBottom: "3px",
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: value ? "#E2EAF4" : "var(--muted, #7A8FAD)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    {value || "—"}
                  </div>
                </div>

                {/* Right check mark */}
                {value && (
                  <div style={{
                    fontSize: "13px",
                    color: accent,
                    opacity: .7,
                  }}>✓</div>
                )}
              </div>
            ))}
          </div>

          {/* Footer / back button */}
          <div style={{
            padding: "20px 32px",
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "1px solid rgba(0,212,180,.08)",
            background: "rgba(8,14,26,.3)",
          }}>
            <button
              className="modern-btn"
              style={{ width: "auto", padding: "11px 28px", fontSize: "14px" }}
              onClick={() => navigate("/student-menu")}
            >
              ← Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShowStudent;
