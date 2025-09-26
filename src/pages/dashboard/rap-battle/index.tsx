import Button from "../../../components/shared/Button";
import Card from "../../../components/shared/Card";
import { formatNumber } from "../../../utils/helpers";
import user from "../../../images/svg/user.svg";
import money from "../../../images/svg/money.svg";
import ticket from "../../../images/svg/ticket.svg";
import AutoResizingGrid from "../../../components/shared/AutoResizingGrid";

export default function RapBattleHome() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="page-title">Rap Battle</h1>
        <Button text="Create Event" extraClassName="!w-fit px-5" />
      </div>
      <div className="w-full flex flex-col md:flex-row items-stretch gap-5">
        <AutoResizingGrid containerClassName="w-full md:w-[60%]">
          {[
            {
              icon: user,
              bg: "bg-[#F6917F]",
              value: formatNumber(238),
              title: "Enteries",
            },
            {
              icon: money,
              bg: "bg-[#181670]",
              value: formatNumber(10000),
              title: "Votes",
            },
            {
              icon: ticket,
              bg: "bg-[#3BDC54]",
              value: formatNumber(10000),
              title: "Tickets",
            },
            {
              icon: money,
              bg: "bg-[#702AC8]",
              value: formatNumber(10000),
              title: "Livestream",
            },
            {
              icon: money,
              bg: "bg-[#702AC8]",
              value: formatNumber(10000),
              title: "Events",
            },
            {
              icon: money,
              bg: "bg-[#702AC8]",
              value: formatNumber(10000),
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
        </AutoResizingGrid>
        <div className="flex-1">Calendar</div>
      </div>
    </div>
  );
}
