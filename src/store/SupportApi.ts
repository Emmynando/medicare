import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/lib/baseUrl";
import { ChatStatusEnums } from "@/constants/enum";

interface MessagesProps {
  id: string;
  senderRole: "USER" | "SUPPORT_AGENT";
  timestamp: Date;
  isRead: boolean;
  readAt?: Date;
  supportTicketId: string;
  sender: string;
}

// Define the initial state of the message
interface SupportChatProps {
  chatID: string;
  status: ChatStatusEnums | null;
  createdAt: Date | null;
  messages: MessagesProps[];
  assignedTo?: String;
}

interface GetChatsResponse {
  message: string;
  data: SupportChatProps[];
}

// Define API slice using the new baseQuery
export const supportChatApi = createApi({
  reducerPath: "supportChatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/support`,
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   console.log("RTK Query Headers:", headers);
    //   console.log("Document cookies:", document.cookie);
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getAllChats: builder.query<GetChatsResponse, void>({
      query: () => `/tickets`,
      extraOptions: {
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    }),
  }),
});

export const { useGetAllChatsQuery } = supportChatApi;
