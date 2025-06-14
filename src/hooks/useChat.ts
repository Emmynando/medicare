// hooks/useChat.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { IMessagesProps } from "@/constants";
import { io, Socket } from "socket.io-client";

interface ReadReceipt {
  messageId: string;
  userId: string;
  timestamp: Date;
  status: boolean;
}

export const useChat = () => {
  const [readReceipts, setReadReceipts] = useState<ReadReceipt[]>([]);
  const [messages, setMessages] = useState<Array<IMessagesProps>>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [assignmentStatus, setAssignmentStatus] = useState<
    "OPEN" | "IN_PROGRESS" | "CLOSED" | "CONNECTING"
  >("OPEN");
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  //  Restore state from localStorage on mount

  useEffect(() => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001",
      {
        transports: ["websocket"],
        withCredentials: true,
        upgrade: true,
        rememberUpgrade: true,
      }
    );
    socketRef.current = newSocket;

    // Connection status handlers
    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected", newSocket.id);

      // Rejoin room if we had one before disconnect
      const savedRoom = localStorage.getItem("currentRoom");
      if (savedRoom) {
        console.log(`Rejoining room: ${savedRoom}`);
        newSocket.emit("rejoinRoom", savedRoom);
      }
    });

    newSocket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
      localStorage.setItem("socketSessionId", data.sessionId);
    });

    // NEW: Ticket assignment handlers
    newSocket.on(
      "ticketAssigned",
      (data: {
        ticketId: string;
        agentId: string;
        messages: IMessagesProps[];
      }) => {
        setCurrentRoom(data.ticketId);
        setMessages(data.messages);
        setAssignmentStatus("IN_PROGRESS");

        // Persist state
        localStorage.setItem("currentRoom", data.ticketId);
        localStorage.setItem("assignmentStatus", "IN_PROGRESS");
        console.log(`Ticket ${data.ticketId} assigned successfully`);
      }
    );
    newSocket.on("ticketAssignmentError", (data: { error: string }) => {
      setAssignmentStatus("OPEN");
      console.error("Ticket assignment error:", data.error);
    });

    // Room join confirmation
    newSocket.on(
      "roomJoined",
      (data: { roomId: string; messages?: IMessagesProps[] }) => {
        setCurrentRoom(data.roomId);
        if (data.messages) {
          setMessages(data.messages);
        }
        setAssignmentStatus("IN_PROGRESS");

        // Persist state
        localStorage.setItem("currentRoom", data.roomId);
        localStorage.setItem("assignmentStatus", "IN_PROGRESS");

        console.log(`Successfully joined room: ${data.roomId}`);
      }
    );

    newSocket.on("roomJoinError", (data: { error: string }) => {
      console.error("Failed to join room:", data.error);
      // Clear invalid room data
      localStorage.removeItem("currentRoom");
      localStorage.removeItem("assignmentStatus");
      setCurrentRoom(null);
      setAssignmentStatus("OPEN");
    });

    // Message status updates
    newSocket.on(
      "messageStatusUpdate",
      (data: { messageId: string; status: string }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === data.messageId ? { ...msg, status: data.status } : msg
          )
        );
      }
    );

    newSocket.on("readReceipt", (receipt: ReadReceipt) => {
      setReadReceipts((prev) => {
        const existingIndex = prev.findIndex(
          (r) =>
            r.messageId === receipt.messageId && r.userId === receipt.userId
        );

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = receipt;
          return updated;
        }

        return [...prev, receipt];
      });
    });

    newSocket.on("ticketClosed", (data: { ticketId: string }) => {
      if (currentRoom === data.ticketId) {
        setCurrentRoom(null);
        setMessages([]);
        setAssignmentStatus("CLOSED");
      }

      // Clear persisted state
      localStorage.removeItem("currentRoom");
      localStorage.removeItem("assignmentStatus");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    // newSocket.on("disconnect", () => {
    //   setIsConnected(false);
    //   console.log("Socket disconnected");
    // });
    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected because:", reason);
      setIsConnected(false);
    });
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const assignTicket = useCallback((ticketId: string) => {
    if (socketRef.current && isConnected) {
      console.log("here");
      socketRef.current.emit("ticketAssigned", { ticketId });
      setAssignmentStatus("CONNECTING");
      localStorage.setItem("assignmentStatus", "CONNECTING");
    }
  }, []);
  const joinRoom = useCallback((roomId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("joinRoom", roomId);
      setCurrentRoom(roomId);
      localStorage.setItem("assignmentStatus", "CONNECTING");
    }
  }, []);

  const sendMessage = useCallback((message: string, ticketId: string) => {
    if (socketRef.current && ticketId) {
      const messageData: Partial<IMessagesProps> = {
        id: ticketId,
        content: message,
        timestamp: new Date().toISOString(),
      };
      socketRef.current.emit("ticketMessage", messageData);
    }
  }, []);

  const leaveRoom = useCallback(() => {
    if (socketRef.current && currentRoom) {
      socketRef.current.emit("leaveRoom", currentRoom);
      setCurrentRoom(null);
      setAssignmentStatus("CLOSED");

      // Clear persisted state
      localStorage.removeItem("currentRoom");
      localStorage.removeItem("assignmentStatus");
      localStorage.removeItem("socketSessionId");
    }
  }, [currentRoom]);

  return {
    messages,
    sendMessage,
    assignTicket,
    joinRoom,
    leaveRoom,
    currentRoom,
    assignmentStatus,
    readReceipts,
  };
};
