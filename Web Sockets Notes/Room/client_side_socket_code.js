//! connected with the "chat" namespace
const chatSocket = io("/chat");

// Join a room, here he is joining room1
//! "joinRoom" is the event type, which is followed by the room-name
chatSocket.emit("joinRoom", "room1");

// Send message to that room
//! "roomMessage" is the event type
chatSocket.emit("roomMessage", { room: "room1", msg: "Hello Room 1!" });

// Listen for messages from that room
chatSocket.on("message", (msg) => {
  console.log("Received:", msg);
});
