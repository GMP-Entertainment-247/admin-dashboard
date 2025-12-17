import Card from "../../../components/shared/Card";
import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { formatNumber, imageProp } from "../../../utils/helpers";
import upload from "../../../images/svg/upload.svg";
import money from "../../../images/svg/money.svg";
import mic from "../../../images/svg/mic.svg";
import edit from "../../../images/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../utils/hooks/useFetch';
import LineChartComponent from "../../../components/Charts/LineChart";
import { useState } from "react";
import PieChartComponent from "../../../components/Charts/PieChart";
import { IArtist } from "../../../interface/artists.interface";
// import dayjs from "dayjs";


export default function ArtistsHome () {
  const navigate = useNavigate()
  const {data, loading} = useFetch<{data: IArtist[]}>("/admin/list-artists")
  const [lineChartDataKeys, setLineChartDataKeys] = useState([
    {label: 'revenue', color: "#00BF00", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'uploads', color: "#AB1BB2", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'bookings', color: "#CCAC00", isActive: true, handleChange: handleLineChartDataKeyChange},
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
            icon: upload,
            bg: "bg-[#F6917F]",
            value: formatNumber(10000),
            title: "Uploads",
          },
          {
            icon: money,
            bg: "bg-[#181670]",
            value: formatNumber(10000),
            title: "Revenue",
          },
          {
            icon: mic,
            bg: "bg-[#3BDC54]",
            value: formatNumber(10000),
            title: "Artists",
          },
          {
            icon: money,
            bg: "bg-[#702AC8]",
            value: formatNumber(10000),
            title: "Offers",
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
                uploads: 24,
                bookings: 24,
              },
              {
                name: 'Feb',
                revenue: 30,
                uploads: 13,
                bookings: 10,
              },
              {
                name: 'Mar',
                revenue: 20,
                uploads: 98,
                bookings: 20,
              },
              {
                name: 'Apr',
                revenue: 20,
                uploads: 38,
                bookings: 20,
              },
              {
                name: 'May',
                revenue: 10,
                uploads: 48,
                bookings: 21,
              },
              {
                name: 'Jun',
                revenue: 23,
                uploads: 38,
                bookings: 25,
              },
              {
                name: 'Jul',
                revenue: 34,
                uploads: 43,
                bookings: 21,
              },
              {
                name: 'Aug',
                revenue: 34,
                uploads: 43,
                bookings: 21,
              },
              {
                name: 'Sep',
                revenue: 34,
                uploads: 43,
                bookings: 21,
              },
              {
                name: 'Oct',
                revenue: 34,
                uploads: 43,
                bookings: 21,
              },
              {
                name: 'Nov',
                revenue: 34,
                uploads: 43,
                bookings: 21,
              },
              {
                name: 'Dec',
                revenue: 34,
                uploads: 43,
                bookings: 21,
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
          tableTitle="Artist"
          searchPlaceHolder="Search any artist"
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
              header: "Artist Name",
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
              view: (item) => <span className="lowercase">{item.location ?? "---"}</span>,
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
                  onClick={() => navigate(`/artists/${item.id}`)}
                />
              ),
            },
          ]}
          isPreview
          seeMoreLink="/artists/all"
        />
      </div>
    </div>
  );
}
