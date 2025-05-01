"use client";

import { useRef, useState, ChangeEvent } from "react";
import PersonalInfo from "@/component/Layout/Auth/Register/PersonalInfo";
import useForm from "@/hooks/useForm";
import { IPersonalInfo, IMedicalInfo, IIdentificationInfo } from "@/constants";
import MedicalInfo from "@/component/Layout/Auth/Register/MedicalInfo";
import IdentificationInfo from "@/component/Layout/Auth/Register/VerifcationInfo";
import SubmitButton from "@/component/UI/elements/SubmitButton";

export default function Register() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedBackFile] = useState<File | null>(null);
  const { formData: personalFormData, handleChange: handlePersonalChange } =
    useForm<IPersonalInfo>({
      gender: "",
      occupation: "",
      birthdate: "",
      emergencyContact: "",
      address: "",
    });
  const { formData: medicalFormData, handleChange: handleMedicalChange } =
    useForm<IMedicalInfo>({
      allergies: "",
      familyMedicationHistory: "",
      currentMedication: "",
      medicalRecords: "",
    });
  const { formData: idFormData, handleChange: handleIDChange } =
    useForm<IIdentificationInfo>({
      identificationNumber: "",
      identificationType: "",
    });

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedBackFile(e.target.files[0]);
    }
  };

  function checkPersonalValidation(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target as any;
    if (name === "emergencyContact") {
      if (value?.length <= 10) {
        handlePersonalChange(event);
        // return;
      }
    } else {
      handlePersonalChange(event);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("personalInfo", JSON.stringify(personalFormData));
    // formData.append("medicalInfo", JSON.stringify(medicalFormData));
    // formData.append("idInfo", JSON.stringify(idFormData));
    if (selectedFile) {
      formData.append("idImage", selectedFile);
    }

    if (!personalFormData || !idFormData || !selectedFile) {
      console.log("some fields are missing");
      return;
    }

    if (personalFormData.birthdate) {
      const birthdate = new Date(personalFormData.birthdate);
      const today = new Date();

      // Zero out the time part for an accurate date-only comparison
      today.setHours(0, 0, 0, 0);

      if (birthdate > today) {
        console.log("Invalid Birthdate");
        return;
      }
    }

    if (personalFormData.emergencyContact.length !== 10) {
      console.log("Invalid Energency Contact");
      return;
    }
    if (selectedFile) {
      // Check file MIME type
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validImageTypes.includes(selectedFile.type)) {
        console.log(
          "Invalid file type. Please upload an image (JPEG, PNG, GIF, or WEBP)."
        );
        return;
      }

      // Optional: Check file extension
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !validExtensions.includes(`.${fileExtension}`)) {
        console.log("Invalid file extension. Please upload an image.");
        return;
      }
      // Optional: Check file size (e.g., 5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (selectedFile.size > maxSize) {
        console.log("File is too large. Maximum size is 5MB.");
        return;
      }
    }

    // try {
    //   const response = await fetch("/api/register", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   // Handle response
    // } catch (error) {
    //   // Handle error
    // }
  }

  return (
    <main>
      <div className="w-max mx-auto mt-[2rem]">
        <h2 className="text-center container">Get Started...</h2>
        <p className="slug">Schedule Appointment with your Specialist</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden w-full"
          accept="image/*"
        />
        <PersonalInfo
          formData={personalFormData}
          checkValidation={checkPersonalValidation}
        />
        <MedicalInfo
          formData={medicalFormData}
          checkValidation={handleMedicalChange}
        />
        <IdentificationInfo
          handleFileSelect={handleFileSelect}
          formData={idFormData}
          checkValidation={handleIDChange}
          selectedFile={selectedFile}
        />
        <div className="md:!w-[50%] lg:!w-[50%] mx-auto mb-[2rem] px-[1rem]">
          <SubmitButton isLoading={false}>Submit</SubmitButton>
        </div>
      </form>
    </main>
  );
}
