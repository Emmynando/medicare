"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/lib/baseUrl";
import { useGetAllChatsQuery } from "@/store/SupportApi";
import SupportTable from "@/component/Layout/Support/SupportTable";
import { convertDate } from "@/lib/helperFunctions";
import ChatBox from "@/component/Layout/Chats/ChatBox";

export default function SupportAgent() {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${baseUrl}/support/tickets/me`, {
          withCredentials: true,
        });
        if (data.data.tickets.length >= 1) {
          setShowChatBox(true);
          const activeTicket = await axios.get(
            `${baseUrl}/support/tickets/${selectedTicketId}/messages`,
            {
              withCredentials: true,
            }
          );
          console.log(activeTicket);
          return;
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    })();
  }, [selectedTicketId]);

  const { data: tickets, error } = useGetAllChatsQuery();

  async function handleOpenModal(ticketId: string) {
    setShowModal(true);
    setSelectedTicketId(ticketId);
  }
  async function handleEnterChat() {
    // if there is ongoing ticket
    if (showChatBox) {
      console.log("You have an active ticket");
      return;
    }
    if (selectedTicketId) {
      const data = await axios.post(
        `${baseUrl}/support/tickets/${selectedTicketId}/assign`,
        { ticketId: selectedTicketId },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    }
  }

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
      {showChatBox && <ChatBox onClick={handleEnterChat} />}
    </main>
  );
}
