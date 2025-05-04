import { MEDICALCONDITION } from "@/constants/RegisterFilelds";
import { IMedicalInfo } from "@/constants";
import TextAreaField from "@/component/UI/elements/TextAreaFields";

interface MedicalInfoProps {
  formData: IMedicalInfo;
  checkValidation: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function MedicalInfo({
  formData,
  checkValidation,
}: MedicalInfoProps) {
  return (
    <main className="space-y-6 p-6">
      <div className="w-max mt-[1rem]">
        <h2 className="header">Medical Information</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
        {MEDICALCONDITION.map((field) => (
          <div key={field.id} className="w-full">
            <label
              className={`relative block uppercase tracking-wide text-white text-xs mb-3 text-normal`}
              htmlFor="name"
            >
              {field.formLabel}
            </label>
            <TextAreaField
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                checkValidation(e)
              }
              ringColorClass="focus:ring-green-900"
              //   icon={field.icon}
              theme="dark"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
