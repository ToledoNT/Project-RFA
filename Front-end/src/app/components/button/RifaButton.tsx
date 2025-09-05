import { RifaButtonProps } from "@/app/interfaces/home-interface";
export default function RifaButton({
  numero,
  comprado,
  disabled,
  onClick,
}: RifaButtonProps) {
  const baseClasses = "p-3 rounded text-center font-bold transition w-full";

  let styleClasses = "";

  if (disabled) {
    styleClasses = "bg-gray-900 text-gray-600 cursor-not-allowed";
  } else if (comprado) {
    styleClasses = "bg-blue-700 text-white cursor-not-allowed";
  } else {
    styleClasses = "bg-green-600 text-white hover:bg-green-700 cursor-pointer";
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${styleClasses}`}
    >
      {numero}
    </button>
  );
}