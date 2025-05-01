import React from "react";
import { InputFieldProps } from "@/constants/index";

const TextAreaField = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  theme,
  ringColorClass,
  disabled,
  isValid,
  error,
}: InputFieldProps) => {
  const theme_scheme = {
    light: `bg-white border ${
      isValid ? "border-medium-green" : "border-2 border-red-600"
    } text-gray-700 placeholder:text-gray-400`,
    dark: "bg-dark-gray border border-gray-800 text-gray-200 placeholder:text-[#4a4a4a]",
  };

  return (
    <div className="space-y-2">
      <div className="relative w-full">
        <textarea
          //   type="text"
          // id={id}
          name={name}
          onChange={onChange}
          value={value}
          className={` ${
            theme_scheme[theme as keyof typeof theme_scheme]
          } text-sm rounded-lg focus:ring-1 focus:outline-none text-sm
           text:black placeholder:text-[#4a4a4a] ${ringColorClass} block w-full p-2.5
            placeholder:text-sm `}
          placeholder={placeholder}
          // required={required}
          disabled={disabled}
        />
      </div>
      {!isValid && <p className={` italic text-red-500 text-xs`}>{error}</p>}
    </div>
  );
};

export default TextAreaField;
