// import React from "react";
// import {useNavigate} from 'react-router-dom';
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { logout } from "../../Services/LoginService";

// const StudentMenu = () => {

//    let navigate = useNavigate();
//        const handleLogout = () => {
//          logout().then(() => {
//                localStorage.clear();
//                sessionStorage.clear();
//                navigate('/');
//            })
//         };

// return (
//   <div className="theme-layout">

//     {/* Header */}
//     <div style={{
//       background: "rgba(0,0,0,0.6)",
//       backdropFilter: "blur(8px)",
//       padding: "15px",
//       textAlign: "center"
//     }}>
//       <h2 style={{
//         color: "white",
//         margin: 0,
//         fontWeight: "700",
//         letterSpacing: "1px"
//       }}>
//         Lost & Found Student Menu 
//       </h2>
//     </div>

//     {/* Navbar */}
//     <Navbar
//       expand="lg"
//       style={{
//         background: "rgba(255,255,255,0.25)",
//         backdropFilter: "blur(10px)",
//         padding: "10px 40px"
//       }}
//     >
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="me-auto">

//           <NavDropdown title="Personal" id="collasible-nav-dropdown">
//             <NavDropdown.Item href="">Personal Details</NavDropdown.Item>
//           </NavDropdown>

//           <NavDropdown title="Lost Item" id="collasible-nav-dropdown">
//             <NavDropdown.Item href="/lost-entry">Lost Item Form Submission</NavDropdown.Item>
//             <NavDropdown.Item href="/lost-list">Lost Item List</NavDropdown.Item>
//           </NavDropdown>

//           <NavDropdown title="Found Item" id="collasible-nav-dropdown">
//             <NavDropdown.Item href="/found-entry">Found Item Form Submission</NavDropdown.Item>
//             <NavDropdown.Item href="/found-list">Found Item List</NavDropdown.Item>
//           </NavDropdown>

//           <Nav.Link href=""><b>Chatting</b></Nav.Link>

//         </Nav>

//         <button className="theme-btn" onClick={handleLogout}>
//           Logout
//         </button>

//       </Navbar.Collapse>
//     </Navbar>

//   </div>
//   );
// }

// export default StudentMenu;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const StudentMenu = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (card) => {
    setActiveCard(activeCard === card ? null : card);
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
      })
      .catch((err) => console.error("Logout failed", err));
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        {/* ── Header ── */}
        <div className="dashboard-header">
          <h1>
            Lost &amp; Found{" "}
            <span style={{
              background: "var(--g-teal)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Student Portal
            </span>
          </h1>
          <p>Select an option below to get started</p>
        </div>

        {/* ── Stats bar ── */}
        <div className="stats-bar">
          <div className="stat-pill">
            <div className="dot" style={{ background: "#00D4B4", boxShadow: "0 0 6px #00D4B4" }} />
            Lost Items
          </div>
          <div className="stat-pill">
            <div className="dot" style={{ background: "#38BDF8", boxShadow: "0 0 6px #38BDF8" }} />
            Found Items
          </div>
          <div className="stat-pill">
            <div className="dot" style={{ background: "#FFB347", boxShadow: "0 0 6px #FFB347" }} />
            Live Chat
          </div>
          <div className="stat-pill">
            <div className="dot" style={{ background: "#34D399", boxShadow: "0 0 6px #34D399" }} />
            My Profile
          </div>
        </div>

        {/* ── Card Grid ── */}
        <div className="dashboard-grid">

          {/* LOST ITEM */}
          <div className="dashboard-card" onClick={() => toggleCard("lost")}>
            <div className="card-icon teal">📦</div>
            <h3>Lost Item</h3>
            <p>Report a lost item or view your lost item submissions.</p>
            <div className="card-arrow">→</div>

            {activeCard === "lost" && (
              <div className="sub-options">
                <div onClick={(e) => { e.stopPropagation(); navigate("/lost-entry"); }}>
                  Lost Item Form Submission
                </div>
                <div onClick={(e) => { e.stopPropagation(); navigate("/lost-list"); }}>
                  Lost Item List
                </div>
              </div>
            )}
          </div>

          {/* FOUND ITEM */}
          <div className="dashboard-card" onClick={() => toggleCard("found")}>
            <div className="card-icon sky">🔎</div>
            <h3>Found Item</h3>
            <p>Submit a found item or browse the found items list.</p>
            <div className="card-arrow">→</div>

            {activeCard === "found" && (
              <div className="sub-options">
                <div onClick={(e) => { e.stopPropagation(); navigate("/found-entry"); }}>
                  Found Item Form Submission
                </div>
                <div onClick={(e) => { e.stopPropagation(); navigate("/found-list"); }}>
                  Found Item List
                </div>
              </div>
            )}
          </div>

          {/* ── PERSONAL DETAILS (NEW) ── */}
          <div className="dashboard-card" onClick={() => navigate("/student-show")}>
            <div className="card-icon em">👤</div>
            <h3>Personal Details</h3>
            <p>View your profile, username, email and account information.</p>
            <div className="card-arrow">→</div>
          </div>

          {/* CHAT */}
          <div className="dashboard-card" onClick={() => navigate("/chat")}>
            <div className="card-icon amber">💬</div>
            <h3>Chat</h3>
            <p>Connect and coordinate with other students in real time.</p>
            <div className="card-arrow">→</div>
          </div>

          {/* LOGOUT */}
          <div className="dashboard-card logout-card" onClick={handleLogout}>
            <div className="card-icon">🚪</div>
            <h3>Logout</h3>
            <p>Securely sign out of your current session.</p>
            <div className="card-arrow">→</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentMenu;