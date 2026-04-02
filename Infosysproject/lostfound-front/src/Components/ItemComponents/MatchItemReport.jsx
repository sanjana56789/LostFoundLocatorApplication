// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getRole } from "../../Services/LoginService";
// import { getAllMatchItems } from "../../Services/MatchItemService";
// import "../../DisplayView.css";

// const MatchItemReport = () => {

//   let navigate = useNavigate();
//   const [itemList, setItemList] = useState([]);
//   const [role, setRole] = useState("");

//   const showMatchItems = () => {
//     getRole().then((response) => {
//       setRole(response.data);
//       getAllMatchItems().then((res) => {
//         setItemList(res.data);
//       });
//     });
//   };

//   useEffect(() => {
//     showMatchItems();
//   }, []);

//   const returnBack = () => {
//     if (role === 'Admin')
//       navigate('/admin-menu');
//     else if (role === 'Student')
//       navigate('/student-menu');
//   };

//   return (
//     <div className="text-center">

//       {
//         role === 'Admin'
//           ? <h1 className="text-center" style={{
//               fontSize: "40px",
//               fontWeight: "800",
//               letterSpacing: "2px",
//               marginBottom: "20px"
//             }}>
//               Admin Match Item List
//             </h1>
//           :
//             <h1 className="text-center" style={{
//               fontSize: "40px",
//               fontWeight: "800",
//               letterSpacing: "2px",
//               marginBottom: "20px"
//             }}>
//               Student Match Item List
//             </h1>
//       }

//       <hr style={{ height: "3px", backgroundColor: "green" }} />

//       <div className="row">
//         <table className="table table-striped table-bordered">

//           <thead>
//             <tr>
//               <th>Lost Item Id</th>
//               <th>Found Item Id</th>
//               <th>Item Name</th>
//               <th>Category</th>
//               <th>Lost Username</th>
//               <th>Found Username</th>
//             </tr>
//           </thead>

//           <tbody>
//             {
//               itemList.map((item) => (
//                 <tr key={`${item.matchItemId.lostItemId}-${item.matchItemId.foundItemId}`}>
//                   <td>{item.matchItemId.lostItemId}</td>
//                   <td>{item.matchItemId.foundItemId}</td>
//                   <td>{item.itemName}</td>
//                   <td>{item.category}</td>
//                   <td>{item.lostUsername}</td>
//                   <td>{item.foundUsername}</td>
//                 </tr>
//               ))
//             }
//           </tbody>

//         </table>

//         <br />

//         <div className="form-group">
//           <button
//             onClick={returnBack}
//             className="btn btn-success"
//           >
//             Return
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MatchItemReport;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../Services/LoginService";
import { getAllMatchItems } from "../../Services/MatchItemService";
import "../../DisplayView.css";

const MatchItemReport = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getRole().then((response) => {
      setRole(response.data);
      getAllMatchItems().then((res) => {
        setItemList(res.data);
      });
    });
  }, []);

  const returnBack = () => {
    if (role === "Admin") navigate("/admin-menu");
    else if (role === "Student") navigate("/student-menu");
  };

  const filtered = itemList.filter((item) =>
    [item.itemName, item.category, item.lostUsername, item.foundUsername]
      .some((val) => val?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns = [
    { label: "#",               key: "index"  },
    { label: "Lost Item ID",    key: "lostItemId"    },
    { label: "Found Item ID",   key: "foundItemId"   },
    { label: "Item Name",       key: "itemName"      },
    { label: "Category",        key: "category"      },
    { label: "Lost User",       key: "lostUsername"  },
    { label: "Found User",      key: "foundUsername" },
  ];

  /* accent colours cycling per row */
  const rowAccents = ["#00D4B4", "#38BDF8", "#34D399", "#FFB347", "#FB7185"];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        {/* ── Header ── */}
        <div className="dashboard-header">
          <h1>
            <span style={{
              background: role === "Admin"
                ? "linear-gradient(135deg,#00D4B4,#38BDF8)"
                : "linear-gradient(135deg,#FFB347,#FB7185)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {role === "Admin" ? "⚡ Admin" : "🎓 Student"}
            </span>
            {" "}Match Item List
          </h1>
          <p>
            {itemList.length} matched record{itemList.length !== 1 ? "s" : ""} found on campus
          </p>
        </div>

        {/* ── Stats pills ── */}
        <div className="stats-bar">
          <div className="stat-pill">
            <div className="dot" style={{ background: "#00D4B4", boxShadow: "0 0 6px #00D4B4" }} />
            Total Matches: {itemList.length}
          </div>
          <div className="stat-pill">
            <div className="dot" style={{ background: "#34D399", boxShadow: "0 0 6px #34D399" }} />
            Showing: {filtered.length}
          </div>
          <div className="stat-pill">
            <div className="dot" style={{ background: "#FFB347", boxShadow: "0 0 6px #FFB347" }} />
            Role: {role || "—"}
          </div>
        </div>

        {/* ── Table card ── */}
        <div style={{
          background: "var(--navy-800, #0D1526)",
          backgroundImage: "linear-gradient(145deg,rgba(255,255,255,.055) 0%,rgba(255,255,255,.018) 100%)",
          border: "1px solid var(--border, rgba(0,212,180,.13))",
          borderRadius: "var(--r-lg, 22px)",
          boxShadow: "var(--s-card)",
          overflow: "hidden",
          position: "relative",
        }}>

          {/* Top glow bar */}
          <div style={{
            position: "absolute",
            top: 0, left: "10%", right: "10%",
            height: "2px",
            background: role === "Admin"
              ? "linear-gradient(90deg,#00D4B4,#38BDF8)"
              : "linear-gradient(90deg,#FFB347,#FB7185)",
            borderRadius: "99px",
            boxShadow: `0 0 14px ${role === "Admin" ? "#00D4B4" : "#FFB347"}`,
          }} />

          {/* Toolbar */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 26px",
            borderBottom: "1px solid rgba(0,212,180,.09)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "10px",
                background: "rgba(0,212,180,.12)",
                border: "1px solid rgba(0,212,180,.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "17px",
              }}>🔗</div>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700, fontSize: "15px", color: "#E2EAF4",
              }}>
                Matched Items
              </span>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search by name, category, user…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-input"
              style={{ width: "260px" }}
            />
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,212,180,.12)" }}>
                  {columns.map((col) => (
                    <th key={col.key} style={{
                      padding: "12px 20px",
                      textAlign: "left",
                      fontSize: "10.5px",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: role === "Admin" ? "var(--teal, #00D4B4)" : "#FFB347",
                      whiteSpace: "nowrap",
                      background: "rgba(8,14,26,.4)",
                    }}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{
                      padding: "48px",
                      textAlign: "center",
                      color: "var(--muted, #7A8FAD)",
                      fontSize: "14px",
                    }}>
                      <div style={{ fontSize: "32px", marginBottom: "10px" }}>🔍</div>
                      No matched items found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, index) => {
                    const accent = rowAccents[index % rowAccents.length];
                    return (
                      <tr
                        key={`${item.matchItemId.lostItemId}-${item.matchItemId.foundItemId}`}
                        style={{
                          borderBottom: "1px solid rgba(0,212,180,.05)",
                          transition: "background .2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "rgba(0,212,180,.04)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {/* Row # */}
                        <td style={{ padding: "14px 20px", color: "var(--muted, #7A8FAD)", fontWeight: 600 }}>
                          {index + 1}
                        </td>

                        {/* Lost Item ID */}
                        <td style={{ padding: "14px 20px" }}>
                          <span style={{
                            background: "rgba(255,107,107,.10)",
                            border: "1px solid rgba(255,107,107,.22)",
                            borderRadius: "99px",
                            padding: "3px 12px",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#FF6B6B",
                          }}>
                            #{item.matchItemId.lostItemId}
                          </span>
                        </td>

                        {/* Found Item ID */}
                        <td style={{ padding: "14px 20px" }}>
                          <span style={{
                            background: "rgba(52,211,153,.10)",
                            border: "1px solid rgba(52,211,153,.22)",
                            borderRadius: "99px",
                            padding: "3px 12px",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#34D399",
                          }}>
                            #{item.matchItemId.foundItemId}
                          </span>
                        </td>

                        {/* Item Name */}
                        <td style={{ padding: "14px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                            <div style={{
                              width: "30px", height: "30px",
                              borderRadius: "8px",
                              background: `${accent}18`,
                              border: `1px solid ${accent}33`,
                              display: "flex", alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px", flexShrink: 0,
                            }}>
                              📦
                            </div>
                            <span style={{ color: "#E2EAF4", fontWeight: 600 }}>
                              {item.itemName}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td style={{ padding: "14px 20px" }}>
                          <span style={{
                            background: "rgba(56,189,248,.10)",
                            border: "1px solid rgba(56,189,248,.22)",
                            borderRadius: "99px",
                            padding: "3px 12px",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#38BDF8",
                          }}>
                            {item.category}
                          </span>
                        </td>

                        {/* Lost Username */}
                        <td style={{ padding: "14px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{
                              width: "28px", height: "28px",
                              borderRadius: "50%",
                              background: "rgba(255,107,107,.12)",
                              border: "1px solid rgba(255,107,107,.22)",
                              display: "flex", alignItems: "center",
                              justifyContent: "center",
                              fontSize: "11px", fontWeight: 800,
                              color: "#FF6B6B",
                              flexShrink: 0,
                            }}>
                              {item.lostUsername?.charAt(0).toUpperCase()}
                            </div>
                            <span style={{ color: "#CBD5E1", fontWeight: 500 }}>
                              {item.lostUsername}
                            </span>
                          </div>
                        </td>

                        {/* Found Username */}
                        <td style={{ padding: "14px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{
                              width: "28px", height: "28px",
                              borderRadius: "50%",
                              background: "rgba(52,211,153,.12)",
                              border: "1px solid rgba(52,211,153,.22)",
                              display: "flex", alignItems: "center",
                              justifyContent: "center",
                              fontSize: "11px", fontWeight: 800,
                              color: "#34D399",
                              flexShrink: 0,
                            }}>
                              {item.foundUsername?.charAt(0).toUpperCase()}
                            </div>
                            <span style={{ color: "#CBD5E1", fontWeight: 500 }}>
                              {item.foundUsername}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer bar */}
          <div style={{
            padding: "14px 26px",
            borderTop: "1px solid rgba(0,212,180,.09)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(8,14,26,.35)",
          }}>
            <span style={{ fontSize: "13px", color: "var(--muted, #7A8FAD)" }}>
              Showing {filtered.length} of {itemList.length} matches
            </span>
            <button
              className="modern-btn"
              style={{ width: "auto", padding: "10px 26px", fontSize: "13.5px" }}
              onClick={returnBack}
            >
              ← Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MatchItemReport;