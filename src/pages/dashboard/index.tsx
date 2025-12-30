import DashboardLayout from "./DashboardLayout";
import Card from "../../components/shared/Card";
import Dropdown from "../../components/shared/Dropdown";
import Table from "../../components/Table";
import { formatNumber, imageProp } from "../../utils/helpers";
import useFetch from '../../utils/hooks/useFetch';
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
import { IActivityLog, IDashboardMetrics, ILineGraphData } from "../../interface/dashboard.interface";
import { useQueryParams } from "../../utils/hooks/useQueryParams";
import { tableOrderOptions, tablePeriodOptions } from "../../utils/constant";


export default function DashboardHome() {
  const queryParam = useQueryParams()
  const {data} = useFetch<IDashboardMetrics>("/admin/dashboard")
  const {data: activityLog, loading} = useFetch<{data: IActivityLog[], last_page: number;}>(
    "/admin/activity-log",
    {
      date: queryParam.get("period") || "this-month",
      recent: queryParam.get("order") || "most-recent",
      page: queryParam.get("page") || 1,
    }
  )
  const {data: graphData} = useFetch<ILineGraphData>("/admin/line-graph",{
    year: queryParam.get("year") || "2026",
  })
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
                  value: formatNumber(data?.new_users || 0),
                  title: "New Users",
                },
                {
                  icon: investors,
                  bg: "bg-[#3BDC54]",
                  value: formatNumber(data?.investors || 0),
                  title: "Investors",
                },
                {
                  icon: mic,
                  bg: "bg-[#C25589]",
                  value: formatNumber(data?.artists || 0),
                  title: "Artists",
                },
                {
                  icon: medal,
                  bg: "bg-[#1A96F0]",
                  value: formatNumber(data?.celebrities || 0),
                  title: "Celebrities",
                },
                {
                  icon: ranking,
                  bg: "bg-[#FFA61F]",
                  value: formatNumber(data?.contestants || 0),
                  title: "Contestants",
                },
                {
                  icon: studio,
                  bg: "bg-[#702AC8]",
                  value: formatNumber(data?.bookings || 0),
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
              markedByCategory={{ event: ['2025-11-20', '2025-11-22'], booking: ['2025-11-20'] }} 
              categoryColors={{ event: '#FF0000', booking: '#3BDC54' }} 
            />
          </div>
        </div>
        <div className="grid grid-cols-2 max-[1200px]:grid-cols-1 gap-6 my-10">
          <div className="bg-white rounded-[16px] p-5">
            <div className="flex justify-between items-center mb-6">
              <p className="font-semibold text-lg mb-4">Total Revenue</p>
              <Dropdown 
                triggerText={queryParam.get("year") || "2026"} 
                options={[2026,2025,2024].map(year => ({
                  label: year.toString(),
                  value: year.toString(),
                  action: () => queryParam.set("year", year.toString()),
                }))}
              />
            </div>
            <LineChartComponent 
              dataKeys={lineChartDataKeys}
              data={
                graphData?.labels.map((item: string, idx: number)=>({
                  name: item||"--",
                  voting: graphData?.series.voting[idx]||0,
                  artists: graphData?.series.artist[idx]||0,
                  celebrity: graphData?.series.celebrity[idx]||0,
                  investors: graphData?.series.investor[idx]||0,
                  tickets: graphData?.series.ticket[idx]||0,
                })) ?? []
              }
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
            data={activityLog?.data || []}
            totalPages={activityLog?.last_page || 1}
            slot={
              <div className="flex gap-4 items-center">
                <Dropdown 
                  triggerText={tableOrderOptions.find(item => item.value === queryParam.get("order"))?.label || "Most Recent"}
                  options={
                    tableOrderOptions.map(item => ({
                      label: item.label,
                      value: item.value,
                      action: () => queryParam.set("order", item.value),
                    }))
                  } 
                />
                <Dropdown 
                  triggerText={tablePeriodOptions.find(item => item.value === queryParam.get("period"))?.label || "This Month"}
                  options={
                    tablePeriodOptions.map(item => ({
                      label: item.label,
                      value: item.value,
                      action: () => queryParam.set("period", item.value),
                    }))
                  } 
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
                    <p className="whitespace-nowrap">{item.user || "Unknown"}</p>
                  </div>
                ),
              },
              {
                header: "Description",
                view: (item) => <p className="line-clamp-1 max-w-[700px]">{item.description || "---"}</p>,
              },
              {
                header: "Date",
                view: (item) => <span className="whitespace-nowrap">{dayjs(item.created_at).format("DD MMM, YYYY")}</span>,
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
