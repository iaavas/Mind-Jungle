const http = require('http');
const { Server } = require('socket.io');

const startWebSocketServer = () => {
  const server = http.createServer();
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected.');

    // Listen for incoming messages
    socket.on('message', (message) => {
      console.log('Received message:', message);

      // Broadcast the message to all connected clients
      io.emit('message', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected.');
    });
  });

  server.listen(3000, () => {
    console.log('WebSocket server is listening on port 3000.');
  });
};

module.exports = startWebSocketServer;
