import { MessageCircle, PhoneCall, Calendar, MapPin } from "lucide-react";
import { imageProp, formatTime12Hour, formatDateMDY } from "../../../../utils/helpers"

interface EventViewLayoutProps {
    title: string;
    description: string;
    venue: string;
    location: string;
    eventStartDate: string;
    eventStartTime: string;
    image: string;
    creatorName?: string;
    creatorAvatar?: string;
}

const EventViewLayout: React.FC<EventViewLayoutProps> = ({
    title,
    description,
    venue,
    location,
    eventStartDate,
    eventStartTime,
    image,
    creatorName,
    creatorAvatar,
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
            </article>
            <aside className="lg:flex-1 space-y-10 lg:mt-4">
                <img
                    src={image}
                    alt="event-pic"
                    className="w-full aspect-[1.7]"
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
                            <p className="text-[#484848] text-sm">{formatDateMDY(eventStartDate)}</p>
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

export default EventViewLayout;
