import { PERSONALINFO } from "@/constants/RegisterFilelds";
import InputField from "@/component/UI/elements/InputField";
import { IPersonalInfo } from "@/constants";
import SelectFields from "@/component/UI/elements/SelectField";

interface PersonalInfoProps {
  formData: IPersonalInfo;
  checkValidation: (e: any) => void;
}

const GENDEROPTIONS = [
  { id: "g1", value: "MALE", namez: "Male" },
  { id: "g2", value: "FEMALE", namez: "Female" },
];

export default function PersonalInfo({
  formData,
  checkValidation,
}: PersonalInfoProps) {
  return (
    <main className="space-y-6 p-6">
      <div className="w-max mt-[2rem] md:mt-[3rem] lg:mt-[3rem]">
        <h2 className="header">Personal Information</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
        {PERSONALINFO.map((field) => (
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
              onChange={(e: any) => checkValidation(e)}
              ringColorClass="focus:ring-green-900"
              icon={field.icon}
              theme="dark"
              max={field.max}
            />
          </div>
        ))}
        <SelectFields
          name="gender"
          label="Gender"
          defaultValue="Gender"
          selectOptions={GENDEROPTIONS}
          value={formData.gender}
          onChange={checkValidation}
        />
      </div>
    </main>
  );
}
