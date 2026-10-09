import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;
let activeToken: string | null = null;

export const getCommunicationSocket = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  if (socket && activeToken !== token) {
    socket.disconnect();
    socket = null;
  }

  if (!socket) {
    activeToken = token;
    const apiUrl = new URL(
      import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
      window.location.origin
    );
    socket = io(apiUrl.origin, {
      auth: { token },
      autoConnect: true,
      transports: ["websocket", "polling"],
    });
  }

  return socket;
};
