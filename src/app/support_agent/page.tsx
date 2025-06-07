"use client";

import SupportTable from "@/component/Layout/Support/SupportTable";
import { useGetAllChatsQuery } from "@/store/SupportApi";
import { ISupportChatProps } from "@/constants";

export default function SupportAgent() {
  const { data: tickets, error } = useGetAllChatsQuery();

  if (tickets) {
    console.log(tickets);
  }
  async function handleOpenModal() {}
  return (
    <main>
      <h2>All Message Request</h2>
      {tickets?.tickets.length ? (
        tickets.tickets.map((ticket) => (
          <SupportTable
            key={ticket.id}
            id={ticket.id}
            status={ticket.status}
            createdAt={ticket?.createdAt}
            message={ticket?.messages[0]?.content ?? "No message"}
            assignedAgent={
              ticket.assignedAgent ?? ticket.assignedAgent ?? "Not Assigned"
            }
            allMessages={ticket.messages}
          />
        ))
      ) : (
        <p>No tickets found</p>
      )}
    </main>
  );
}
