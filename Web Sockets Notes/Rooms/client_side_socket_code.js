// ------------------------------------------------------
// CONNECT TO /chat NAMESPACE
// ------------------------------------------------------
const chatSocket = io("/chat");

chatSocket.on("connect", () => {
  console.log("💬 Connected to /chat with id:", chatSocket.id);
});

// Join room1 and room2 in /chat
chatSocket.emit("joinRoom", "room1");
chatSocket.emit("joinRoom", "room2");

// Send a message to room1
chatSocket.emit("roomMessage", {
  room: "room1",
  msg: "Hello Room 1 in /chat!",
});

// Send a message to room2
chatSocket.emit("roomMessage", {
  room: "room2",
  msg: "Hello Room 2 in /chat!",
});

// Listen for messages in /chat
chatSocket.on("message", (msg) => {
  console.log("📩 /chat received:", msg);
});

// ------------------------------------------------------
// CONNECT TO /admin NAMESPACE
// ------------------------------------------------------
const adminSocket = io("/admin");

adminSocket.on("connect", () => {
  console.log("🛠️ Connected to /admin with id:", adminSocket.id);
});

// Join room1 and room2 in /admin
adminSocket.emit("joinRoom", "room1");
adminSocket.emit("joinRoom", "room2");

// Send a message to room1
adminSocket.emit("roomMessage", {
  room: "room1",
  msg: "Hello Room 1 in /admin!",
});

// Send a message to room2
adminSocket.emit("roomMessage", {
  room: "room2",
  msg: "Hello Room 2 in /admin!",
});

// Listen for messages in /admin
adminSocket.on("message", (msg) => {
  console.log("🚨 /admin received:", msg);
});
