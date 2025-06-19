"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/lib/baseUrl";
import { useGetAllChatsQuery } from "@/store/SupportApi";
import SupportTable from "@/component/Layout/Support/SupportTable";
import { capitalize, convertDate } from "@/lib/helperFunctions";
// import ChatBox from "@/component/Layout/Chats/ChatBox";
import { IMessagesProps } from "@/constants";
import { useChat } from "@/hooks/useChat";
const ChatBox = dynamic(() => import("@/component/Layout/Chats/ChatBox"), {
  ssr: false,
});

export default function SupportAgent() {
  const router = useRouter();
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const { messages } = useChat();
  // const [activeTicketMessages, setActiveTicketMessages] = useState<
  //   IMessagesProps[]
  // >([]);
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const { assignTicket, joinRoom, currentRoom } = useChat();

  const { data: tickets, error } = useGetAllChatsQuery();
  // Check for active tickets on component mount
  useEffect(() => {
    checkActiveTickets();
  }, []);

  // to open modal of the selected message
  const handleOpenModal = useCallback((ticketId: string) => {
    setShowModal(true);
    setSelectedTicketId(ticketId);
  }, []);

  // fetch active ticket for agent
  const checkActiveTickets = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/support/tickets/me?role=SUPPORT_AGENT`,
        {
          withCredentials: true,
        }
      );

      if (response.data.tickets.length >= 1) {
        // close the chat details modal
        setShowModal(false);
        const activeTicket = response.data.tickets[0];
        // sets ongoing ticket
        setActiveTicketId(activeTicket.id);

        // open chat box modal
        setShowChatBox(true);
      }
    } catch (error) {
      console.error("Error fetching active tickets:", error);
    }
  }, [joinRoom]);

  const handleEnterChat = useCallback(async () => {
    // if there is ongoing ticket
    if (currentRoom) {
      console.log("You have an active ticket");
      return;
    }

    if (selectedTicketId) {
      // assign the ticket to the agent
      assignTicket(selectedTicketId);
      router.refresh();
      // connect the agent to a socket room
      joinRoom(selectedTicketId);
      // set the assigned ticket to the current message
      setActiveTicketId(activeTicketId);

      // close the chat details modal
      setShowModal(false);

      // open the chat modal
      setShowChatBox(true);
      router.refresh();
    }
  }, [selectedTicketId, assignTicket, joinRoom, currentRoom]);

  if (error) {
    console.log(error);
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
            assignedAgentName={
              ticket.assignedAgent
                ? `${capitalize(ticket.assignedAgent.firstName)} ${capitalize(
                    ticket.assignedAgent.lastName
                  )}`
                : "Not Assigned"
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
      {showChatBox && messages.length && activeTicketId && (
        <ChatBox
          onClick={() => {}}
          messagez={messages}
          ticketId={activeTicketId}
        />
      )}
    </main>
  );
}

// function for fetching ticket of active modal
// const fetchTicketMessages = async (ticketId: string) => {
//   try {
//     const response = await axios.get(
//       `${baseUrl}/support/tickets/${ticketId}/messages`,
//       {
//         withCredentials: true,
//       }
//     );
//     setActiveTicketMessages(response.data || []);
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//   }
// };
