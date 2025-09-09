# ⚡ Socket.IO Cheat Sheet

Your quick reference for real-time communication.

---

## 🔑 Who is who?
- **`io`** → the whole server (all users, the “chat room”).  
- **`socket`** → one specific user’s connection.  
- Both **client** and **server** have their own `socket` object.  

---

## ⚡ Common Methods

### 🖥️ On the Server
| Method | Use |
|--------|-----|
| `io.on("connection", (socket) => { ... })` | Runs when a user connects |
| `socket.on(event, callback)` | Listen for a message from this user |
| `socket.emit(event, data)` | Send a message to this user only |
| `io.emit(event, data)` | Send a message to **everyone** |
| `socket.broadcast.emit(event, data)` | Send to **everyone except the sender** |

### 🌐 On the Client
| Method | Use |
|--------|-----|
| `const socket = io();` | Connect to server |
| `socket.on(event, callback)` | Listen for a message from the server |
| `socket.emit(event, data)` | Send a message to the server |

---

## 📡 Message Flow (Who talks to who?)

### Case A: Client → Server
```js
// Client
socket.emit("chat message", "Hello!");

// Server
socket.on("chat message", (msg) => {
  console.log("Got:", msg);
});
