import Card from "../../../components/shared/Card";
import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { formatNumber, imageProp } from "../../../utils/helpers";
import user from "../../../images/svg/user.svg";
import money from "../../../images/svg/money.svg";
import mic from "../../../images/svg/mic.svg";
import bookmark from "../../../images/svg/bookmark.svg";
import edit from "../../../images/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../utils/hooks/useFetch';
import { IFan } from "../../../interface/fans.interface";
import LineChartComponent from "../../../components/Charts/LineChart";
import PieChartComponent from "../../../components/Charts/PieChart";
import { useState } from "react";
// import dayjs from "dayjs";


export default function CelebrityHome () {
  const navigate = useNavigate()
  const {data, loading} = useFetch<{data: IFan[]}>("/admin/list-fans")
  const [lineChartDataKeys, setLineChartDataKeys] = useState([
    {label: 'revenue', color: "#00BF00", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'sessions', color: "#CCAC00", isActive: true, handleChange: handleLineChartDataKeyChange},
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
    <div>
      <div className="grid grid-cols-4 gap-6 max-[1200px]:grid-cols-3 max-[992px]:grid-cols-2 max-[560px]:grid-cols-1">
        {[
          {
            icon: user,
            bg: "bg-[#3BDC54]",
            value: formatNumber(10000),
            title: "Celebrity",
          },
          {
            icon: mic,
            bg: "bg-[#F6917F]",
            value: formatNumber(10000),
            title: "Sessions",
          },
          {
            icon: money,
            bg: "bg-[#181670]",
            value: formatNumber(10000),
            title: "Revenue",
          },
          {
            icon: bookmark,
            bg: "bg-[#702AC8]",
            value: formatNumber(10000),
            title: "Bookings",
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
      <div className="grid grid-cols-2 max-[1200px]:grid-cols-1 gap-6 my-10">
        <div className="bg-white rounded-[16px] p-5">
          <div className="flex justify-between items-center mb-6">
            <p className="font-semibold text-lg mb-4">Performance</p>
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
                revenue: 40,
                sessions: 24,
              },
              {
                name: 'Feb',
                revenue: 30,
                sessions: 10,
              },
              {
                name: 'Mar',
                revenue: 20,
                sessions: 20,
              },
              {
                name: 'Apr',
                revenue: 20,
                sessions: 20,
              },
              {
                name: 'May',
                revenue: 10,
                sessions: 21,
              },
              {
                name: 'Jun',
                revenue: 23,
                sessions: 25,
              },
              {
                name: 'Jul',
                revenue: 34,
                sessions: 21,
              },
              {
                name: 'Aug',
                revenue: 34,
                sessions: 21,
              },
              {
                name: 'Sep',
                revenue: 34,
                sessions: 21,
              },
              {
                name: 'Oct',
                revenue: 34,
                sessions: 21,
              },
              {
                name: 'Nov',
                revenue: 34,
                sessions: 21,
              },
              {
                name: 'Dec',
                revenue: 34,
                sessions: 21,
              },
            ]}
          />
        </div>
        <div className="bg-white rounded-[16px] p-5">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg mb-4">Offers</p>
            <Dropdown 
              triggerText="This Month" 
              options={[]} 
            />
          </div>
          <PieChartComponent 
            data={[
              { name: "Accepted", value: 400, color: "#00CC00" },
              { name: "Pending", value: 300, color: "#FFD700" },
              { name: "Rejected", value: 300, color: "#FF0000" },
            ]}
          />
        </div>
      </div>
      <div className="my-10">
        <Table
          tableTitle="Celebrity"
          searchPlaceHolder="Search any celebrity"
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
              header: "Celebrity Name",
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
              header: "Email",
              view: (item) => <span className="lowercase">{item.email}</span>,
            },
            {
              header: "Location",
              view: (item) => <span className="lowercase">{item.email}</span>,
            },
            {
              header: "Phone Number",
              view: (item) => item.phone,
            },
            // {
            //   header: "Date Joined",
            //   view: (item) => <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>,
            // },
            {
              header: "Action",
              view: (item) => (
                <img
                  src={edit}
                  alt="edit"
                  className="w-6 ml-4"
                  onClick={() => navigate(`/celebrities/${item.id}`)}
                />
              ),
            },
          ]}
          isPreview
          seeMoreLink="/celebrities/all"
        />
      </div>
    </div>
  );
}
