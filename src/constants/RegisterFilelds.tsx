import { FaCalendarAlt } from "react-icons/fa";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { MdContactEmergency } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa6";
export const APPOINTMENTINFO = [
  {
    id: "ap1",
    formLabel: "Reason for Appointment",
    placeholder: "e.g Monthly Checkup",
    type: "text",
    name: "appointmentReason",
  },
  {
    id: "ap2",
    formLabel: "Additional Comment",
    placeholder: "important info to note before appointment",
    type: "text",
    name: "appointmentComment",
  },
];
export const APPOINTMENTDATEINFO = [
  {
    id: "ad1",
    formLabel: "Expected Appointment Date",
    type: "date",
    name: "appointmentDate",
  },
];

export const IDINFO = [
  {
    id: "ii1",
    formLabel: "Identification Number",
    placeholder: "med1234567890",
    type: "text",
    name: "identificationNumber",
    icon: <FaIdCard className="text-green-300" />,
  },
];
export const PERSONALINFO = [
  {
    id: "p2",
    formLabel: "Occupation",
    placeholder: "occupation",
    type: "text",
    name: "occupation",
    icon: <GiPoliceOfficerHead className="text-green-300" />,
  },
  {
    id: "p3",
    formLabel: "Birthdate",
    placeholder: "01-01-2025",
    type: "date",
    name: "birthdate",
    icon: <FaCalendarAlt className="text-green-300" />,
    max: new Date().toISOString().split("T")[0],
  },
  {
    id: "p4",
    formLabel: "Emergency Contact",
    placeholder: "+2348012345678",
    type: "number",
    name: "emergencyContact",
    icon: <MdContactEmergency className="text-green-300" />,
  },
  {
    id: "p5",
    formLabel: "Address",
    placeholder: "address info",
    type: "string",
    name: "address",
    icon: <FaAddressBook className="text-green-300" />,
  },
];

export const MEDICALCONDITION = [
  {
    id: "m1",
    formLabel: "Allergies (if any)",
    placeholder: "Peanuts, Butter",
    type: "text",
    name: "allergies",
    // icon: <FaUser />,
  },
  {
    id: "m2",
    formLabel: "Family Medical History (if any)",
    placeholder: "Mother had Malaria",
    type: "text",
    name: "familyMedicationHistory",
    //   icon: <MdEmail />,
  },
  {
    id: "m3",
    formLabel: "Current Medication",
    placeholder: "e.g Paracetamol",
    type: "string",
    name: "currentMedication",
    //   icon: <MdSmartphone />,
  },
  {
    id: "m4",
    formLabel: "Past Medical History (if any)",
    placeholder: "Medical History",
    type: "string",
    name: "medicalRecords",
    //   icon: <MdSmartphone />,
  },
];
