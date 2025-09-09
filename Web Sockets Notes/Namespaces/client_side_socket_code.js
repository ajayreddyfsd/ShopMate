// ------------------------------------------------------
// Connect to ROOT namespace "/"
// ------------------------------------------------------
const rootSocket = io("/"); // connect to root
rootSocket.on("connect", () => {
  console.log("✅ Connected to ROOT with id:", rootSocket.id);
});
// Send a message to root namespace
rootSocket.emit("message", "Hello from ROOT user!");
// Receive messages from root namespace
rootSocket.on("message", (msg) => {
  console.log("📩 Root received:", msg);
});

// ------------------------------------------------------
// Connect to CHAT namespace "/chat"
// ------------------------------------------------------
const chatSocket = io("/chat"); // connect to /chat
chatSocket.on("connect", () => {
  console.log("💬 Connected to CHAT with id:", chatSocket.id);
});
// Send a message to chat namespace
chatSocket.emit("message", "Hello from CHAT user!");
// Receive messages from chat namespace
chatSocket.on("message", (msg) => {
  console.log("💌 Chat received:", msg);
});

// ------------------------------------------------------
// Connect to ADMIN namespace "/admin"
// ------------------------------------------------------
const adminSocket = io("/admin"); // connect to /admin
adminSocket.on("connect", () => {
  console.log("🛠️ Connected to ADMIN with id:", adminSocket.id);
});
// Send an alert to admin namespace
adminSocket.emit("alert", "Server needs maintenance!");
// Receive alerts from admin namespace
adminSocket.on("alert", (msg) => {
  console.log("🚨 Admin received:", msg);
});
