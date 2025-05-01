import { ReactNode } from "react";

interface SelectOption {
  id: string;
  namez: string;
  value: string;
  icon?: ReactNode;
}

interface SelectGenderProps {
  name: string;
  label: string;
  defaultValue: string;
  value: string;
  selectOptions: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectFields({
  name,
  defaultValue,
  label,
  selectOptions,
  onChange,
  value,
}: SelectGenderProps) {
  return (
    <span>
      <label
        className={`relative block uppercase tracking-wide text-white text-xs mb-3 text-normal`}
        htmlFor="name"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="bg-dark-gray border border-gray-800 text-green-200 focus:ring-green-900 text-sm rounded-lg focus:ring-1 focus:outline-none text-sm block w-full pl-12 p-2.5"
        onChange={onChange}
        value={value}
      >
        <option value="" className="bg-dark-300 text-white" disabled>
          Select {defaultValue}
        </option>
        {selectOptions.map((item) => (
          <option
            value={item.value}
            className="bg-dark-300 text-white"
            key={item.id}
          >
            {item.icon} {item.namez}
          </option>
        ))}
      </select>
    </span>
  );
}
