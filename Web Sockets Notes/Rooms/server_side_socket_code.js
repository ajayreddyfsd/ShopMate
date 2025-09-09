// server.js
// ===============================
// Server side code: 2 namespaces + 2 rooms each
// ===============================

const { Server } = require("socket.io");
const io = new Server(3000);

// ------------------------------------------------------
// NAMESPACE 1: /chat
// ------------------------------------------------------
const chatNS = io.of("/chat");

chatNS.on("connection", (socket) => {
  console.log("💬 User connected to /chat:", socket.id);

  // Join a room in /chat
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} joined /chat/${roomName}`);

    // Only this user gets this message
    socket.emit("message", `✅ You joined /chat/${roomName}`);

    // Everyone else in the room gets this message
    socket
      .to(roomName)
      .emit("message", `👋 ${socket.id} joined /chat/${roomName}`);
  });

  // Send message to a room in /chat
  socket.on("roomMessage", ({ room, msg }) => {
    chatNS.to(room).emit("message", `[${room}] ${socket.id}: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("💔 User disconnected from /chat:", socket.id);
  });
});

// ------------------------------------------------------
// NAMESPACE 2: /admin
// ------------------------------------------------------
const adminNS = io.of("/admin");

adminNS.on("connection", (socket) => {
  console.log("🛠️ Admin connected to /admin:", socket.id);

  // Join a room in /admin
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} joined /admin/${roomName}`);

    socket.emit("message", `✅ You joined /admin/${roomName}`);
    socket
      .to(roomName)
      .emit("message", `👋 ${socket.id} joined /admin/${roomName}`);
  });

  // Send message to a room in /admin
  socket.on("roomMessage", ({ room, msg }) => {
    adminNS.to(room).emit("message", `[${room}] ${socket.id}: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("💔 Admin disconnected from /admin:", socket.id);
  });
});
