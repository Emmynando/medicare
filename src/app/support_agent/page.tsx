"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/lib/baseUrl";
import { useGetAllChatsQuery } from "@/store/SupportApi";
import SupportTable from "@/component/Layout/Support/SupportTable";
import { convertDate } from "@/lib/helperFunctions";
import ChatBox from "@/component/Layout/Chats/ChatBox";
import { IMessagesProps } from "@/constants";
import { useChat } from "@/hooks/useChat";

export default function SupportAgent() {
  const router = useRouter();
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [activeTicketMessages, setActiveTicketMessages] = useState<
    IMessagesProps[]
  >([]);
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const { assignTicket, joinRoom, sendMessage, currentRoom, assignmentStatus } =
    useChat();

  // Check for active tickets on component mount
  useEffect(() => {
    checkActiveTickets();
  }, []);

  const { data: tickets, error } = useGetAllChatsQuery();

  const handleOpenModal = useCallback((ticketId: string) => {
    setShowModal(true);
    setSelectedTicketId(ticketId);
  }, []);

  const checkActiveTickets = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/support/tickets/me`, {
        withCredentials: true,
      });

      if (response.data.tickets.length >= 1) {
        const activeTicket = response.data.tickets[0];
        setActiveTicketId(activeTicket.id);
        setShowChatBox(true);

        // Fetch messages for the active ticket
        await fetchTicketMessages(activeTicket.id);
      }
    } catch (error) {
      console.error("Error fetching active tickets:", error);
    }
  }, [joinRoom]);

  const fetchTicketMessages = async (ticketId: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/support/tickets/${ticketId}/messages`,
        {
          withCredentials: true,
        }
      );
      setActiveTicketMessages(response.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  if (error) {
    console.log(error);
  }

  const handleEnterChat = useCallback(async () => {
    // if there is ongoing ticket
    if (currentRoom) {
      console.log("You have an active ticket");
      return;
    }

    if (selectedTicketId) {
      assignTicket(selectedTicketId);
      joinRoom(selectedTicketId);
      await fetchTicketMessages(selectedTicketId);

      setShowModal(false);
      setActiveTicketId(selectedTicketId);
      setShowChatBox(true);
      console.log(activeTicketMessages);
      router.refresh();
    }
  }, [selectedTicketId, assignTicket, joinRoom, currentRoom]);

  return (
    <main>
      <h2>All Message Request</h2>
      {tickets?.tickets.length ? (
        tickets.tickets.map((ticket) => (
          <SupportTable
            key={ticket.id}
            id={ticket.id}
            status={ticket.status}
            clientName={ticket?.user.firstName}
            createdAt={convertDate(ticket?.createdAt)}
            message={ticket?.messages[0]?.content ?? "No message"}
            assignedAgent={
              ticket.assignedAgent ?? ticket.assignedAgent ?? "Not Assigned"
            }
            allMessages={ticket.messages}
            showModal={showModal}
            onClick={() => setShowModal(false)}
            onChatEnter={handleEnterChat}
            onOpenModal={() => handleOpenModal(ticket.id)}
          />
        ))
      ) : (
        <p>No tickets found</p>
      )}
      {/* {showChatBox && activeTicketId && (
        <ChatBox
          onClick={handleEnterChat}
          messagez={activeTicketMessages}
          ticketId={activeTicketId}
        />
      )} */}
    </main>
  );
}

// async function handleEnterChat() {
//     // if there is ongoing ticket
//     if (currentRoom) {
//       console.log("You have an active ticket");
//       return;
//     }
//     if (selectedTicketId) {
//       assignTicket(selectedTicketId);
//       joinRoom(selectedTicketId)
//       setShowModal(false)
//       // const data = await axios.post(
//       //   `${baseUrl}/support/tickets/${selectedTicketId}/assign`,
//       //   { ticketId: selectedTicketId },
//       //   {
//       //     withCredentials: true,
//       //   }
//       // );
//       // if (data.data.success) {
//       //   setActiveTicketId(selectedTicketId);
//       //   setShowChatBox(true);
//       //   setShowModal(false);

//       //   // Fetch messages for the newly assigned ticket
//       //   await fetchTicketMessages(selectedTicketId);
//       // }
//     }
//   }
