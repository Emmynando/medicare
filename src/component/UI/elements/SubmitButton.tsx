interface SubmitButtonProps {
  isDisabled?: boolean;
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  containerclass?: string;
}
export default function SubmitButton({
  onClick,
  isLoading,
  children,
  containerclass,
}: SubmitButtonProps) {
  return (
    // <button
    //   className={`px-2 rounded-md w-full py-4 font-semibold cursor-pointer`
    //     `${isLoading}`
    //       ? `text-gray-400 bg-inherit`
    //       : `bg-green-200 text-black font-semibold hover:text-green-200 hover:bg-inherit`
    //   }
    <button
      className={`px-2 rounded-md w-full py-4 font-semibold cursor-pointer ${containerclass} ${
        isLoading
          ? "text-gray-400 bg-inherit"
          : "bg-green-200 text-black hover:text-green-200 hover:bg-inherit"
      }`}
      disabled={isLoading}
      type="submit"
      onClick={onClick}
    >
      {isLoading ? <span></span> : children}
    </button>
  );
}
