import { io } from 'socket.io-client';

const URL = 'http://localhost:5000'; // Backend server URL

export const initSocket = () => {
  try {
    const socket = io(URL, {
      transports: ['websocket'], // Use WebSocket transport
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    // Log connection status for debugging
    socket.on('connect', () => {
      console.log(`WebSocket connected: ${socket.id}`);
    });

    socket.on('disconnect', (reason) => {
      console.warn(`Disconnected from WebSocket server. Reason: ${reason}`);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    return socket;
  } catch (error) {
    console.error('Error initializing socket:', error);
    throw error;
  }
};
