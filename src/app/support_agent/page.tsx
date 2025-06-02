"use client";

import SupportTable from "@/component/Layout/Support/SupportTable";
import { useGetAllChatsQuery } from "@/store/SupportApi";

export default function SupportAgent() {
  const { data, error, isLoading, isFetching, isError } = useGetAllChatsQuery();

  if (data) {
    console.log(data);
  }
  async function handleOpenModal() {}
  return (
    <main>
      <h2> All Message Request</h2>
      <SupportTable />
    </main>
  );
}
