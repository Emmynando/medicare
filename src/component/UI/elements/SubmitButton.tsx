interface SubmitButtonProps {
  isDisabled?: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}
export default function SubmitButton({
  isDisabled,
  isLoading,
  children,
}: SubmitButtonProps) {
  return (
    // <button
    //   className={`px-2 rounded-md w-full py-4 font-semibold cursor-pointer`
    //     `${isLoading}`
    //       ? `text-gray-400 bg-inherit`
    //       : `bg-green-200 text-black font-semibold hover:text-green-200 hover:bg-inherit`
    //   }
    <button
      className={`px-2 rounded-md w-full py-4 font-semibold cursor-pointer ${
        isLoading
          ? "text-gray-400 bg-inherit"
          : "bg-green-200 text-black hover:text-green-200 hover:bg-inherit"
      }`}
      disabled={isLoading}
      type="submit"
    >
      {isLoading ? <span></span> : children}
    </button>
  );
}
