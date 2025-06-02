"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/component/UI/elements/InputField";
import useForm from "@/hooks/useForm";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdSmartphone } from "react-icons/md";
import SubmitButton from "@/component/UI/elements/SubmitButton";
import InputOTPComp from "@/component/UI/elements/InputOTPComp";
import axios from "axios";
import { baseUrl } from "@/lib/baseUrl";

const LOGINITEMS = [
  {
    id: "l1",
    formLabel: "Full Name",
    placeholder: "Firstname Lastname",
    type: "text",
    name: "name",
    icon: <FaUser />,
  },
  {
    id: "l2",
    formLabel: "Email Address",
    placeholder: "example@example.com",
    type: "email",
    name: "email",
    icon: <MdEmail />,
  },
  {
    id: "l3",
    formLabel: "Phone Number",
    placeholder: "+2348012345678",
    type: "number",
    name: "phone",
    icon: <MdSmartphone />,
  },
];

interface ISignIn {
  name: string;
  email: string;
  phone: string;
}

export default function Login() {
  const router = useRouter();
  const [showOtpbox, setShowOtpbox] = useState(false);
  const [isSubmittingOtp, setIsSubmittingOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const { formData, handleChange } = useForm<ISignIn>({
    name: "",
    email: "",
    phone: "",
  });

  function checkValidation(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "phone") {
      if (value?.length <= 10) {
        handleChange(event);
        // return;
      }
    } else {
      handleChange(event);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData) {
      console.log("Invalided form data");
      return;
    }
    const splitNames = formData.name.split(" ");
    if (formData.phone.length !== 10) {
      console.log("Invalid Phone Number");
      return;
    }
    if (splitNames.length < 2) {
      console.log("Invalid Fullname");
      return;
    }
    setIsLoading(true);
    try {
      const data = await axios.post(`${baseUrl}/auth`, formData, {
        withCredentials: true,
      });
      console.log(data);
      // store values in local storage
      localStorage.setItem("userFormData", JSON.stringify(formData));

      if (data.status !== 201) {
        // if user does not exist
        // redirect to registration page
        router.push("/register");
        return;
      }
      setShowOtpbox(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleConfirmOtp() {
    setIsSubmittingOtp(true);
    const storedFormData = localStorage.getItem("userFormData");

    if (!storedFormData) {
      console.log("Error Getting Data");
      return;
    }
    const parsedFormData = JSON.parse(storedFormData);
    try {
      if (otpValue.length < 6) {
        console.log("Invalid OTP");
        return;
      }
      const data = await axios.post(
        `${baseUrl}/auth/otp`,
        {
          email: parsedFormData.email,
          otp: otpValue,
        },
        {
          withCredentials: true,
        }
      );
      // auth failed
      if (data.status !== 201) {
        console.log("Otp Verification failed");
        return;
      }
      console.log(data);

      if (data?.data?.payload.role === "SUPPORT_AGENT") {
        router.push("/support_agent");
        return;
      } else if (data?.data?.payload.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      setShowOtpbox(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmittingOtp(false);
    }
  }

  return (
    <main className="h-dvh flex">
      <section className="h-full px-6 flex flex-col justify-between py-6 w-full md:!w-[70%] lg:!w-[60%]">
        <div className="w-max mx-auto mt-[3rem] md:mt-[5rem] lg:mt-[5rem]">
          <h2 className="text-center container">Welcome...</h2>
          <p className="slug">Schedule Appointment with your Specialist</p>
        </div>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {LOGINITEMS.map((field) => (
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
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    checkValidation(e)
                  }
                  ringColorClass="focus:ring-green-900"
                  icon={field.icon}
                  theme="dark"
                />
              </div>
            ))}
            <SubmitButton isLoading={isLoading}>
              {isLoading ? "loading" : "CONTINUE"}
            </SubmitButton>
          </form>
        </div>
        <div>
          <p className="text-dark-600 text-sm">&copy; Medicare Copyright</p>
        </div>
      </section>
      <section className="lg:pr-6 hidden md:block lg:block md:w-[50%]">
        <Image
          src="/image/auth.jpg"
          width={1000}
          height={1000}
          alt="medicare"
          //   style={{ objectFit: "contain" }}
          className="h-full"
        />
      </section>
      {showOtpbox && (
        <InputOTPComp
          submittingOtp={isSubmittingOtp}
          onClick={handleConfirmOtp}
          OtpValue={otpValue}
          setOtpValue={setOtpValue}
        />
      )}

      {/* <InputOTPComp
        submittingOtp={isSubmittingOtp}
        onClick={handleConfirmOtp}
        OtpValue={otpValue}
        setOtpValue={setOtpValue}
      /> */}
    </main>
  );
}

// 1098765432
// 232979
