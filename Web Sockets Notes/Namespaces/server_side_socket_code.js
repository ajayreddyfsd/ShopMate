// server.js
// ===============================
// This is the SERVER side code
// ===============================

// 1. Import socket.io
const { Server } = require("socket.io");

// 2. Create a socket.io server that listens on port 3000
const io = new Server(3000);

// ------------------------------------------------------
// NAMESPACE 1: ROOT "/" (default namespace)
// ------------------------------------------------------
// If client connects with io("/"), they come here
io.on("connection", (socket) => {
  console.log("✅ A user joined ROOT namespace:", socket.id);

  // If this user sends a "message", run this code
  socket.on("message", (msg) => {
    console.log("📩 Root message:", msg);

    // Send that message back to ALL users in ROOT namespace
    io.emit("message", `ROOT says: ${msg}`);
  });
});

// ------------------------------------------------------
// NAMESPACE 2: "/chat"
// ------------------------------------------------------
// If client connects with io("/chat"), they come here
const chatNamespace = io.of("/chat");
chatNamespace.on("connection", (socket) => {
  console.log("💬 A user joined CHAT namespace:", socket.id);

  socket.on("message", (msg) => {
    console.log("💌 Chat message:", msg);

    // Send message to ALL users in /chat namespace
    chatNamespace.emit("message", `CHAT says: ${msg}`);
  });
});

// ------------------------------------------------------
// NAMESPACE 3: "/admin"
// ------------------------------------------------------
// If client connects with io("/admin"), they come here
const adminNamespace = io.of("/admin");
adminNamespace.on("connection", (socket) => {
  console.log("🛠️ An ADMIN joined ADMIN namespace:", socket.id);

  socket.on("alert", (msg) => {
    console.log("🚨 Admin alert received:", msg);

    // Send alert to ALL users in /admin namespace
    adminNamespace.emit("alert", `🚨 ADMIN ALERT: ${msg}`);
  });
});
