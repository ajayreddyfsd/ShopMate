# ⚡ Socket.IO Cheat Sheet

Quick reference for real-time communication using Socket.io

---

## 🔑 Who is who?

- **`io`** → the whole server (all users, the “chat room”).
- **`socket`** → that one specific user’s connection.
- Both **client** and **server** have their own `socket` object and their own `socket` code.

**Note:** In the server-side-socket-code`io.on("connection", (socket) => { ... })`, Socket.IO automatically gives you the `socket` object representing the **newly connected user** as soon as a new user is connected. You can use this `socket` to talk to that user specifically.

---

## ⚡ Common Methods

### 🖥️ On the Server

| Method                                     | Use                                                                                       |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `io.on("connection", (socket) => { ... })` | Runs when a user connects. we automatically get that socket object when new user connects |
| `socket.on(event, callback)`               | Listen for a message from this user                                                       |
| `socket.emit(event, data)`                 | Send a message to **this user only**                                                      |
| `io.emit(event, data)`                     | Send a message to **everyone**                                                            |
| `socket.broadcast.emit(event, data)`       | Send to **everyone except the sender**                                                    |

### 🌐 On the Client

| Method                       | Use                                  |
| ---------------------------- | ------------------------------------ |
| `const socket = io();`       | Connect to server                    |
| `socket.on(event, callback)` | Listen for a message from the server |
| `socket.emit(event, data)`   | Send a message to the server         |

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
```

👉 Use when user sends input to server.

### Case B: Server → Client (single user)

```js
// Server
socket.emit("chat message", "Welcome!");

// Client
socket.on("chat message", (msg) => {
  console.log("Got:", msg);
});
```

👉 Use when server replies just to that one user.

### Case C: Server → All Clients

```js
// Server
io.emit("chat message", "A new user joined!");

// Client
socket.on("chat message", (msg) => {
  console.log("Got:", msg);
});
```

👉 Use when everyone should see the message.

### Case D: Server → Everyone Except Sender

```js
// Server
socket.broadcast.emit("chat message", "A new user joined!");

// Client
socket.on("chat message", (msg) => {
  console.log("Got:", msg);
});
```

👉 Use when the server tells everyone except the sender.

---

## 🔌 Connect & Disconnect

### Detect new user

```js
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});
```

Happens once when a user opens the page.
`socket` is the unique connection object for that user. we automatically get this as soon as a new user connects

### Detect user leaving

```js
socket.on("disconnect", () => {
  console.log("User disconnected:", socket.id);
});
```

Happens when the user closes the tab, refreshes, or loses internet.

---

## 🎯 Memory Tricks

- `Client socket.emit` → talks TO server
- `Server socket.emit` → talks TO that one client
- `io.emit` → talks TO all clients
- `socket.broadcast.emit` → talks TO all EXCEPT the sender

---

## 💡 Notes

- Both server and client their own `socket` object and `socket` code; context matters.
- Use `socket.emit` to talk to a specific connection.
- Use `io.emit` for broadcasting to everyone.
- Use `socket.broadcast.emit` to broadcast to all except the sender.
- Listening for events is always done with `socket.on(event, callback)`.
- The `io.on("connection")` automatically gives you `socket` representing the newly connected user.

<!-- end list -->
