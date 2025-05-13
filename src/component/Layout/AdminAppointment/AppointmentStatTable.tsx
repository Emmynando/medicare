import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface APTProps {
  tableCaption: string;
}
export default function AppointmentStatTable({ tableCaption }: APTProps) {
  return (
    <main className="p-6">
      <Table>
        <TableCaption>{tableCaption}</TableCaption>
        <TableHeader className="bg-black">
          <TableRow>
            <TableHead className="text-white text-left">Patient</TableHead>
            <TableHead className="text-white text-left">Start Date</TableHead>
            <TableHead className="text-white text-left">Status</TableHead>
            <TableHead className="text-white text-left">Physician</TableHead>
            <TableHead className="text-white text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Phoebe John</TableCell>
            <TableCell>June 4th, 2025</TableCell>
            <TableCell>Ongoing</TableCell>
            <TableCell className="text-left">Dr. Sri Lanka</TableCell>
            <TableCell className="flex gap-4">
              <button className="text-green-300 cursor-pointer border border-green-300 p-2 rounded-lg">
                Schedule
              </button>
              <button>Cancel</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
