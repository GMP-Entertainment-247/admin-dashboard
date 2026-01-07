import clsx from "clsx";

export default function Status({ type, text }: { type: "success" | "warning" | "error", text: string }) {
  const typeStyles = {
    success: {
        container: "bg-[#ECFDF3] text-[#28A745] border-[#A6F4C5]",
        dot: "bg-[#28A745]",
    },
    warning: {
        container: "bg-yellow-100 text-yellow-600 border-[#FDE68A]",
        dot: "bg-yellow-600",
    },
    error: { 
        container: "bg-red-light text-red-normal border-[#FCA5A5]",
        dot: "bg-red-normal",
    },
  };

  return (
    <div className={clsx("w-fit rounded-full py-0.5 px-2.5 flex items-center gap-1 border-[0.5px]", typeStyles[type].container)}>
      <div className={clsx("w-2 h-2 rounded-full", typeStyles[type].dot)} />
      <span className="font-medium text-xs">{text}</span>
    </div>
  )
}