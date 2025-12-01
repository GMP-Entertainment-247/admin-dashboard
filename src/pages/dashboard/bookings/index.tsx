import mic from "../../../images/svg/mic.svg";
import booking from "../../../images/svg/booking.svg";
import ticket from "../../../images/svg/tickets.svg";
import accepted from "../../../images/svg/accepted.svg";
import pending from "../../../images/svg/pending.svg";
import rejected from "../../../images/svg/rejected.svg";
import Card from "../../../components/shared/Card";
import { useState } from "react";
import Calendar from "react-calendar";
import type { CalendarProps } from  "react-calendar";





export default function BookingsHome() {
 const handleDateChange = (value: Value) => {
   
    setSelectedDate(value);
  };
  type Value = CalendarProps['value'];
  
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  
  // const handleDateChange: CalendarProps['onChange'] = (value) => {
  //   setSelectedDate(value);
  // };
  const cards = [
    { id: 1,
      title: "sessions",
      icon: mic,
      value: "238", 
      iconBgColor: "red"
     },
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
  // const details =[
  //   {
  //     id:1,
  //     img: mic,
  //     EventTitle: "GMP Rap Battle",
  //     Organizers:"ABC Media",
  //     GuestArtist: "Kizz Val",
  //     Location: "Lagos, Nigeria",
  //     Date: "12th Aug, 2023",
  //     Time: "10:00 AM - 12:00 PM",
  //     Action: "View Details",

  //   },
  //   {
  //     id:2,
  //     img: mic,
  //     EventTitle: "FelaMusic",
  //     Organizers:"ABC Media",
  //     GuestArtist: "Kizz Val",
  //     Location: "Lagos, Nigeria",
  //     Date: "12th Aug, 2023",
  //     Time: "10:00 AM - 12:00 PM",
  //     Action: "View Details",

  //   },
  //   {
  //     id:3,
  //     img: mic,
  //     EventTitle: "GMP Rap Battle",
  //     Organizers:"ABC Media",
  //     GuestArtist: "Kizz Val",
  //     Location: "Lagos, Nigeria",
  //     Date: "12th Aug, 2023",
  //     Time: "10:00 AM - 12:00 PM",
  //     Action: "View Details",

  //   },
  //   {
  //     id:4,
  //     img: mic,
  //     EventTitle: "Music Fest",
  //     Organizers:"Legit Music",
  //     GuestArtist: "Jizzy Dust",
  //     Location: "Lagos, Nigeria",
  //     Date: "12th Aug, 2023",
  //     Time: "12:00 PM",
  //     Action: "View Details",

  //   },
  //   {
  //     id:5,
  //     img: mic,
  //     EventTitle: "GMP Rap Battle",
  //     Organizers:"ABC Media",
  //     GuestArtist: "Kizz Val",
  //     Location: "Lagos, Nigeria",
  //     Date: "12th Aug, 2023",
  //     Time: "10:00 AM - 12:00 PM",
  //     Action: "View Details",

  //   }
  // ]

  return (
    <div>
      
    <Calendar value={selectedDate} onChange={handleDateChange} />
  

      {/*cards and calender container*/}
      <div className="flex">
        {/*cards */}
        <div className="grid grid-cols-3 gap-5 my-5 w-[802px] h-[383px] ">
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
        {/* <div className="ml-5 mt-5"> */}
          {/* <Calendar
            onChange ={(value: Date | Date[] | null) => {
              if (value instanceof Date) {
                setSelectedDate(value);
              }
            }}
            value={selectedDate}
          /> */}

          {/* <Calendar
          onChange ={setSelectedDate}
          value={selectedDate} /> */}
          
          {/* <p className="mt-2 text-gray-600">
            Selected Date: {selectedDate.toDateString()}
          </p> */}
        {/* </div> */}
      </div>
      <div className="">
      {/* <table className="w-full border-collapse bg-white ">
      <thead>
        <tr>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Event Title</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Organizers</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Guest Artist</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Location</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Date</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Time</th>
          <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      
        {details.map((item)=> (
          <tbody>
        <tr key={item.id }></tr>
        <tr key={item.img }></tr>
        <tr key={item.EventTitle}></tr>
        <tr key={item.Organizers }></tr>
        <tr key={item.GuestArtist }></tr>
        <tr key={item.Time }></tr>
        <tr key={item.Date }></tr>
        <tr key={item.Location}></tr>
        <tr key={item.Action}></tr>
</tbody>
        ))}
    </table> */}
      </div>
    </div>
  );
};