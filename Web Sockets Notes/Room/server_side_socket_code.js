const { Server } = require("socket.io");
const io = new Server(3000);

// Only 1 namespace: /chat
const chat = io.of("/chat");

chat.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a room
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    socket.emit("message", `You joined room: ${roomName}`);
    socket.to(roomName).emit("message", `${socket.id} joined the room`);
  });

  // Send message to room
  socket.on("roomMessage", ({ room, msg }) => {
    // Everyone in the room gets the message (including sender)
    chat.to(room).emit("message", `[${room}] ${socket.id}: ${msg}`);
  });
});
