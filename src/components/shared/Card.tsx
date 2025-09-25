import clsx from "clsx";


interface ICard {
    icon: string;
    iconBgColor: string,
    value: string,
    title: string
}
export default function Card ({
    icon, 
    iconBgColor,
    value,
    title,
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
                    <img src={icon} alt="card icon" className="w-[26px] h-[26px]" />
                </div>
                <p className="text-xs">+4% this month</p>
            </div>
            <p className="text-[25px] font-semibold mt-5">{value}</p>
            <p className="text-[17px]">{title}</p>
        </div>
    )
}