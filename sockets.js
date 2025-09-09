//! this is the server side socket code
//! this is the server side socket code
//! this is the server side socket code
//! this is the server side socket code
//? so to send message from the server to the client, we use socket.emit("event-type", "message")
//? so to send message from the server to all-the-clients/everyone-in-the-room, we use io.emit("event-type", "message")
//? so to send message from the server to all the clients except that one user who sent it, we use socket.broadcast.emit("event-type", "message")
//? so to listen to the message from the user to the server, we use socket.on("event-type", "call back function with that message")
//? even the event "disconnection", we listen using socket.on("disconnection", "call back function")
//? but for "connection", we listen in io.on("connection", "call back function")

// Predefined menu answers
const menu = {
  1: "Our stores are open from 9am to 9pm, Monday to Sunday.",
  2: "You can return items within 30 days with a receipt.",
  3: "We ship nationwide. Standard shipping takes 3-5 business days.",
};

// Function to send the menu to a user from the server
//? "chat message" is the event type
function sendMenu(socket) {
  socket.emit(
    "chat message",
    "Server says: Welcome! Please choose an option:\n" +
      "1️⃣ Store hours\n" +
      "2️⃣ Refund policy\n" +
      "3️⃣ Shipping info\n" +
      "Type the number of your choice."
  );
}

// Function to handle a message from a user
function handleMessage(io, socket, msg) {
  const choice = msg.trim(); // Clean up spaces just in case

  // OPTION A: Send the user's message to EVERYONE (including the sender)
  io.emit("chat message", `User says: ${msg}`);

  // OPTION B: Send the user's message to EVERYONE EXCEPT the sender
  // socket.broadcast.emit("chat message", `User says: ${msg}`);

  // OPTION C - Send the user's message to a specific ROOM (everyone in room)
  // io.to("room-name").emit("chat message", `User in room says: ${msg}`);

  // OPTION D - Send the user's message to everyone in a room EXCEPT the sender
  // socket.to("room-name").emit("chat message", `User in room says: ${msg}`);

  // OPTION E - Send a message to a specific socket id (one user) from the server
  // io.to("<socketId>").emit("private message", `Private: ${msg}`);

  if (menu[choice]) {
    // Valid menu option:
    // -> Reply ONLY to that specific user
    socket.emit("chat message", `Server says: ${menu[choice]}`);

    // -> After 1 second, show the menu again (ONLY to that user)
    setTimeout(() => sendMenu(socket), 1000);
  } else {
    // Invalid input:
    // -> Reply ONLY to that specific user
    socket.emit(
      "chat message",
      "Server says: Sorry, I didn't understand. Please type 1, 2, or 3."
    );
  }
}

// Function to handle a user disconnecting
//? once the user disconnects, we cannot send him any more message
//? we can only print to console or send to the rest
function handleDisconnect(io, socket) {
  // Tell EVERYONE including the user (though the user won’t see it after disconnect)
  io.emit("chat message", "Server says: A user left the chat.");

  // Tell everyone EXCEPT the user who left
  socket.broadcast.emit("chat message", "Let us all say final goodbye to him.");

  //? socket.emit here won't work because the user has already disconnected, so we are just printing to the console
  console.log("User disconnected:", socket.id);
}

// we handle all the server side socket code inside this function
// everything happens inside io.on(). right from connection to, sending/receiving messages to, finally disconnection
// as soon as connection is established, we automatically get a socket-object (here, socket refers to client's socket and not user's socket)
// so, as soon as connection is established, we automatically get the socket-object, using which we run the io.on() callback function
// which is where rest of code happens
// like sending menu to the client and listening for suubsequent events like "new messages" or "disconnection"
function handleSockets(io) {
  //? io.on with "connection" event type, keep listening to user connections
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    sendMenu(socket);

    //? listening to the messages from the user
    //? "chat message" is the event type
    //? "disconnect" is also an event type
    socket.on("chat message", (msg) => handleMessage(io, socket, msg));
    socket.on("disconnect", () => handleDisconnect(io, socket));
  });
}

// ✅ Export the main function at the end
module.exports = { handleSockets };

//? but where are we getting the socket in the above code from?
//? when we have a new user connection, the websockets automatically creates a socket for that user and passes it to its callback
