import mic from "../../../images/svg/mic.svg";
import booking from "../../../images/svg/booking.svg";
import ticket from "../../../images/svg/ticket.svg";
import accepted from "../../../images/svg/accepted.svg";
import pending from "../../../images/svg/pending.svg";
import rejected from "../../../images/svg/rejected.svg";
import Card from "../../../components/shared/Card";
import useFetch from "../../../utils/hooks/useFetch";
import EventCalendar from "../../../components/EventCalendar";
// import { useNavigate } from "react-router-dom";
import { BookingsTable } from "./all";


export default function BookingsHome() {
  // const navigate = useNavigate();
  const { data: metrics } = useFetch<any>("/admin/booking-metrics");

  console.log(metrics, "metrics")

  const cards = [
    { id: 1, 
      title: "Sessions", 
      icon: mic, 
      value: metrics?.sessions || 0, 
      iconBgColor: "bg-[#F85A7E]" 
    },
    {
      id: 2,
      title: "Bookings",
      icon: booking,
      value: metrics?.bookings || 0,
      iconBgColor: "bg-[#3B81DC]",
    },
    {
      id: 3,
      title: "Tickets",
      icon: ticket,
      value: metrics?.tickets || 0,
      iconBgColor: "bg-[#C25589]",
    },
    {
      id: 4,
      title: "Accepted",
      icon: accepted,
      value: metrics?.accepted || 0,
      iconBgColor: "bg-[#00BF00]",
    },
    {
      id: 5,
      title: "Pending",
      icon: pending,
      value: metrics?.pending || 0,
      iconBgColor: "bg-[#E6C200]",
    },
    {
      id: 6,
      title: "Rejected",
      icon: rejected,
      value: metrics?.rejected || 0,
      iconBgColor: "bg-[#FF0000]",
    },
  ];

  return (
    <div>
      {/*cards and calender container*/}
      <div className="flex gap-6">
        {/*cards */}
        <div className="grid grid-cols-3 gap-5 my-5 w-full h-[383px] ">
          {cards.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              icon={item.icon}
              iconBgColor={item.iconBgColor}
              value={item.value}
            />
          ))}
        </div>
        {/*calender */}
        <div className="ml-auto mt-5 h-[383px] w-1/4">
          <EventCalendar />
        </div>
      </div>
      <div className="">
        <BookingsTable isPreview={true} />
      </div>
    </div>
  );
}
