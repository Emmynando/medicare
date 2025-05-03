"use client";

import { useRef, useState, ChangeEvent } from "react";
import PersonalInfo from "@/component/Layout/Auth/Register/PersonalInfo";
import useForm from "@/hooks/useForm";
import { IPersonalInfo, IMedicalInfo, IIdentificationInfo } from "@/constants";
import MedicalInfo from "@/component/Layout/Auth/Register/MedicalInfo";
import IdentificationInfo from "@/component/Layout/Auth/Register/VerifcationInfo";
import SubmitButton from "@/component/UI/elements/SubmitButton";
import ConsentInfo from "@/component/Layout/Auth/Register/ConsentInfo";
import { validator } from "@/lib/validator";

export default function Register() {
  const {
    formData: personalFormData,
    handleChange: handlePersonalChange,
    errors: personalFormErrors,
    setErrors: setPersonalFormErrors,
  } = useForm<IPersonalInfo>({
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
  const [consentData, setConsentData] = useState({
    disclosureConsent: false,
    termsAgreement: false,
  });
  const [allConsentGiven, setAllConsentGiven] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedBackFile] = useState<File | null>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedBackFile(e.target.files[0]);
    }
  };

  function checkPersonalValidation(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target as any;

    // First update the form data (always do this first)
    handlePersonalChange(event);

    // Then handle validation for each field
    let errorMessage = "";

    // Validate based on field name
    switch (name) {
      case "emergencyContact":
        // Only allow numbers
        if (!/^\d*$/.test(value)) {
          errorMessage = "Only numbers are allowed";
        }
        // Check length - assuming you want exactly 10 digits
        else if (value.length > 0 && value.length !== 10) {
          errorMessage = "Contact number must be 10 digits";
        }
        break;

      case "occupation":
        if (!value.trim()) {
          errorMessage = "Occupation is required";
        }
        break;

      case "birthdate":
        if (!value) {
          errorMessage = "Birth date is required";
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          // Zero out the time for an accurate comparison
          birthDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);

          if (birthDate > today) {
            errorMessage = "Birth date cannot be in the future";
          }
        }
        break;

      case "address":
        if (!value.trim()) {
          errorMessage = "Address is required";
        } else if (value.length < 10) {
          errorMessage = "Please enter a complete address";
        }
        break;

      case "gender":
        if (!value || value === "Gender") {
          errorMessage = "Please select your gender";
        }
        break;

      default:
        break;
    }

    // Update the error state with your setErrors function from useForm
    setPersonalFormErrors((prev) => ({
      ...prev,
      [name]: errorMessage || undefined,
    }));
  }

  // function checkPersonalValidation(event: ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target as any;
  //   if (name === "emergencyContact") {
  //     if (value?.length <= 10) {
  //       handlePersonalChange(event);
  //       // return;
  //     }
  //   } else {
  //     handlePersonalChange(event);
  //   }
  // }

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    const newConsents = {
      ...consentData,
      [name]: checked,
    };

    setConsentData(newConsents);
    // Check if both are true
    setAllConsentGiven(
      consentData.disclosureConsent && newConsents.termsAgreement
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("personalInfo", JSON.stringify(personalFormData));
    // formData.append("medicalInfo", JSON.stringify(medicalFormData));
    // formData.append("idInfo", JSON.stringify(idFormData));
    if (selectedFile) {
      formData.append("idImage", selectedFile);
    }
    if (
      Object.values(personalFormData).some((value) => !value) ||
      Object.values(idFormData).some((value) => !value) ||
      !selectedFile ||
      !allConsentGiven
    ) {
      console.error("All fields must be filled.");
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

      const isValidbirthday = validator.validatebirthdate(
        personalFormData.birthdate
      );
      const isValidEmergencyContact = validator.validatePhoneNumber(
        personalFormData.emergencyContact
      );
      const isValidFile = validator.validateFileType(selectedFile);
      if (!isValidbirthday) {
        console.log("invalid birthdate");
        return;
      }

      if (!isValidEmergencyContact) {
        console.log("Invalid Contact");
        return;
      }
      if (!isValidFile) {
        console.log("Invalid File");
        return;
      }
    }
    console.log(personalFormData);

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
          errors={personalFormErrors}
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
        <ConsentInfo
          consentData={consentData}
          onConsentChange={handleConsentChange}
        />
        <div className="md:!w-[50%] lg:!w-[50%] mx-auto mb-[2rem] px-[1rem]">
          <SubmitButton isLoading={false}>Submit</SubmitButton>
        </div>
      </form>
    </main>
  );
}
