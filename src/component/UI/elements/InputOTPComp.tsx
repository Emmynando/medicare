"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import SubmitButton from "./SubmitButton";
import Link from "next/link";
import { MdCancel } from "react-icons/md";

interface OTPProps {
  submittingOtp: boolean;
  onClick: () => void;
  OtpValue: string;
  setOtpValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputOTPComp({
  submittingOtp,
  onClick,
  OtpValue,
  setOtpValue,
}: OTPProps) {
  return (
    <main className="bg-[rgba(0,0,0,0.49)] h-dvh w-full flex items-center justify-center absolute inset-0">
      <div className="bg-dark-300 h-max rounded-md p-4 space-y-6 relative">
        <span className="absolute right-[5%]">
          <MdCancel />
        </span>
        <div>
          <h3 className="text-xl font-bold">Login Verification</h3>
          <p className="text-sm font-normal text-gray-400">
            Please enter the OTP sent to your mail.
          </p>
        </div>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          onChange={(value) => setOtpValue(value)}
        >
          <InputOTPGroup className="gap-2 ">
            <InputOTPSlot index={0} className="h-[3rem] w-[3rem] border" />
            <InputOTPSlot index={1} className="h-[3rem] w-[3rem] border " />
            <InputOTPSlot index={2} className="h-[3rem] w-[3rem] border" />

            <InputOTPSlot index={3} className="h-[3rem] w-[3rem] border" />
            <InputOTPSlot index={4} className="h-[3rem] w-[3rem] border" />
            <InputOTPSlot index={5} className="h-[3rem] w-[3rem] border" />
          </InputOTPGroup>
        </InputOTP>
        <div className="h-[2rem] relative">
          <SubmitButton
            isLoading={submittingOtp}
            containerclass="h-[2rem] !py-1"
            onClick={onClick}
          >
            {submittingOtp ? "submitting..." : "SUBMIT"}
          </SubmitButton>{" "}
        </div>
        <div className="flex gap-4 justify-between">
          <Link href={""}>
            <p className="text-[12px] text-red-400">
              I do not have access to my email
            </p>
          </Link>
          {/* <Link href={""}> */}
          <p className="text-[12px] text-gray-200">OTP expires in 10minutes</p>
          {/* </Link> */}
        </div>
      </div>
    </main>
  );
}
