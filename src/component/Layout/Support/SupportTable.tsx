import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISupportChatProps } from "@/constants";
import { capitalize, convertDate } from "@/lib/helperFunctions";
import { GiCancel } from "react-icons/gi";

export default function SupportTable({
  id,
  status,
  createdAt,
  assignedAgent,
  message,
  allMessages,
  clientName,
  showModal,
  onClick,
  onChatEnter,
  onOpenModal,
}: ISupportChatProps) {
  return (
    <main>
      <Table>
        <TableCaption>
          A list of all open and ongoing message request.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300 text-sm">Chat ID</TableHead>
            <TableHead className="text-gray-300 text-sm">Status</TableHead>
            <TableHead className="text-gray-300 text-sm">Created At</TableHead>
            <TableHead className="text-gray-300 text-sm">Messages</TableHead>
            <TableHead className="text-gray-300 text-sm">Assigned To</TableHead>
            <TableHead className="text-gray-300 text-sm">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={id}>
            <TableCell className="">{id}</TableCell>
            <TableCell
              className={`${status === "OPEN" && "text-green-500 font-bold"}`}
            >
              {status}
            </TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell className="">{message}</TableCell>
            <TableCell className="">
              {assignedAgent ?? "Not Assigned"}
            </TableCell>
            <TableCell className="">
              <button
                className="bg-green-200 px-2 py-1 rounded-md text-black text-semibold cursor-pointer"
                disabled={status !== "OPEN"}
                onClick={onOpenModal}
              >
                ACCEPT
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* rendering all chats on a modal */}
      {showModal && (
        <div className="fixed inset-0 h-full z-10 bg-black/60 flex items-center justify-center">
          <div className="relative bg-dark-400 rounded-sm h-[50%] w-[80%] md:w-[50%] lg:w-[40%] py-2 px-1">
            <h3 className="text-center mb-4">ALL MESSAGES</h3>
            <span
              className="fixed left-[80%] md:left-[70%] lg:left-[65%] top-[28%] cursor-pointer"
              onClick={onClick}
            >
              <GiCancel />
            </span>
            <ul className="space-y-2 h-[70%] overflow-y-auto ">
              {allMessages.map((item) => (
                <li key={item.id} className="">
                  <span>
                    <span className="text-base text-gray-400">
                      {capitalize(clientName)}:
                    </span>
                    {item.content}
                  </span>
                  <span className="text-[10px] text-gray-600 block">
                    {convertDate(item.timestamp)}
                  </span>{" "}
                </li>
              ))}
            </ul>
            <button
              className="text-green-300 border-dark-200 border-2 w-max ml-[40%] px-2 py-1 cursor-pointer"
              onClick={onChatEnter}
            >
              Enter Chat
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
