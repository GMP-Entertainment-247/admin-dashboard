import mic from "../../../images/svg/mic.svg";
import booking from "../../../images/svg/booking.svg";
import ticket from "../../../images/svg/tickets.svg";
import accepted from "../../../images/svg/accepted.svg";
import pending from "../../../images/svg/pending.svg";
import rejected from "../../../images/svg/rejected.svg";
import Card from "../../../components/shared/Card";
import useFetch from "../../../utils/hooks/useFetch";
import { IFan } from "../../../interface/fans.interface";
import Table from "../../../components/Table";
import EventCalendar from "../../../components/EventCalendar";
import Dropdown from "../../../components/shared/Dropdown";
import { imageProp } from "../../../utils/helpers";
import edit from "../../../images/svg/edit.svg";
// import BookingsTable  from "../artists/tables/allBookings";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
export default function BookingsHome() {
  const navigate = useNavigate();
  const { data, loading } = useFetch<{ data: IFan[] }>("/admin/list-fans");

  const cards = [
    { id: 1, title: "sessions", icon: mic, value: "238", iconBgColor: "red" },
    {
      id: 2,
      title: "Bookings",
      icon: booking,
      value: "68",
      iconBgColor: "blue",
    },
    {
      id: 3,
      title: "Tickets",
      icon: ticket,
      value: "1278",
      iconBgColor: "#C25589",
    },
    {
      id: 4,
      title: "Accepted",
      icon: accepted,
      value: "232",
      iconBgColor: "purple",
    },
    {
      id: 5,
      title: "Pending",
      icon: pending,
      value: "454",
      iconBgColor: "pink",
    },
    {
      id: 6,
      title: "Rejected",
      icon: rejected,
      value: "321",
      iconBgColor: "yellow",
    },
  ];
  const details = [
    {
      id: 1,
      img: mic,
      EventTitle: "GMP Rap Battle",
      Organizers: "ABC Media",
      GuestArtist: "Kizz Val",
      Location: "Lagos, Nigeria",
      Date: "12th Aug, 2023",
      Time: "10:00 AM - 12:00 PM",
      Action: "View Details",
    },
    {
      id: 2,
      img: mic,
      EventTitle: "FelaMusic",
      Organizers: "ABC Media",
      GuestArtist: "Kizz Val",
      Location: "Lagos, Nigeria",
      Date: "12th Aug, 2023",
      Time: "10:00 AM - 12:00 PM",
      Action: "View Details",
    },
    {
      id: 3,
      img: mic,
      EventTitle: "GMP Rap Battle",
      Organizers: "ABC Media",
      GuestArtist: "Kizz Val",
      Location: "Lagos, Nigeria",
      Date: "12th Aug, 2023",
      Time: "10:00 AM - 12:00 PM",
      Action: "View Details",
    },
    {
      id: 4,
      img: mic,
      EventTitle: "Music Fest",
      Organizers: "Legit Music",
      GuestArtist: "Jizzy Dust",
      Location: "Lagos, Nigeria",
      Date: "12th Aug, 2023",
      Time: "12:00 PM",
      Action: "View Details",
    },
    {
      id: 5,
      img: mic,
      EventTitle: "GMP Rap Battle",
      Organizers: "ABC Media",
      GuestArtist: "Kizz Val",
      Location: "Lagos, Nigeria",
      Date: "12th Aug, 2023",
      Time: "10:00 AM - 12:00 PM",
      Action: "View Details",
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
          {/* <Calendar value={selectedDate} onChange={handleDateChange} /> */}
        </div>
      </div>
      <div className="">
        {/* <BookingsTable/> */}
        <Table
          tableTitle="Bookings"
          searchPlaceHolder="Search event title, organizer..."
          isLoading={loading}
          data={data?.data ?? []}
          slot={
            <div className="flex gap-4 items-center">
              <Dropdown
                triggerText="Most Recent"
                options={[
                  { label: "Most Recent", value: "recent" },
                  { label: "Newest First", value: "newest" },
                  { label: "Oldest First", value: "oldest" },
                  { label: "A-Z", value: "desc" },
                  { label: "Z-A", value: "asc" },
                ]}
              />
              <Dropdown
                triggerText="This Month"
                options={[
                  { label: "Today", value: "today" },
                  { label: "This Week", value: "week" },
                  { label: "This Month", value: "month" },
                  { label: "This Year", value: "year" },
                ]}
              />
            </div>
          }
          rows={[
            {
              header: "Event Title",
              view: (details) => (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img {...imageProp("")} alt="" className="w-full" />
                  </div>
                  <p>{details.name}</p>
                </div>
              ),
            },
            {
              header: "Organizers",
              view: (item) => <span className="lowercase">{item.name}</span>,
            },
            {
              header: "Guest Artist",
              view: (item) => <span className="lowercase">{item.email}</span>,
            },
            {
              header: "Location",
              view: (details) => <span className="lowercase">{details.phone}</span>,
            },
            {
              header: "Date",
              view: (item) => (
                <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>
              ),
            },
            {
              header: "Time",
              view: (item) => (
                <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>
              ),
            },

            {
              header: "Action",
              view: (item) => (
                <img
                  src={edit}
                  alt="edit"
                  className="w-6 ml-4"
                  onClick={() => navigate(`/bookings/${item.id}`)}
                />
              ),
            },
          ]}
          isPreview
          seeMoreLink="/allBookings/bookings"
        />

        <table className="w-full border-collapse bg-white ">
          {/* <thead>
        <tr>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Event Title</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Organizers</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Guest Artist</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Location</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Date</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Time</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Action</th>
        </tr>
      </thead> */}

          {details.map((item) => (
            <tbody>
              <tr key={item.id}></tr>
              <tr key={item.img}></tr>
              <tr key={item.EventTitle}></tr>
              <tr key={item.Organizers}></tr>
              <tr key={item.GuestArtist}></tr>
              <tr key={item.Time}></tr>
              <tr key={item.Date}></tr>
              <tr key={item.Location}></tr>
              <tr key={item.Action}></tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
