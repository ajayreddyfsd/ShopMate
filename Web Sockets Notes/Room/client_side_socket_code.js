const chatSocket = io("/chat");

// Join a room, here he is joining room1
chatSocket.emit("joinRoom", "room1");

// Send message to that room
chatSocket.emit("roomMessage", { room: "room1", msg: "Hello Room 1!" });

// Listen for messages from that room
chatSocket.on("message", (msg) => {
  console.log("Received:", msg);
});
