import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/lib/baseUrl";
import { ChatStatusEnums } from "@/constants/enum";
import { IUserProps, IMessagesProps } from "@/constants";

// Define the initial state of the message
interface SupportChatProps {
  id: string;
  status: ChatStatusEnums;
  createdAt: string;
  messages: IMessagesProps[];
  user: IUserProps;
  assignedAgent?: string;
}

interface GetChatTicket {
  tickets: SupportChatProps[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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
    getAllChats: builder.query<GetChatTicket, void>({
      query: () => `/tickets`,
      extraOptions: {
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    }),
  }),
});

export const { useGetAllChatsQuery } = supportChatApi;
