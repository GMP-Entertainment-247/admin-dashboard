import link from "../../../../images/svg/link.svg";
import note from "../../../../images/svg/note.svg";
import ticket from "../../../../images/svg/ticket.svg";
import video from "../../../../images/svg/video.svg";
import calendar from "../../../../images/svg/calendar.svg";
import ranking from "../../../../images/svg/ranking.svg";
import { formatNumber } from "../../../../utils/helpers";
import Card from "../../../../components/shared/Card";
import Button from "../../../../components/shared/Button";
import EventCalendar from "../../../../components/EventCalendar";
import { IAuditionMetrics } from "../../../../interface/rapbattle.interface";
import useFetch from "../../../../utils/hooks/useFetch";

export default function IndexWrapper({
  children,
  title,
  buttonText,
  buttonLink,
  onButtonClick,
}: {
  title: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  children: React.ReactNode;
}) {
  const { data: metrics } = useFetch<IAuditionMetrics>(
    "/admin/announcement/metrics-by-one"
  );

  return (
    <>
      <div className="flex justify-between items-center py-5">
        <h1 className="page-title">{title}</h1>
        {!!buttonText && (
          <Button
            text={buttonText}
            type="button"
            onClick={onButtonClick}
            href={buttonLink}
            extraClassName="rounded-[8px] font-semibold !w-fit !h-10 !px-5"
          />
        )}
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-6 max-[992px]:grid-cols-2 max-[560px]:grid-cols-1">
            {[
              {
                icon: link,
                bg: "bg-[#F85A7E]",
                value: formatNumber(metrics?.entries || 0),
                title: "Entries",
              },
              {
                icon: note,
                bg: "bg-[#3B81DC]",
                value: formatNumber(Number(metrics?.votes) || 0),
                title: "Votes",
              },
              {
                icon: ticket,
                bg: "bg-[#C25589]",
                value: formatNumber(metrics?.tickets || 0),
                title: "Tickets",
              },
              {
                icon: video,
                bg: "bg-[#38BDF8]",
                value: formatNumber(metrics?.livestreams || 0),
                title: "Livestreams",
              },
              {
                icon: calendar,
                bg: "bg-[#FF0000]",
                value: formatNumber(metrics?.event || 0),
                title: "Event",
              },
              {
                icon: ranking,
                bg: "bg-[#00BF00]",
                value: formatNumber(metrics?.contestants || 0),
                title: "Contestants",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                icon={item.icon}
                iconBgColor={item.bg}
                value={item.value}
                title={item.title}
              />
            ))}
          </div>
        </div>
        <div className="">
          <EventCalendar categoryColors={{ event: "#FF0000" }} />
        </div>
      </div>
      <div className="py-10">{children}</div>
    </>
  );
}
