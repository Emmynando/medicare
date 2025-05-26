import { IAppointmentModal } from "@/constants";

export default function AppointmentModal({
  appointmentDetails,
  setShowModal,
}: IAppointmentModal) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-md space-y-4 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-3 text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold">Appointment Details</h2>
        <p>
          <strong className="text-xs">Start:</strong>{" "}
          {new Date(appointmentDetails.appointmentStartDate).toLocaleString()}
        </p>
        <p>
          <strong className="text-xs">End:</strong>{" "}
          {new Date(appointmentDetails.appointmentEndDate).toLocaleString()}
        </p>
        <p>
          <strong className="text-xs">Reason:</strong>{" "}
          {appointmentDetails.reason}
        </p>
        {appointmentDetails.comment && (
          <p>
            <strong className="text-xs">Comment:</strong>{" "}
            {appointmentDetails.comment}
          </p>
        )}
        <p>
          <strong className="text-xs">Physician:</strong>{" "}
          {appointmentDetails.physicianInCharge}
        </p>
        <p>
          <strong className="text-xs">Status:</strong>{" "}
          {appointmentDetails.status}
        </p>
      </div>
    </div>
  );
}
