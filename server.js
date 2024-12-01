const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require('./src/actions/Actions'); // Ensure path is correct

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Store active rooms and users
const rooms = new Map();

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Handle joining a room
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map());
    }

    const room = rooms.get(roomId);
    room.set(socket.id, username);

    // Get all clients in the room
    const clients = Array.from(room.entries()).map(([socketId, username]) => ({
      socketId,
      username,
    }));

    socket.join(roomId);

    // Notify all clients in the room about the new user
    io.to(roomId).emit(ACTIONS.JOINED, { clients });

    console.log(`${username} joined room ${roomId}`);
  });

  // Handle code changes
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Handle synchronization of code for newly joined clients
  socket.on(ACTIONS.SYNC_CODE, ({ code, socketId }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    for (let [roomId, room] of rooms.entries()) {
      if (room.has(socket.id)) {
        room.delete(socket.id);

        // Notify remaining clients in the room
        io.to(roomId).emit(ACTIONS.DISCONNECTED, {
          socketId: socket.id,
        });

        // Remove room if it's empty
        if (room.size === 0) {
          rooms.delete(roomId);
        }

        break;
      }
    }
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
