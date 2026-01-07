import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useMemo } from "react";
import { Modal } from "./Modal";
import { useSingleState } from "../utils/hooks/useSingleState";
import dayjs from "dayjs";
import { MapPinIcon } from "lucide-react";
import Status from "./shared/Status";

export default function EventCalendar({
  markedByCategory,
  categoryColors = {},
}: {
  markedByCategory?: Record<string, (Date | string)[]>;
  categoryColors?: Record<string, string>;
}) {
  const clickedDate = useSingleState<Date | null>(null)
  const showModal = useSingleState<boolean>(false)
  
  const dateColorMap = useMemo(() => {
    const map = new Map<string, string[]>();
    if (!markedByCategory) return map;

    Object.entries(markedByCategory).forEach(([category, dates]) => {
      const color = categoryColors[category] ?? "#BFA100";
      (dates || []).forEach((d) => {
        const key = (typeof d === "string" ? new Date(d) : d).toDateString();
        const arr = map.get(key) ?? [];
        arr.push(color);
        map.set(key, arr);
      });
    });

    return map;
  }, [markedByCategory, categoryColors]);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;
    const colors = dateColorMap.get(date.toDateString());
    if (!colors || colors.length === 0) return null;

    return (
      <div className="relative">
        <div className="flex justify-center w-full mt-1 gap-[2px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
      <div className="absolute top-[60px] left-0 w-full h-[35px] z-10 border-b border-solid border-[#E9E9E9] flex justify-start">
        {Object.entries(categoryColors).map((item, idx) => (
          <div className="flex items-center gap-1 mb-2 ml-2.5" key={idx}>
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
              	background: item?.[1] || "#BFA100"
              }}
            />
            <p className="text-[#737373] text-sm capitalize">
              {item?.[0] || ""}
            </p>
          </div>
        ))}
      </div>
      <Calendar
        value={new Date()}
        nextLabel={<ChevronRightIcon className="w-5 !-mr-5" />}
        prevLabel={<ChevronLeftIcon className="w-5 ml-2.5" />}
        tileContent={tileContent}
        onClickDay={(value) => {
          showModal.set(true)
          clickedDate.set(value)
        }}
      />
      <Modal
          show={showModal.get}
          onClose={() => {
              showModal.set(false)
          }}
          submitClick={()=>{}}
          submitLoading={false}
          hideButtons={true}
      >
          <div className="-mt-6">
            <p className="text-base font-semibold text-[#212121]">{dayjs(clickedDate.get).format("dddd, MMM DD, YYYY")}</p>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-[#00CC00]" />
              <p className="text-sm text-[#484848]">10 Bookings</p>
            </div>
            <div className="mt-5 flex flex-col gap-5 lg:max-h-[50vh] overflow-y-auto">
              {
                [1,2,3,4,5,6,7,8,9,10].map((item, idx) => (
                  <div key={idx} className="border border-[#B8B8B8] p-2.5 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-[#00CC00]" />
                        <div>
                          <p className="text-sm font-medium text-[#1A1A1A]">GMP Rap Battle</p>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4 text-[#666666]" />
                            <p className="text-xs text-[#666666]">Lagos, Nigeria</p>
                          </div>
                        </div>
                      </div>
                      <Status type="success" text="Confirmed" />
                    </div>
                    <hr className="my-3"/>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1">
                        <UserIcon />
                        <p className="text-xs text-[#666666]"><span className="font-semibold">Organizer:</span> ABC Media </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserIcon />
                        <p className="text-xs text-[#666666]"><span className="font-semibold">Guest Artist:</span> Kizzy Val </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon />
                        <p className="text-xs text-[#666666]">9:00 AM - 5:00 PM (8hr)</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <TicketIcon />
                        <p className="text-xs text-[#666666]">500 tickets</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
      </Modal>
    </div>
  );
}


const UserIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2954_23679)">
        <path d="M12.0939 14.4138C11.5072 14.5871 10.8139 14.6671 10.0006 14.6671H6.00056C5.18723 14.6671 4.49389 14.5871 3.90723 14.4138C4.05389 12.6805 5.83389 11.3138 8.00056 11.3138C10.1672 11.3138 11.9472 12.6805 12.0939 14.4138Z" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.99967 1.33331H5.99967C2.66634 1.33331 1.33301 2.66665 1.33301 5.99998V9.99998C1.33301 12.52 2.09301 13.9 3.90634 14.4133C4.05301 12.68 5.83301 11.3133 7.99967 11.3133C10.1663 11.3133 11.9463 12.68 12.093 14.4133C13.9063 13.9 14.6663 12.52 14.6663 9.99998V5.99998C14.6663 2.66665 13.333 1.33331 9.99967 1.33331ZM7.99967 9.44664C6.67967 9.44664 5.61301 8.37332 5.61301 7.05332C5.61301 5.73332 6.67967 4.66665 7.99967 4.66665C9.31967 4.66665 10.3863 5.73332 10.3863 7.05332C10.3863 8.37332 9.31967 9.44664 7.99967 9.44664Z" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.3866 7.05337C10.3866 8.37337 9.31995 9.44668 7.99995 9.44668C6.67995 9.44668 5.61328 8.37337 5.61328 7.05337C5.61328 5.73337 6.67995 4.66669 7.99995 4.66669C9.31995 4.66669 10.3866 5.73337 10.3866 7.05337Z" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_2954_23679">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}
const ClockIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.8337 8.83333C13.8337 12.0533 11.2203 14.6667 8.00033 14.6667C4.78033 14.6667 2.16699 12.0533 2.16699 8.83333C2.16699 5.61333 4.78033 3 8.00033 3C11.2203 3 13.8337 5.61333 13.8337 8.83333Z" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 5.33331V8.66665" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 1.33331H10" stroke="#1A1A1A" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}
const TicketIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.9997 8.33335C12.9997 7.41335 13.7463 6.66669 14.6663 6.66669V6.00002C14.6663 3.33335 13.9997 2.66669 11.333 2.66669H4.66634C1.99967 2.66669 1.33301 3.33335 1.33301 6.00002V6.33335C2.25301 6.33335 2.99967 7.08002 2.99967 8.00002C2.99967 8.92002 2.25301 9.66669 1.33301 9.66669V10C1.33301 12.6667 1.99967 13.3334 4.66634 13.3334H11.333C13.9997 13.3334 14.6663 12.6667 14.6663 10C13.7463 10 12.9997 9.25335 12.9997 8.33335Z" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.66699 2.66669L6.66699 13.3334" stroke="#1A1A1A" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"/>
    </svg>
  )
}
