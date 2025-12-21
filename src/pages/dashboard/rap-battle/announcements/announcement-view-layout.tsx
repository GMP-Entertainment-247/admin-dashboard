import type { Announcement } from "../../../../interface/announcement.interface";
// import pic from "../../../../images/capture.png";
import { MessageCircle, PhoneCall, Calendar, Clock } from "lucide-react";
import { imageProp } from "../../../../utils/helpers";

const AnnouncementViewLayout: React.FC<Omit<Announcement, "status" | "id">> = ({
  title,
  description,
  startDate,
  startTime,
  endDate,
  endTime,
  image,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-[30px]">
      <article className="lg:w-[56%]">
        <h3 className="text-xl md:text-2xl font-semibold text-grey-normal mb-5 line-clamp-2">
          {title}
        </h3>
        <div
          className="text-xs md:text-sm text-grey-normal font-normal mb-8 lg:mb-10"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="space-y-8 [&>div]:space-y-3">
          <div>
            <p className="text-lg font-medium text-[#212121]">
              Start Date & Time
            </p>
            <div className="flex items-center gap-10">
              <p className="flex items-center gap-2">
                <Calendar />
                {startDate}
              </p>
              <p className="flex items-center gap-2">
                <Clock />
                {startTime}
              </p>
            </div>
          </div>
          <div>
            <p className="text-lg font-medium text-[#212121]">
              End Date & Time
            </p>
            <div className="flex items-center gap-10">
              <p className="flex items-center gap-2">
                <Calendar />
                {endDate}
              </p>
              <p className="flex items-center gap-2">
                <Clock />
                {endTime}
              </p>
            </div>
          </div>
        </div>
      </article>
      <aside className="lg:flex-1 space-y-10 lg:mt-4">
        <img src={image} alt="announcement-pic" className="w-full aspect-[1.7]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              {...imageProp("")}
              alt=""
              className="w-12 h-12 rounded-full border border-red-500"
            />
            <div className="space-y-1.5">
              <p className="font-semibold text-[#1A1A1A] text-base">John Doe</p>
              <p className="text-[#484848] text-sm">Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 rounded-full bg-brand-25 grid place-items-center"
              title="Message"
              type="button"
            >
              <MessageCircle color="#D6B500" size={20} />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-brand-25 grid place-items-center"
              title="Call"
              type="button"
            >
              <PhoneCall color="#D6B500" size={20} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AnnouncementViewLayout;
