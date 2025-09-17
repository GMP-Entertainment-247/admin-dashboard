interface RapBattleCardProps {
  image: string;
  title: string;
  description: string;
  time: string;
  // link: string;
}

export default function RapBattleCard({
  image,
  title,
  description,
  time,
}: RapBattleCardProps) {
  return (
    <div className="w-full aspect-[1.054] rounded-2xl bg-white p-3">
      <div className="w-full aspect-[1.91] object-cover rounded-xl mb-4 relative overflow-hidden">
        <img
          src={image}
          alt="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <p className="bg-white rounded-lg text-center absolute left-2 bottom-2 p-2 text-[#212121] text-xs font-medium">
          Rap Battle
        </p>
      </div>
      <h3 className="text-base font-semibold text-[#212121] mb-3 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-[#212121] mb-[10px] line-clamp-2">
        {description}
      </p>
      <p className="text-sm text-[#999999] mb-[10px] text-right">{time}</p>
    </div>
  );
}
