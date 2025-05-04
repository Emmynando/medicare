"use client";
import { ChangeEvent, useState } from "react";
import TextAreaField from "@/component/UI/elements/TextAreaFields";
import useForm from "@/hooks/useForm";
import {
  APPOINTMENTINFO,
  APPOINTMENTDATEINFO,
} from "@/constants/RegisterFilelds";
import { IBookAppointment } from "@/constants";
import SelectFields from "@/component/UI/elements/SelectField";
import InputField from "@/component/UI/elements/InputField";
import SubmitButton from "@/component/UI/elements/SubmitButton";

const PREVIOUSPHYSICIAN = [
  { id: "pp1", value: "true", namez: "Yes" },
  { id: "pp2", value: "false", namez: "No" },
];

export default function BookAppointment() {
  const [showModal, setShowModal] = useState(false);

  const { formData, handleChange } = useForm<IBookAppointment>({
    appointmentReason: "",
    appointmentComment: "",
    appointmentDate: "",
    previousPhysician: "",
  });

  function checkValidation(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    // const { name, value } = event.target as HTMLInputElement | ChangeEvent<HTMLSelectElement

    handleChange(event);
  }

  async function handleAppointmentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (Object.values(formData).some((value) => !value)) {
      console.error("All fields must be filled.");
      return;
    }
    const selectedDate = new Date(formData.appointmentDate);
    const now = new Date();
    // Calculate 48 hours from now
    const minDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    // Calculate 2 weeks (14 days) from now
    const maxDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    // Zero out the time for comparison (optional, depending on how strict you want the time to be)
    selectedDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);

    if (selectedDate < minDate || selectedDate > maxDate) {
      console.error("Appointment date from 48hours and within 2 weeks.");
      return;
    }
    console.log(formData);
    setShowModal(true);
  }
  async function finalSubmit() {}

  return (
    <main className="space-y-6 p-6">
      <div className="w-max mt-[2rem] md:mt-[3rem] lg:mt-[3rem]">
        <h2 className="header">Hi, Emeka</h2>
        <p className="header">Schedule an Appointment</p>
      </div>
      <form
        className="grid md:grid-cols-2 lg:grid-cols-2 gap-4"
        onSubmit={handleAppointmentSubmit}
      >
        {APPOINTMENTINFO.map((field) => (
          <div key={field.id} className="w-full">
            <label
              className={`relative block uppercase tracking-wide text-white text-xs mb-3 text-normal`}
              htmlFor="name"
            >
              {field.formLabel}
            </label>
            <TextAreaField
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={(
                e:
                  | React.ChangeEvent<HTMLInputElement>
                  | ChangeEvent<HTMLSelectElement>
              ) => checkValidation(e)}
              ringColorClass="focus:ring-green-900"
              theme="dark"
            />
          </div>
        ))}
        {APPOINTMENTDATEINFO.map((field) => (
          <div key={field.id} className="w-full">
            <label
              className={`relative block uppercase tracking-wide text-white text-xs mb-3 text-normal`}
              htmlFor="name"
            >
              {field.formLabel}
            </label>
            <InputField
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder=""
              value={formData[field.name as keyof typeof formData]}
              onChange={(
                e:
                  | React.ChangeEvent<HTMLInputElement>
                  | ChangeEvent<HTMLSelectElement>
              ) => checkValidation(e)}
              ringColorClass="focus:ring-green-900"
              theme="dark"
            />
          </div>
        ))}
        <SelectFields
          name="previousPhysician"
          label="Use Previous Physician"
          defaultValue=""
          selectOptions={PREVIOUSPHYSICIAN}
          value={formData.previousPhysician}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            checkValidation(e)
          }
        />
        <div className="pt-[1.5rem] md:col-span-2 lg:col-span-2">
          <SubmitButton isLoading={false}>Submit</SubmitButton>
        </div>
      </form>
      <div className="">
        <p className="text-dark-600 text-sm">&copy; Medicare Copyright</p>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[40%] shadow-lg space-y-4 text-black">
            <h3 className="text-xl font-semibold mb-2">
              Confirm Appointment Details
            </h3>
            <ul className="text-sm space-y-1">
              <li>
                <strong>Reason for Appointment:</strong>{" "}
                {formData.appointmentReason}
              </li>
              <li>
                <strong>Comment:</strong> {formData.appointmentComment}
              </li>
              <li>
                <strong>Requested Date:</strong> {formData.appointmentDate}
              </li>
              <li>
                <strong>See Previous Physician:</strong>{" "}
                {formData.previousPhysician}
              </li>
            </ul>
            <div className="flex justify-end gap-4 mt-4 mx-auto w-max">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={finalSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
