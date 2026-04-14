const express = require("express"); 
// Import Express → helps create backend server

const http = require("http"); 
// Needed because Socket.IO works with HTTP server

const { Server } = require("socket.io"); 
// Import Socket.IO (real-time communication)

const cors = require("cors"); 
// Allows frontend to talk to backend

const app = express(); 
// Create express app

app.use(cors()); 
// Enable cross-origin requests

const server = http.createServer(app); 
// Create HTTP server from express

const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});
// Attach Socket.IO to server

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Message received:", data);

    io.emit("receive_message", data);
    // Send message to ALL connected users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});