"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { MdCancel } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IMessagesProps } from "@/constants";
import { capitalize } from "@/lib/helperFunctions";

interface ChatBoxProps {
  onClick: () => void;
  messagez: IMessagesProps[];
  ticketId: string;
}

export default function ChatBox({ onClick, messagez, ticketId }: ChatBoxProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, currentRoom } = useChat();

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagez]);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (currentRoom) {
        if (input.trim().length) {
          sendMessage(ticketId, content);
          setInput("");
        }
      }
    },
    [sendMessage, currentRoom, ticketId, input]
  );

  // Get sender name safely
  const getSenderName = (message: any): string => {
    if (!message.sender) return "Unknown";

    const firstName = message.sender.firstName || "";

    if (firstName) {
      return `${capitalize(firstName)}`;
    }

    return capitalize(firstName || "Unknown");
  };

  return (
    <div className="bg-white h-[20rem] w-[20rem] fixed right-[5%] bottom-[5%] rounded-lg z-2">
      <div className="relative">
        <span
          className="fixed right-[5%] md:bottom-[52%] lg:bottom-[52%]"
          onClick={onClick}
        >
          <MdCancel className="text-black size-[1.2rem] " />
        </span>
        <div className="border-b boder-gray-300 p-2 bg-gray-100">
          <p className="text-black font-bold text-center">Patient Operator</p>
          <p className="text-black text-sm font-semibold text-center">Online</p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 h-[14rem]">
          {messagez.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>No messages yet</p>
            </div>
          ) : (
            messagez.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderRole === "USER"
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg ${
                    message.senderRole === "USER"
                      ? "bg-white text-gray-800 border border-gray-200"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  <p className="text-sm break-words">
                    <span
                      className={`text-xs ${
                        message.senderRole === "USER"
                          ? "text-gray-500"
                          : "text-blue-100"
                      }`}
                    >
                      {capitalize(message.sender.firstName)}
                    </span>
                    : {message.content}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span
                      className={`text-xs ${
                        message.senderRole === "USER"
                          ? "text-gray-400"
                          : "text-blue-100"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t-black bg-gray-800 py-1 px-2 flex justify-between items-center gap-2 fixed w-[20rem] bottom-[5%] rounded-b-lg">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage}
            placeholder="Type a message..."
            className="flex-1 outline-none font-sm"
          />
          <button onClick={() => handleSendMessage(input)}>
            <IoSend className="text-green-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 07030818711
