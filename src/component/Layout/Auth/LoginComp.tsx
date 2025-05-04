"use client";
import { ChangeEvent, useState } from "react";
import InputField from "@/component/UI/elements/InputField";
import useForm from "@/hooks/useForm";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdSmartphone } from "react-icons/md";
import SubmitButton from "@/component/UI/elements/SubmitButton";
import InputOTPComp from "@/component/UI/elements/InputOTPComp";

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
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      console.log(formData);
    } catch (error) {
      // if(error && error?.statusCode === 409)
      console.log(error);
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
            <SubmitButton isLoading={isLoading}>CONTINUE</SubmitButton>
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
      <InputOTPComp />
    </main>
  );
}
