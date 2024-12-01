import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:5000'; // Use environment variable

export const initSocket = () => {
  try {
    // Initialize socket connection
    const socket = io(URL, {
      transports: ['websocket'], // Use WebSocket transport
      reconnection: true, // Enable reconnection
      reconnectionAttempts: 10, // Maximum reconnection attempts
      reconnectionDelay: 1000, // Initial delay between attempts (ms)
      reconnectionDelayMax: 5000, // Max delay for exponential backoff
    });

    // Log successful connection
    socket.on('connect', () => {
      console.log(`Connected to the WebSocket server with ID: ${socket.id}`);
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.warn(`Disconnected from the WebSocket server. Reason: ${reason}`);
    });

    // Handle connection errors
    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    // Handle reconnection attempts
    socket.on('reconnect_attempt', (attempt) => {
      console.log(`Attempting to reconnect (#${attempt})...`);
    });

    // Handle successful reconnection
    socket.on('reconnect', (attemptNumber) => {
      console.log(`Reconnected to the WebSocket server after ${attemptNumber} attempts`);
    });

    // Handle failed reconnection
    socket.on('reconnect_failed', () => {
      console.error('Failed to reconnect to the WebSocket server');
    });

    return socket; // Return initialized socket instance
  } catch (error) {
    console.error('Error initializing socket:', error);
    throw error; // Propagate the error
  }
};
