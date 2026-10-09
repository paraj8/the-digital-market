const { Server } = require("socket.io");
const attachSocketHandlers = require("./socket_handlers");

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || true,
      credentials: true,
    },
    pingTimeout: 20000,
  });
  attachSocketHandlers(io);
  return io;
};

module.exports = initializeSocket;
