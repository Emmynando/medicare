"use client";
import { useState } from "react";
import { BiCalendarEdit } from "react-icons/bi";
import AppointmentStatCard from "@/component/Layout/AdminAppointment/AppoinnmentStatCard";
import AppointmentStatTable from "@/component/Layout/AdminAppointment/AppointmentStatTable";
import { BiSolidError } from "react-icons/bi";
import { IoHourglassOutline } from "react-icons/io5";

export default function AdminPage() {
  const [appointmentSelected, setAppointmentSelected] = useState("all");

  const renderAppointmentTable = () => {
    switch (appointmentSelected) {
      case "all":
        return <AppointmentStatTable tableCaption="List of All Appointments" />;
      case "pending":
        return (
          <AppointmentStatTable tableCaption="List of Pending Appointments" />
        );
      case "cancelled":
        return (
          <AppointmentStatTable tableCaption="List of Cancelled Appointments" />
        );
      default:
        return <AppointmentStatTable tableCaption="List of All Appointments" />;
    }
  };
  return (
    <main>
      <section className="p-6 space-y-2">
        <h2 className="container">Welcome Admin,</h2>
        <p className="slug"> Let's Manage New Appointments</p>
      </section>
      <section className="flex flex-col md:flex-row lg:flex-row gap-6 p-6 ">
        <AppointmentStatCard
          icon={<BiCalendarEdit />}
          statsNumber={96}
          statsType="Total number of scheduled appointments"
          onClick={() => setAppointmentSelected("all")}
          containerClass={
            appointmentSelected === "all" ? "border border-white border-2" : ""
          }
        />
        <AppointmentStatCard
          icon={<IoHourglassOutline className="text-green-500" />}
          statsNumber={65}
          statsType="Total number of pending appointments"
          onClick={() => setAppointmentSelected("pending")}
          containerClass={
            appointmentSelected === "pending"
              ? "border border-white border-2"
              : ""
          }
        />
        <AppointmentStatCard
          icon={<BiSolidError className="text-red-500" />}
          statsNumber={74}
          statsType="Total number of cancelled appointments"
          onClick={() => setAppointmentSelected("cancelled")}
          containerClass={
            appointmentSelected === "cancelled"
              ? "border border-white border-2"
              : ""
          }
        />
      </section>
      <section>{renderAppointmentTable()}</section>
    </main>
  );
}
