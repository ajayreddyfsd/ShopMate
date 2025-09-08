const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const handleSockets = require("./sockets");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // Serve static files

handleSockets(io); // Socket logic

server.listen(3000, () => {
  console.log("Chatbot server running at http://localhost:3000");
});
