const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const handleSockets = require("./sockets");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // Serve HTML + JS

handleSockets(io); // Set up socket logic

server.listen(3000, () => {
  console.log("Chat server running on http://localhost:3000");
});
