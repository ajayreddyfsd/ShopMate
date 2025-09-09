// Load required modules
const express = require("express"); // Makes web server development easy
const http = require("http"); // Needed to attach Socket.IO
const { Server } = require("socket.io"); // Real-time chat server
const handleSockets = require("./sockets"); // Our custom chat logic

// Function to start the server
function startServer() {
  const app = express(); // Create Express app
  const server = http.createServer(app); // Create HTTP server
  const io = new Server(server); // Attach Socket.IO to server

  app.use(express.static("public")); // Serve HTML/CSS/JS from public folder

  handleSockets(io); // Run chat logic

  // Start listening on port 3000
  server.listen(3000, () => {
    console.log("Chatbot server running at http://localhost:3000");
  });
}

// Call the function to start everything
startServer();
