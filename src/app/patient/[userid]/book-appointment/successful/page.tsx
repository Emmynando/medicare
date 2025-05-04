import { FaCircleCheck } from "react-icons/fa6";
export default function SuccessfulAppointment() {
  return (
    <main className="flex items-center justify-center h-dvh">
      <section className=" space-y-2 flex flex-col justify-between items-center">
        <div>
          <FaCircleCheck className="bg-white rounded-full text-green-500 size-[3rem]" />
        </div>
        <div>
          <h3 className="text-center text-xl text-2xl">
            Your{" "}
            <span className="text-green-500 font-semibold">
              Appointment Request
            </span>{" "}
            Successfully!
          </h3>
          <p className="text-md text-gray-400 text-center">
            Details of your appointment will be sent to your email for final
            confirmation
          </p>
        </div>
      </section>
    </main>
  );
}
