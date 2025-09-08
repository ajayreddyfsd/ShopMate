const socket = io();

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("msgInput");
const btn = document.getElementById("sendBtn");

// Listen for messages from server
socket.on("chat message", (msg) => {
  const p = document.createElement("p");
  p.textContent = msg;

  if (msg.startsWith("User says:")) {
    p.classList.add("message", "user");
  } else {
    p.classList.add("message", "server");
  }

  messagesDiv.appendChild(p);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Send message when button clicked
btn.addEventListener("click", () => {
  if (input.value.trim() === "") return;
  socket.emit("chat message", input.value);
  input.value = "";
});

// Optional: send message on Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btn.click();
});
