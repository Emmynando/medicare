"use client";
import { useState } from "react";
import Login from "@/component/Layout/Auth/LoginComp";
import ChatBox from "@/component/Layout/Chats/ChatBox";
import ChatIcon from "@/component/Layout/Chats/ChatIcon";
import ProtectedRoute from "@/component/UI/elements/ProtectedRoute";
import { AppointmentCard } from "@/component/Layout/Homepage/AppointmentCard";
import AppointmentModal from "@/component/Layout/Homepage/AppointmentModal";
import { IAppointmentDetails } from "@/constants";

const appointmentDetails: IAppointmentDetails = {
  appointmentStartDate: new Date("2024-05-17T12:04:00Z"),
  appointmentEndDate: new Date("2024-05-17T14:04:00Z"),
  reason: "Routine check-up and prescription renewal",
  comment: "Patient requested afternoon slot",
  physicianInCharge: "Dr. Emeka",
  status: "CONFIRMED",
};

export default function Home() {
  const [openChat, setOpenChat] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    // <ProtectedRoute requiredRole={["ADMIN", "USER"]}>
    <div className="p-6">
      {openChat ? (
        <ChatBox onClick={() => setOpenChat(false)} />
      ) : (
        <ChatIcon onClick={() => setOpenChat(true)} />
      )}
      <div className="grid md:grid-cols-3 lg:grid-cols-4">
        <AppointmentCard onClick={() => setShowModal(true)} />
      </div>
      {showModal && (
        <AppointmentModal
          appointmentDetails={appointmentDetails}
          setShowModal={setShowModal}
        />
      )}
    </div>
    // </ProtectedRoute>
  );
}
