// hooks/useChat.ts
import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export const useChat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<
    Array<{ user: string; message: string }>
  >([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
    );
    setSocket(newSocket);

    newSocket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (socket && currentRoom) {
        socket.emit("message", { roomId: currentRoom, message });
      }
    },
    [socket, currentRoom]
  );

  const joinRoom = useCallback(
    (roomId: string) => {
      if (socket) {
        socket.emit("joinRoom", roomId);
        setCurrentRoom(roomId);
      }
    },
    [socket]
  );

  const leaveRoom = useCallback(() => {
    if (socket && currentRoom) {
      socket.emit("leaveRoom", currentRoom);
      setCurrentRoom(null);
    }
  }, [socket, currentRoom]);

  return {
    messages,
    sendMessage,
    joinRoom,
    leaveRoom,
    currentRoom,
  };
};
