import clsx from "clsx";

interface ICard {
  icon: string | React.ReactNode;
  iconBgColor: string;
  value: string;
  title: string;
  statsText?: string;
}
export default function Card({
  icon,
  iconBgColor,
  value,
  title,
  statsText,
}: ICard) {
  return (
    <div className="bg-white rounded-[16px] p-6">
      <div className="flex justify-between">
        <div
          className={clsx(
            "w-[42px] h-[42px] rounded-full flex items-center justify-center",
            iconBgColor
          )}
        >
          {typeof icon === "string" ? (
            <img src={icon} alt="card icon" className="w-[26px] h-[26px]" />
          ) : (
            icon
          )}
        </div>
        <p className="text-xs">{statsText || "+4% this month"}</p>
      </div>
      <p className="text-[25px] font-semibold mt-5">{value}</p>
      <p className="text-[17px]">{title}</p>
    </div>
  );
}
