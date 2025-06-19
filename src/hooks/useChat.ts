// // hooks/useChat.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { IMessagesProps } from "@/constants";
import { io, Socket } from "socket.io-client";

interface ReadReceipt {
  messageId: string;
  userId: string;
  timestamp: Date;
  status: boolean;
}

interface MessageHookProps {
  id: string;
  ticketId: string;
  message: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  timestamp: string;
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
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const mountedRef = useRef(true);

  // Initialize state from localStorage once on mount
  useEffect(() => {
    const savedRoom = localStorage.getItem("currentRoom");
    const savedStatus = localStorage.getItem(
      "assignmentStatus"
    ) as typeof assignmentStatus;

    if (savedRoom) {
      setCurrentRoom(savedRoom);
      console.log("Restored room from localStorage:", savedRoom);
    }

    if (savedStatus) {
      setAssignmentStatus(savedStatus);
      console.log("Restored status from localStorage:", savedStatus);
    }
  }, []);

  // Restore state from localStorage on mount
  useEffect(() => {
    mountedRef.current = true;

    const initializeSocket = () => {
      // Don't create new socket if one already exists and is connected
      if (socketRef.current?.connected) {
        return;
      }

      // Clean up existing socket first
      if (socketRef.current) {
        console.log("Cleaning up existing socket");
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
      }

      const newSocket = io(
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001",
        {
          transports: ["websocket", "polling"],
          withCredentials: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          timeout: 20000,
          // forceNew: true, // Force new connection
        }
      );

      socketRef.current = newSocket;

      // Connection status handlers
      newSocket.on("connect", () => {
        if (!mountedRef.current) return;

        setIsConnected(true);
        setConnectionAttempts(0);
        console.log("Socket connected", newSocket.id);

        // Rejoin room if we had one before disconnect
        const savedRoom = localStorage.getItem("currentRoom");
        if (savedRoom) {
          console.log(`Rejoining room: ${savedRoom}`);
          // Set immediately
          setCurrentRoom(savedRoom);
          setAssignmentStatus("CONNECTING");
          newSocket.emit("joinRoom", { ticketId: savedRoom });
        }
      });

      newSocket.on("connect_error", (error) => {
        if (!mountedRef.current) return;

        console.error("Socket connection error:", error.message);
        setConnectionAttempts((prev) => prev + 1);

        // If too many failed attempts, give up
        if (connectionAttempts >= 3) {
          console.error("Max connection attempts reached");
          setIsConnected(false);
          setIsConnected(false);
          setConnectionAttempts((prev) => prev + 1);
        }
      });

      newSocket.on("disconnect", (reason) => {
        if (!mountedRef.current) return;

        console.log("Disconnected because:", reason);
        setIsConnected(false);
      });

      // Ticket assignment handlers
      newSocket.on("ticketAssigned", (data: { ticketId: string }) => {
        if (!mountedRef.current) return;

        setCurrentRoom(data.ticketId);
        setAssignmentStatus("IN_PROGRESS");

        // Persist state
        localStorage.setItem("currentRoom", data.ticketId);
        localStorage.setItem("assignmentStatus", "IN_PROGRESS");
        console.log(`Ticket ${data.ticketId} assigned successfully`);
      });

      newSocket.on("ticketAssignmentError", (data: { error: string }) => {
        if (!mountedRef.current) return;

        setAssignmentStatus("OPEN");
        console.error("Ticket assignment error:", data.error);
      });

      // Room join confirmation
      newSocket.on(
        "roomJoined",
        (data: { roomId: string; messages?: IMessagesProps[] }) => {
          if (!mountedRef.current) return;
          // Update state
          setCurrentRoom(data.roomId);
          setAssignmentStatus("IN_PROGRESS");

          // Update messages if they exist
          if (data.messages) {
            setMessages(data.messages);
          }

          // Persist state
          localStorage.setItem("currentRoom", data.roomId);
          localStorage.setItem("assignmentStatus", "IN_PROGRESS");

          console.log(`Successfully joined room: ${data.roomId}`);
        }
      );

      newSocket.on("roomJoinError", (data: { error: string }) => {
        if (!mountedRef.current) return;

        console.error("Failed to join room:", data.error);
        // Clear invalid room data
        setCurrentRoom(null);
        setAssignmentStatus("OPEN");
        localStorage.removeItem("currentRoom");
        localStorage.removeItem("assignmentStatus");
      });

      newSocket.on("roomHistory", (data: { messages: IMessagesProps[] }) => {
        setMessages(data.messages);
      });

      newSocket.on("new_message", (data) => {
        if (!mountedRef.current) return;
        setMessages((prev) => [...prev, data]);
        localStorage.setItem("socketSessionId", data.sessionId);
      });

      newSocket.on("messageError", (error) => {
        if (!mountedRef.current) return;

        console.error("Authentication failed:", error.message);
      });

      // Message status updates
      newSocket.on(
        "messageStatusUpdate",
        (data: { messageId: string; status: string }) => {
          if (!mountedRef.current) return;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === data.messageId ? { ...msg, status: data.status } : msg
            )
          );
        }
      );

      newSocket.on("readReceipt", (receipt: ReadReceipt) => {
        if (!mountedRef.current) return;

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
        if (!mountedRef.current) return;

        if (currentRoom === data.ticketId) {
          setCurrentRoom(null);
          setMessages([]);
          setAssignmentStatus("CLOSED");
        }

        // Clear persisted state
        localStorage.removeItem("currentRoom");
        localStorage.removeItem("assignmentStatus");
      });

      newSocket.on("auth_error", (error) => {
        if (!mountedRef.current) return;

        console.error("Authentication failed:", error.message);
      });
    };

    // Initialize socket with a small delay to ensure component is fully mounted
    const timeoutId = setTimeout(initializeSocket, 100);

    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutId);

      if (socketRef.current) {
        // Only disconnect if we're not keeping the connection
        // if (!localStorage.getItem("currentRoom")) {
        socketRef.current.disconnect();
        // }
        socketRef.current.removeAllListeners();

        socketRef.current = null;
      }
    };
  }, []);

  const assignTicket = useCallback(
    (ticketId: string) => {
      if (socketRef.current?.connected && isConnected) {
        console.log("Assigning ticket:", ticketId);
        socketRef.current.emit("ticketAssigned", { ticketId });
        setAssignmentStatus("CONNECTING");
        localStorage.setItem("assignmentStatus", "CONNECTING");
      } else {
        console.warn("Socket not connected, cannot assign ticket");
      }
    },
    [isConnected]
  );

  const joinRoom = useCallback((roomId: string) => {
    if (!socketRef.current?.connected) {
      console.warn("Socket not connected, cannot join room");
      return;
    }

    socketRef.current.emit("joinRoom", { ticketId: roomId });
    setCurrentRoom(roomId);
    localStorage.setItem("assignmentStatus", "CONNECTING");
    console.log("Joining room:", roomId);
  }, []);

  const sendMessage = useCallback((ticketId: string, message: string) => {
    try {
      if (socketRef.current?.connected && ticketId) {
        const messageData: Partial<MessageHookProps> = {
          ticketId,
          message: message.trim(),
        };
        socketRef.current.emit("ticketMessage", messageData);
        console.log(messageData);
      } else {
        console.warn(
          "Socket not connected or missing ticketId, cannot send message"
        );
      }
    } catch (error) {
      socketRef.current?.emit("messageError", error);
    }
  }, []);

  const leaveRoom = useCallback(() => {
    if (socketRef.current?.connected && currentRoom) {
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
    isConnected,
  };
};
