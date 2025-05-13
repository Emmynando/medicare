import { ReactNode } from "react";
interface ASCProps {
  statsNumber: number;
  statsType: string;
  icon: ReactNode;
  onClick: () => void;
  containerClass?: string;
}
export default function AppointmentStatCard({
  statsNumber,
  statsType,
  icon,
  onClick,
  containerClass,
}: ASCProps) {
  return (
    <div
      onClick={onClick}
      className={`space-y-2 w-full md-[33%] lg-[33%] shadow-xl p-4 bg-gradient-to-br from-[ #020202] via-[#23272a] to-[#e0c477] rounded-md cursor-pointer   hover:from-[#0a0a0a] hover:via-[#1a1d1f] hover:to-[#d6b94e] ${containerClass}
`}
    >
      <div>
        <p className="flex items-center gap-2">
          {icon}
          <span className="font-semibold text-xl">{statsNumber}</span>
        </p>
      </div>
      <div>
        <p>{statsType}</p>
      </div>
    </div>
  );
}
