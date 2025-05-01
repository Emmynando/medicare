import { IDINFO } from "@/constants/RegisterFilelds";
import InputField from "@/component/UI/elements/InputField";
import { IIdentificationInfo } from "@/constants";
import SelectFields from "@/component/UI/elements/SelectField";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";

interface PersonalInfoProps {
  formData: IIdentificationInfo;
  checkValidation: (e: any) => void;
  handleFileSelect: () => void;
  selectedFile: File | null;
}

const IDOPTIONS = [
  { id: "i1", namez: "National Passport", value: "PASSPORT" },
  { id: "i2", namez: "National ID Card", value: "NATIONAL_ID" },
  { id: "i3", namez: "Voter's Card", value: "VOTERS_CARD" },
  { id: "i4", namez: "Driving License", value: "DRIVING_LICENSE" },
  { id: "i5", namez: "Birth Certificate", value: "BIRTH_CERTIFICATE" },
  { id: "i6", namez: "Student ID Card", value: "STUDENT_ID" },
];

export default function IdentificationInfo({
  formData,
  checkValidation,
  handleFileSelect,
  selectedFile,
}: PersonalInfoProps) {
  return (
    <main className="space-y-6 p-6">
      <div className="w-max mt-[1rem]">
        <h2 className="header">Identification and Verification</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
        <SelectFields
          name="identificationType"
          label="Identification Type"
          defaultValue="Means of Identification"
          selectOptions={IDOPTIONS}
          onChange={checkValidation}
          value={formData.identificationType}
        />
        {IDINFO.map((field) => (
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
              theme="dark"
              icon={field.icon}
            />
          </div>
        ))}
        <div
          onClick={handleFileSelect}
          className="cursor-pointer border-dashed border-2 border-gray-400  rounded-md text-center w-full mx-auto relative col-span-2"
        >
          {selectedFile ? (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Front ID"
              width={0}
              height={0}
              // fill
              className="rounded-md object-cover w-full h-[5rem]"
            />
          ) : (
            <>
              <FaUpload size={32} className="mx-auto mb-2 text-gray-600" />
              <p className="text-gray-700 font-medium">Upload Front of ID</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
