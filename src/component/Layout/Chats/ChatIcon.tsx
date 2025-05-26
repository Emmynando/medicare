import { RiWechatFill } from "react-icons/ri";

export default function ChatIcon({ onClick }: { onClick: () => void }) {
  return (
    <span
      className="fixed right-[5%] bottom-[5%] bg-white rounded-full cursor-pointer"
      onClick={onClick}
    >
      <button>
        <RiWechatFill className="h-[3rem] w-[3.5rem] text-green-900" />
      </button>
    </span>
  );
}
