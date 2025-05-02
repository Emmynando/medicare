import { useState } from "react";

interface ConsentInfoProps {
  consentData: {
    disclosureConsent: boolean;
    termsAgreement: boolean;
  };
  onConsentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ConsentInfo({
  consentData,
  onConsentChange,
}: ConsentInfoProps) {
  return (
    <main className="space-y-6 p-6">
      <div className="w-max mt-[1rem]">
        <h2 className="header">Consent and Privacy</h2>
      </div>
      <div className="">
        <div className="flex gap-4">
          <input
            type="checkbox"
            name="disclosureConsent"
            checked={consentData.disclosureConsent}
            onChange={onConsentChange}
          />
          <p>I consent to disclosure of information</p>
        </div>
        <div className="flex gap-4">
          <input
            type="checkbox"
            name="termsAgreement"
            checked={consentData.termsAgreement}
            onChange={onConsentChange}
          />
          <p>I agree to terms and conditions</p>
        </div>
      </div>
    </main>
  );
}
