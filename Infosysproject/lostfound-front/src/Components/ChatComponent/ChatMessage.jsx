// import React, { useState, useEffect } from "react";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";
// import { getUserDetails } from "../../Services/LoginService";
// import "./ChatMessage.css";
// import { useNavigate } from "react-router-dom";

// let stompClient = null;

// const ChatMessage = () => {

//     let navigate = useNavigate();

//     const [connected, setConnected] = useState(false);
//     const [username, setUsername] = useState("");
//     const [messages, setMessages] = useState(() => {
//         const saved = localStorage.getItem("chatMessages");
//         return saved ? JSON.parse(saved) : [];
//     });

// };
// const [input, setInput] = useState("");
// const [users, setUsers] = useState([]);
// const [loading, setLoading] = useState(true);

// // Save messages to localStorage whenever they change
// useEffect(() => {
//     localStorage.setItem("chatMessages", JSON.stringify(messages));
// }, [messages]);

// // Fetch user details once
// useEffect(() => {
//     const fetchUserDetails = async () => {
//         try {
//             const response = await getUserDetails();
//             const user = response.data?.username || response.data?.name || response.data;
            
//             if (user) {
//                 setUsername(user);
//                 connect(user);
//             } else {
//                 console.error("Username not found in API response");
//             }
//         } catch (error) {
//             console.error("Error fetching user details:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
//     fetchUserDetails();

// return () => {
//     if (stompClient) {
//         console.log("🔌 Disconnecting WebSocket...");
//         stompClient.deactivate();
//         stompClient = null;
//     }
// };
// }, []);
// // Connect only once and prevent duplicates
// const connect = (autoName = username) => {
//     if (!autoName.trim()) return;

//     // Prevent reconnect if already active
//     if (stompClient && stompClient.active) {
//         console.log("Already connected - skipping reconnect.");
//         return;
//     }
// };



// import React, { useState, useEffect } from "react";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";
// import { getUserDetails } from "../../Services/LoginService";
// import "./ChatMessage.css";
// import { useNavigate } from "react-router-dom";

// let stompClient = null;

// const ChatMessage = () => {

//   const navigate = useNavigate();

//   const [role, setRole] = useState("");
//   const [connected, setConnected] = useState(false);
//   const [username, setUsername] = useState("");
//   const [input, setInput] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [messages, setMessages] = useState(() => {
//     const saved = localStorage.getItem("chatMessages");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ✅ Save messages to localStorage
//   useEffect(() => {
//     localStorage.setItem("chatMessages", JSON.stringify(messages));
//   }, [messages]);

//   // ✅ Fetch user & connect
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await getUserDetails();
//         const user =
//           response.data?.username ||
//           response.data?.name ||
//           response.data;

//         if (user) {
//           setUsername(user);
//           connect(user); // 🔥 connect here
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();

//     return () => {
//       if (stompClient) {
//         console.log("Disconnecting...");
//         stompClient.deactivate();
//         stompClient = null;
//       }
//     };
//   }, []);

//   // ✅ CONNECT FUNCTION (FIXED)
//   const connect = (autoName) => {
//     if (!autoName) return;

//     if (stompClient && stompClient.active) {
//       console.log("Already connected");
//       return;
//     }

//     const socket = new SockJS("http://localhost:9595/lostfound/ws");

//     stompClient = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,

//       onConnect: () => {
//         console.log("✅ Connected to WebSocket");
//         setConnected(true);

//         // Register user
//         stompClient.publish({
//           destination: "/app/register",
//           body: JSON.stringify({ sender: autoName }),
//         });

//         // Subscribe to messages
//         stompClient.subscribe("/topic/messages", (payload) => {
//           const msg = JSON.parse(payload.body);
//           setMessages((prev) => [...prev, msg]);
//         });

//         // Subscribe to users
//         stompClient.subscribe("/topic/users", (payload) => {
//           const list = JSON.parse(payload.body);
//           setUsers(list);
//         });
//       },

//       onStompError: (frame) => {
//         console.error("Broker error:", frame.headers["message"]);
//       },
//     });

//     stompClient.activate();
//   };

//   // ✅ SEND MESSAGE
//   const sendMessage = () => {
//     if (!stompClient?.connected) {
//       console.warn("Not connected");
//       return;
//     }

//     if (!input.trim()) return;

//     const msg = { sender: username, content: input };

//     stompClient.publish({
//       destination: "/app/sendMessage",
//       body: JSON.stringify(msg),
//     });

//     setInput("");
//   };

//   // ✅ BACK NAVIGATION (role-based)
//   const returnBack = () => {
//     if (role === "Admin") navigate("/admin-menu");
//     else navigate("/student-menu");
//   };

//   // ✅ LOADING UI
//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <h3>Loading user details...</h3>
//       </div>
//     );
//   }

//   // ✅ MAIN UI
//   return (
//     <div className="chat-container">

//       <h2>Chat Room</h2>

//       {/* Messages */}
//       <div className="chat-box">
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <b>{msg.sender}:</b> {msg.content}
//           </p>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="chat-input">
//         <input
//           type="text"
//           value={input}
//           placeholder="Type a message..."
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       {/* Online Users */}
//       <div className="users-list">
//         <h4>Online Users</h4>
//         {users.map((user, i) => (
//           <p key={i}>{user}</p>
//         ))}
//       </div>

//       <button onClick={returnBack}>Back</button>

//     </div>
//   );
// };

// export default ChatMessage;



import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getUserDetails } from "../../Services/LoginService";
import "./ChatMessage.css";
import { useNavigate } from "react-router-dom";

let stompClient = null;

const ChatMessage = () => {
  const navigate  = useNavigate();
  const messagesEndRef = useRef(null);

  const [role,      setRole]      = useState("");
  const [connected, setConnected] = useState(false);
  const [username,  setUsername]  = useState("");
  const [input,     setInput]     = useState("");
  const [users,     setUsers]     = useState([]);
  const [loading,   setLoading]   = useState(true);

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  /* ── Persist messages ── */
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── Fetch user & connect ── */
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        const user =
          response.data?.username ||
          response.data?.name    ||
          response.data;

        if (user) {
          setUsername(user);
          connect(user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
      }
    };
  }, []);

  /* ── WebSocket connect ── */
  const connect = (autoName) => {
    if (!autoName) return;
    if (stompClient && stompClient.active) return;

    const socket = new SockJS("http://localhost:9595/lostfound/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        setConnected(true);

        stompClient.publish({
          destination: "/app/register",
          body: JSON.stringify({ sender: autoName }),
        });

        stompClient.subscribe("/topic/messages", (payload) => {
          const msg = JSON.parse(payload.body);
          setMessages((prev) => [...prev, msg]);
        });

        stompClient.subscribe("/topic/users", (payload) => {
          const list = JSON.parse(payload.body);
          setUsers(list);
        });
      },

      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    stompClient.activate();
  };

  /* ── Send message ── */
  const sendMessage = () => {
    if (!stompClient?.connected || !input.trim()) return;

    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify({ sender: username, content: input }),
    });

    setInput("");
  };

  /* ── Enter key send ── */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ── Back navigation ── */
  const returnBack = () => {
    if (role === "Admin") navigate("/admin-menu");
    else navigate("/student-menu");
  };

  /* ── Format timestamp ── */
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  /* ── Loading screen ── */
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Connecting to chat...</p>
      </div>
    );
  }

  /* ── Main UI ── */
  return (
    <div className="chat-container">
      <div className="chat-room">

        {/* ══ SIDEBAR — online users ══ */}
        <aside className="sidebar">
          <div className="sidebar-title">Online</div>

          {users.length === 0 ? (
            <p style={{ fontSize: "12.5px", color: "var(--mu)", padding: "4px" }}>
              No users online
            </p>
          ) : (
            users.map((user, i) => (
              <div className="user-item" key={i}>
                <div className="user-avatar">
                  {String(user).charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user}</span>
                <div className="online-dot" />
              </div>
            ))
          )}
        </aside>

        {/* ══ CHAT CONTENT ══ */}
        <div className="chat-content">

          {/* ── Header ── */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-header-icon">💬</div>
              <div>
                <div className="chat-header-title">Campus Chat Room</div>
                <div className="chat-header-sub">
                  {connected
                    ? `✦ Connected as ${username}`
                    : "⏳ Connecting..."}
                </div>
              </div>
            </div>

            <button className="back-btn" onClick={returnBack}>
              ← Back
            </button>
          </div>

          {/* ── Messages ── */}
          <div className="messages">
            {messages.length === 0 ? (
              <div className="messages-empty">
                <span>💬</span>
                <p>No messages yet. Say hello!</p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isSelf = msg.sender === username;
                return (
                  <div
                    className={`message ${isSelf ? "self" : "other"}`}
                    key={index}
                  >
                    <div className="message-sender">{msg.sender}</div>
                    <div className="message-bubble">{msg.content}</div>
                    <div className="message-time">{formatTime()}</div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Input area ── */}
          <div className="input-area">
            <input
              type="text"
              value={input}
              placeholder="Type a message and press Enter…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={!connected || !input.trim()}
            >
              Send ↑
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatMessage;