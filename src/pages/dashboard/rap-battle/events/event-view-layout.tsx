import { MessageCircle, PhoneCall, Calendar, MapPin } from "lucide-react";
import {
  imageProp,
  formatTime12Hour,
  formatDateMDY,
} from "../../../../utils/helpers";

interface EventViewLayoutProps {
  title: string;
  description: string;
  venue: string;
  location: string;
  price?: string;
  availableTickets?: string;
  link?: string;
  eventStartDate: string;
  eventStartTime: string;
  eventEndDate?: string;
  eventEndTime?: string;
  saleStartDate?: string;
  saleStartTime?: string;
  saleEndDate?: string;
  saleEndTime?: string;
  image: string;
  creatorName?: string;
  creatorAvatar?: string;
  creatorPhone?: string;
  creatorEmail?: string;
}

const EventViewLayout: React.FC<EventViewLayoutProps> = ({
  title,
  description,
  venue,
  location,
  price,
  availableTickets,
  link,
  eventStartDate,
  eventStartTime,
  eventEndDate,
  eventEndTime,
  saleStartDate,
  saleStartTime,
  saleEndDate,
  saleEndTime,
  image,
  creatorName,
  creatorAvatar,
  creatorPhone,
  creatorEmail,
}) => {
  const handleEmailClick = () => {
    if (!creatorEmail) return;
    window.location.href = `mailto:${creatorEmail}`;
  };

  const handlePhoneClick = () => {
    if (!creatorPhone) return;
    window.location.href = `tel:${creatorPhone}`;
  };

  return (
    <div className="bg-white p-5 rounded-2xl w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-[30px]">
      <article className="lg:w-[56%] space-y-7 lg:flex lg:flex-col lg:space-y-0 lg:gap-7">
        <h3 className="text-xl md:text-2xl font-semibold text-grey-normal line-clamp-2">
          {title}
        </h3>

        <div
          className="text-xs md:text-sm text-grey-normal font-normal"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="rounded-xl border border-[#E9E9E9] p-4 lg:!mt-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <p className="text-[#6B6B6B]">Venue</p>
              <p className="font-semibold text-[#1A1A1A]">{venue || "---"}</p>
            </div>
            <div>
              <p className="text-[#6B6B6B]">Location</p>
              <p className="font-semibold text-[#1A1A1A]">
                {location || "---"}
              </p>
            </div>
            <div>
              <p className="text-[#6B6B6B]">Price</p>
              <p className="font-semibold text-[#1A1A1A]">
                {price ? `₦${price}` : "---"}
              </p>
            </div>
            <div>
              <p className="text-[#6B6B6B]">Available Tickets</p>
              <p className="font-semibold text-[#1A1A1A]">
                {availableTickets || "---"}
              </p>
            </div>
            <div>
              <p className="text-[#6B6B6B]">Event Start</p>
              <p className="font-semibold text-[#1A1A1A]">
                {formatDateMDY(eventStartDate)} •{" "}
                {formatTime12Hour(eventStartTime)}
              </p>
            </div>
            <div>
              <p className="text-[#6B6B6B]">Event End</p>
              <p className="font-semibold text-[#1A1A1A]">
                {eventEndDate
                  ? `${formatDateMDY(eventEndDate)} • ${formatTime12Hour(
                      eventEndTime
                    )}`
                  : "---"}
              </p>
            </div>
            <div>
              <p className="text-[#6B6B6B]">Sale Start</p>
              <p className="font-semibold text-[#1A1A1A]">
                {saleStartDate
                  ? `${formatDateMDY(saleStartDate)} • ${formatTime12Hour(
                      saleStartTime
                    )}`
                  : "---"}
              </p>
            </div>
            <div>
              <p className="text-[#6B6B6B]">Sale End</p>
              <p className="font-semibold text-[#1A1A1A]">
                {saleEndDate
                  ? `${formatDateMDY(saleEndDate)} • ${formatTime12Hour(
                      saleEndTime
                    )}`
                  : "---"}
              </p>
            </div>
            {link ? (
              <div className="sm:col-span-2">
                <p className="text-[#6B6B6B]">Link</p>
                <a
                  className="font-semibold text-brand-700 break-all underline"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </article>
      <aside className="lg:flex-1 space-y-10 lg:mt-4">
        <img
          src={image}
          alt="event-pic"
          className="w-full aspect-[1.7] object-cover"
        />
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-25 grid place-items-center flex-shrink-0">
              <MapPin color="#D6B500" size={20} />
            </div>
            <div>
              <p className="font-semibold text-[#1A1A1A] text-base">{venue}</p>
              <p className="text-[#484848] text-sm">{location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-25 grid place-items-center flex-shrink-0">
              <Calendar color="#D6B500" size={20} />
            </div>
            <div>
              <p className="font-semibold text-[#1A1A1A] text-base">
                {formatTime12Hour(eventStartTime)}
              </p>
              <p className="text-[#484848] text-sm">
                {formatDateMDY(eventStartDate)}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[0.5px] bg-[#E9E9E9] w-full" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              {...imageProp(creatorAvatar || "")}
              alt=""
              className="w-12 h-12 rounded-full border border-red-500"
            />
            <div className="space-y-1.5">
              <p className="font-semibold text-[#1A1A1A] text-base">
                {creatorName || "John Doe"}
              </p>
              <p className="text-[#484848] text-sm">Event Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 rounded-full bg-brand-25 grid place-items-center"
              title="Message"
              type="button"
              onClick={handleEmailClick}
            >
              <MessageCircle color="#D6B500" size={20} />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-brand-25 grid place-items-center"
              title="Call"
              type="button"
              onClick={handlePhoneClick}
            >
              <PhoneCall color="#D6B500" size={20} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default EventViewLayout;
