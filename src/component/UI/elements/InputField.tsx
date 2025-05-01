import React from "react";
import { InputFieldProps } from "@/constants/index";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const InputField = ({
  id,
  name,
  placeholder,
  type,
  value,
  onChange,
  icon,
  theme,
  ringColorClass,
  disabled,
  isValid,
  error,
  max,
}: InputFieldProps) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const theme_scheme = {
    light: `bg-white border ${
      isValid ? "border-medium-green" : "border-2 border-red-600"
    } text-gray-700 placeholder:text-gray-400`,
    dark: "bg-dark-gray border border-gray-800 text-gray-200 placeholder:text-[#4a4a4a]",
  };

  const togglePasswordVisibility = () => setPasswordIsVisible((prev) => !prev);

  return (
    <div className="space-y-2">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 w-10 pointer-events-none">
          {icon}
        </div>
        <input
          max={max}
          type={
            type === "password"
              ? passwordIsVisible
                ? "text"
                : "password"
              : type
          }
          // id={id}
          name={name}
          onChange={onChange}
          value={value}
          className={` ${
            theme_scheme[theme as keyof typeof theme_scheme]
          } text-sm rounded-lg focus:ring-1 focus:outline-none text-sm
           text:black placeholder:text-[#4a4a4a] ${ringColorClass} block w-full pl-12 p-2.5
            placeholder:text-sm `}
          placeholder={placeholder}
          required={name !== "referral_link"}
          disabled={disabled}
        />
        {type === "password" && (
          <div className="absolute inset-y-0 right-3 w-fit flex items-center pl-3">
            {!passwordIsVisible ? (
              <MdVisibility
                onClick={togglePasswordVisibility}
                className="text-white"
              />
            ) : (
              <MdVisibilityOff
                onClick={togglePasswordVisibility}
                className="text-white"
              />
            )}
          </div>
        )}
      </div>
      {!isValid && <p className={` italic text-red-500 text-xs`}>{error}</p>}
    </div>
  );
};

export default InputField;
