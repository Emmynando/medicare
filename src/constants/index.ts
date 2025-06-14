import { ReactNode } from "react";

type AppointmentStatus =
  | "CONFIRMED"
  | "PENDING"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";
export interface IAppointmentDetails {
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  reason: string;
  comment: string;
  physicianInCharge: string;
  status: AppointmentStatus;
}
export interface IAppointmentModal {
  appointmentDetails: IAppointmentDetails;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBookAppointment {
  appointmentReason: string;
  appointmentComment: string;
  appointmentDate: string;
  previousPhysician: string;
}
export interface IIdentificationInfo {
  identificationNumber: string;
  identificationType: string;
}
export interface IMedicalInfo {
  allergies: string;
  familyMedicationHistory: string;
  currentMedication: string;
  medicalRecords: string;
}

export interface IMessagesProps {
  id: string;
  content: string;
  senderRole: "USER" | "SUPPORT_AGENT";
  timestamp: string;
  isRead: boolean;
  readAt?: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface IPersonalInfo {
  gender: string;
  occupation: string;
  birthdate: string;
  emergencyContact: string;
  address: string;
}

export interface ISupportChatProps {
  id: string;
  clientName: string;
  status: string;
  createdAt: string;
  message: string;
  assignedAgent?: string;
  allMessages: IMessagesProps[];
  showModal: boolean;
  onClick: () => void;
  onOpenModal: () => void;
  onChatEnter: () => void;
}

export interface IUserProps {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

export interface InputFieldProps {
  id?: string;
  name: string;
  placeholder: string;
  type: string;
  value: string | number;
  //@ts-ignore
  onChange: any;
  icon?: ReactNode;
  theme: string;
  ringColorClass: string;
  disabled?: boolean;
  isValid?: boolean;
  error?: string;
  max?: string;
}
