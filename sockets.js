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
  const choice = msg.trim(); // Remove spaces
  io.emit("chat message", `User says: ${msg}`); // Show user message to everyone

  if (menu[choice]) {
    socket.emit("chat message", `Server says: ${menu[choice]}`); // Send answer only to that user/socket
    setTimeout(() => sendMenu(socket), 1000); // Show menu again
  } else {
    socket.emit(
      "chat message",
      "Server says: Sorry, I didn't understand. Please type 1, 2, or 3."
    ); // Send answer only to that user/socket
  }
}

// Function to handle a user disconnecting
function handleDisconnect(io, socket) {
  io.emit("chat message", "Server says: A user left the chat."); // Tell everyone
  console.log("User disconnected:", socket.id); // Show in console
}

// Main function to attach socket events
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
