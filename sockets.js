module.exports = function (io) {
  const menu = {
    1: "Our stores are open from 9am to 9pm, Monday to Sunday.",
    2: "You can return items within 30 days with a receipt.",
    3: "We ship nationwide. Standard shipping takes 3-5 business days.",
  };

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Send menu
    function sendMenu() {
      socket.emit(
        "chat message",
        "Server says: Welcome! Please choose an option:\n" +
          "1️⃣ Store hours\n" +
          "2️⃣ Refund policy\n" +
          "3️⃣ Shipping info\n" +
          "Type the number of your choice."
      );
    }

    sendMenu();

    socket.on("chat message", (msg) => {
      io.emit("chat message", `User says: ${msg}`);

      const choice = msg.trim();
      if (menu[choice]) {
        socket.emit("chat message", `Server says: ${menu[choice]}`);
        setTimeout(sendMenu, 500); // Show menu again
      } else {
        socket.emit(
          "chat message",
          "Server says: Sorry, I didn't understand. Please type 1, 2, or 3."
        );
      }
    });

    socket.on("disconnect", () => {
      io.emit("chat message", "Server says: A user left the chat.");
      console.log("User disconnected:", socket.id);
    });
  });
};
