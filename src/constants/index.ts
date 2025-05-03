import { ReactNode } from "react";

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
export interface IPersonalInfo {
  gender: string;
  occupation: string;
  birthdate: string;
  emergencyContact: string;
  address: string;
}

export interface InputFieldProps {
  id?: string;
  name: string;
  placeholder: string;
  type: string;
  value: string | number | boolean;
  onChange: any;
  icon?: ReactNode;
  theme: string;
  ringColorClass: string;
  disabled?: boolean;
  isValid?: boolean;
  error?: string;
  max?: string;
}
