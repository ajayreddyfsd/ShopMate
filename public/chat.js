//! this is the client/user side socket code
//! this is the client/user side socket code
//! this is the client/user side socket code
//! this is the client/user side socket code
//? so to send message from the user to the server, we use socket.emit("event-type", "message")
//? so to listen to the message to the user from the server, we use socket.on("event-type", "call back function with that message")
//? here, the socket refers to the server's socket and not the client's socket

// Connect to the server using Socket.IO
const socket = io();

// Get the div where messages will appear
const messagesDiv = document.getElementById("messages");

// Get the input box where user types message
const input = document.getElementById("msgInput");

// Get the send button
const btn = document.getElementById("sendBtn");

//! this one listens to the messages from the server to the user
//? "chat message" is the event type
//? "msg" is the message coming from the server
// Listen for messages coming from the server
socket.on("chat message", (msg) => {
  // Make a new paragraph element to show the message
  const p = document.createElement("p");

  // Set the text inside the paragraph to be the message
  p.textContent = msg;

  // If message starts with "User says:" it came from user, else it's from bot/server
  if (msg.startsWith("User says:")) {
    // Add classes for styling user messages
    p.classList.add("message", "user");
  } else {
    // Add classes for styling bot messages
    p.classList.add("message", "server");
  }

  // Add this new message paragraph to the messages div
  messagesDiv.appendChild(p);

  // Scroll the messages div to the bottom so newest message is visible
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

//! this one sends message from the user to the server
//? "chat message" is the event type
// When send button is clicked, we take the user-input and emit the value the server
// by server i mean either the server.js file or the sockets.js file
// whichever has the io.on() and is listening for this
btn.addEventListener("click", () => {
  // If input is empty, do nothing
  if (input.value.trim() === "") return;

  //? Send the typed message from the user to the server
  //? "chat message" is the event type
  socket.emit("chat message", input.value);

  // Clear the input box so user can type new message
  input.value = "";
});

// same as above
// but also allowing the sending of message by pressing Enter key
input.addEventListener("keydown", (e) => {
  // If pressed key is Enter, click the send button
  if (e.key === "Enter") btn.click();
});
