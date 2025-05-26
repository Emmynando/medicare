"use client";
import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { MdCancel } from "react-icons/md";
import { IoSend } from "react-icons/io5";

export default function ChatBox({ onClick }: { onClick: () => void }) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, joinRoom, leaveRoom, currentRoom } = useChat();
  const [roomInput, setRoomInput] = useState("");

  const handleJoin = () => {
    if (roomInput.trim()) {
      joinRoom(roomInput);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
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

        <div className="border-t-black bg-gray-800 py-1 px-2 flex justify-between items-center gap-2 fixed w-[20rem] bottom-[5%] rounded-b-lg">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 outline-none font-sm"
          />
          <button onClick={handleSend}>
            <IoSend className="text-green-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
