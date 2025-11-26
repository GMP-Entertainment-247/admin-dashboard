import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useMemo } from 'react';

export default function EventCalendar({
	markedByCategory,
	categoryColors = {},
}: {
	markedByCategory?: Record<string, (Date | string)[]>;
	categoryColors?: Record<string, string>;
}) {
  const dateColorMap = useMemo(() => {
    const map = new Map<string, string[]>();
    if (!markedByCategory) return map;

    Object.entries(markedByCategory).forEach(([category, dates]) => {
      const color = categoryColors[category] ?? '#BFA100';
      (dates || []).forEach(d => {
        const key = (typeof d === 'string' ? new Date(d) : d).toDateString();
        const arr = map.get(key) ?? [];
        arr.push(color);
        map.set(key, arr);
      });
    });

    return map;
  }, [markedByCategory, categoryColors]);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    const colors = dateColorMap.get(date.toDateString());
    if (!colors || colors.length === 0) return null;

    return (
			<div className='relative'>
				<div className='flex justify-center w-full mt-1 gap-[2px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
					{colors.map((c, i) => (
						<span
							key={i}
							style={{
								width: 6,
								height: 6,
								borderRadius: 999,
								background: c,
								display: 'inline-block',
							}}
						/>
					))}
				</div>
      </div>
    );
  };

  return (
    <div className="event-calendar h-full relative">
			<div className='absolute top-[60px] left-0 w-full h-[35px] z-10 border-b border-solid border-[#E9E9E9] flex justify-start'>
				{
					Object.entries(categoryColors).map((item, idx)=>(
						<div className="flex items-center gap-1 mb-2 ml-2.5" key={idx}>
							<div 
								className="w-2.5 h-2.5 rounded-full" 
								style={{
									background: item?.[1] || "#BFA100"
								}}
							/>
							<p className="text-[#737373] text-sm capitalize">{item?.[0]||""}</p>
						</div>
					))
				}
			</div>
      <Calendar
        value={new Date()}
        nextLabel={<ChevronRightIcon className="w-5 !-mr-5" />}
        prevLabel={<ChevronLeftIcon className="w-5 ml-2.5" />}
        tileContent={tileContent}
      />
    </div>
  );
}