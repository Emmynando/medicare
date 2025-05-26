export function AppointmentCard({ onClick }: { onClick: () => void }) {
  return (
    <main className="space-y-6 md:w-[15.18rem] lg:w-[15.18rem] h-[14.18rem]  bg-[#080808] p-2 rounded-[28px] shadow-xl">
      <div>
        <button
          className="text-black bg-[#ecececdc] rounded-[1.7rem] p-1 backdrop-blur-lg cursor-pointer"
          onClick={onClick}
        >
          Details
        </button>
      </div>
      <div className="flex justify-between">
        <p className="text-sm font-semibold text-green-400">17-05-2024</p>
        <p className="text-sm font-semibold">12:04 PM</p>
      </div>
      <div>
        <p className="text-xs">
          Appointment with <span className="font-bold text-sm">Dr. Emeka</span>
        </p>
        <p className="text-xs">
          Duration: <span className="font-semibold ">2 hours</span>
        </p>
      </div>

      <div className="flex gap-2 justify-between">
        <button className="text-red-950 cursor-pointer hover:text-red-900">
          Cancel
        </button>
        <button className="text-[#ecececdc] cursor-pointer">Reschedule</button>
      </div>
    </main>
  );
}
