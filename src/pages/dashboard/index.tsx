import DashboardLayout from "./DashboardLayout";
import Card from "../../components/shared/Card";
import Dropdown from "../../components/shared/Dropdown";
import Table from "../../components/Table";
import { formatNumber, imageProp } from "../../utils/helpers";
import edit from "../../images/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetch from '../../utils/hooks/useFetch';
import { IFan } from "../../interface/fans.interface";
import LineChartComponent from "../../components/Charts/LineChart";
import { useState } from "react";
import PieChartComponent from "../../components/Charts/PieChart";
import EventCalendar from "../../components/EventCalendar";
import user from "../../images/svg/user.svg";
import investors from "../../images/svg/investors.svg";
import mic from "../../images/svg/mic.svg";
import ranking from "../../images/svg/ranking.svg";
import studio from "../../images/svg/studio_booking.svg";
import medal from "../../images/svg/medal-star.svg";
import dayjs from "dayjs";


export default function DashboardHome() {
  const navigate = useNavigate()
  const {data, loading} = useFetch<{data: IFan[]}>("/admin/list-fans")
  const [lineChartDataKeys, setLineChartDataKeys] = useState([
    {label: 'voting', color: "#00BF00", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'artists', color: "#AB1BB2", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'celebrity', color: "#FF0000", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'investors', color: "#1A96F0", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'tickets', color: "#CCAC00", isActive: true, handleChange: handleLineChartDataKeyChange},
  ]);

  function handleLineChartDataKeyChange(keyLabel: string) {
    setLineChartDataKeys(prev =>
      prev.map(k =>
        k.label === keyLabel
          ? { ...k, isActive: !k.isActive }
          : k
      )
    );
  }

  return (
    <DashboardLayout>
      <div>
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-6 max-[992px]:grid-cols-2 max-[560px]:grid-cols-1">
              {[
                {
                  icon: user,
                  bg: "bg-[#F85A7E]",
                  value: formatNumber(10000),
                  title: "New Users",
                },
                {
                  icon: investors,
                  bg: "bg-[#3BDC54]",
                  value: formatNumber(10000),
                  title: "Investors",
                },
                {
                  icon: mic,
                  bg: "bg-[#C25589]",
                  value: formatNumber(10000),
                  title: "Artists",
                },
                {
                  icon: medal,
                  bg: "bg-[#1A96F0]",
                  value: formatNumber(10000),
                  title: "Celebrities",
                },
                {
                  icon: ranking,
                  bg: "bg-[#FFA61F]",
                  value: formatNumber(10000),
                  title: "Contestants",
                },
                {
                  icon: studio,
                  bg: "bg-[#702AC8]",
                  value: formatNumber(10000),
                  title: "Studio Bookings",
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
            <EventCalendar
              topSlot={
                <div className='absolute top-[60px] left-0 w-full h-[35px] z-10 border-b border-solid border-[#E9E9E9] flex flex-col justify-end'>
                    <div className="flex items-center gap-2 mb-2 ml-2.5">
                      <div className="bg-[#FF0000] w-2.5 h-2.5 rounded-full" />
                      <p className="text-[#737373] text-sm">Event</p>
                    </div>
                </div>
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 max-[1200px]:grid-cols-1 gap-6 my-10">
          <div className="bg-white rounded-[16px] p-5">
            <div className="flex justify-between items-center mb-6">
              <p className="font-semibold text-lg mb-4">Total Revenue</p>
              <Dropdown 
                triggerText="This Month" 
                options={[]} 
              />
            </div>
            <LineChartComponent 
              dataKeys={lineChartDataKeys}
              data={[
                {
                  name: 'Jan',
                  voting: 40,
                  artists: 24,
                  celebrity: 24,
                  investors: 23,
                  tickets: 34,
                },
                {
                  name: 'Feb',
                  voting: 30,
                  artists: 13,
                  celebrity: 10,
                  investors: 43,
                  tickets: 35,
                },
                {
                  name: 'Mar',
                  voting: 20,
                  artists: 98,
                  celebrity: 20,
                  investors: 99,
                  tickets: 55,
                },
                {
                  name: 'Apr',
                  voting: 20,
                  artists: 38,
                  celebrity: 20,
                  investors: 13,
                  tickets: 5,
                },
                {
                  name: 'May',
                  voting: 10,
                  artists: 48,
                  celebrity: 21,
                  investors: 88,
                  tickets: 76,
                },
                {
                  name: 'Jun',
                  voting: 23,
                  artists: 38,
                  celebrity: 25,
                  investors: 43,
                  tickets: 85,
                },
                {
                  name: 'Jul',
                  voting: 34,
                  artists: 43,
                  celebrity: 21,
                  investors: 13,
                  tickets: 95,
                },
                {
                  name: 'Aug',
                  voting: 34,
                  artists: 43,
                  celebrity: 21,
                  investors: 43,
                  tickets: 65,
                },
                {
                  name: 'Sep',
                  voting: 34,
                  artists: 43,
                  celebrity: 21,
                  investors: 93,
                  tickets: 35,
                },
                {
                  name: 'Oct',
                  voting: 34,
                  artists: 43,
                  celebrity: 21,
                  investors: 23,
                  tickets: 55,
                },
                {
                  name: 'Nov',
                  voting: 34,
                  artists: 43,
                  celebrity: 21,
                  investors: 67,
                  tickets: 37,
                },
                {
                  name: 'Dec',
                  voting: 34,
                  artists: 43,
                  celebrity: 21,
                  investors: 24,
                  tickets: 39,
                },
              ]}
            />
          </div>
          <div className="bg-white rounded-[16px] p-5">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg mb-4">Visitors</p>
              <Dropdown 
                triggerText="This Month" 
                options={[]} 
              />
            </div>
            <PieChartComponent 
              data={[
                { name: "Search engine", value: 400, color: "#00CC00" },
                { name: "Social media", value: 300, color: "#C7E12C" },
                { name: "Others", value: 300, color: "#702AC8" },
              ]}
            />
          </div>
        </div>
        <div className="my-10">
          <Table
            tableTitle="Recent Activities"
            hideSearch
            isLoading={loading}
            data={data?.data ?? []}
            slot={
              <div className="flex gap-4 items-center">
                <Dropdown 
                  triggerText="Most Recent" 
                  options={[
                    {label: "Most Recent", value: "recent"},
                    {label: "Newest First", value: "newest"},
                    {label: "Oldest First", value: "oldest"},
                    {label: "A-Z", value: "desc"},
                    {label: "Z-A", value: "asc"},
                  ]} 
                />
                <Dropdown 
                  triggerText="This Month" 
                  options={[
                    {label: "Today", value: "today"},
                    {label: "This Week", value: "week"},
                    {label: "This Month", value: "month"},
                    {label: "This Year", value: "year"},
                  ]} 
                />
              </div>
            }
            rows={[
              {
                header: "Username",
                view: (item) => (
                  <div className="flex gap-2 items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                      <img {...imageProp("")} alt="" className="w-full" />
                    </div>
                    <p>{item.name}</p>
                  </div>
                ),
              },
              {
                header: "Description",
                view: (item) => <span>Big Baller just release a new song titled “No Fear”. This song is one of the most streaming...</span>,
              },
              {
                header: "Date",
                view: (item) => <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>,
              },
              {
                header: "Time",
                view: (item) => <span>{dayjs(item.created_at).format("hh:mma")}</span>,
              },
            ]}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
