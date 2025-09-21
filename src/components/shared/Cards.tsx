// import { title } from 'process'
import React from "react";
import revenue from "../../images/revenue.png"
import userLogo from "../../images/userlogo.png"
import votes from "../../images/votes.png"
import tickets from "../../images/tickets.png"

const Cards = [
  {
    title: "Fans",
    value: "1,018",
    img: userLogo,
  },
  {
    title: "Revenue",
    value: "100,200",
    img: revenue,
  },
  {
    title: "Tickets",
    value: "182",
    img: tickets,
  },
  {
    title: "Votes",
    value: "1375",
    img: votes,
  },
];

const Card = () => {
  return (
    <div className="grid grid-cols-4  gap-[20px] ml-[276px] mt-5 pr-8 w-[1144px] ">
      {Cards.map((card, i) => (
        <div
          key={i}
          className=" w-[276px] h-[192px] rounded-[17.07px] pl-[21.34px] gap-5 bg-[#FFFFFF] font-montserrat shadow-md "
        >
          <div className="flex justify-between gap-5 pr-[22.2px] ">

          <img src={card.img} alt={card.title} className=" mt-[21.34px]  " />
          <p className="pt-[19.8px]  text-[12.8px]"> +4% this month</p>
          </div>
          <p className=" mt-[26.67px] text-[25.6px] font-[600] leading-[100%]  ">{card.value}</p>
          <p className="mt-[14.88px]  text-[17.6px]">{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
