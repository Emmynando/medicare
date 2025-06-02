import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SupportTable() {
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
          <TableRow>
            <TableCell className="">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$250.00</TableCell>
            <TableCell className="">
              <button>OPEN</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
