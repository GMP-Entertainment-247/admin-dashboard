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
import LineChartComponent from "../../../components/Charts/LineChart";
import PieChartComponent from "../../../components/Charts/PieChart";
import { useState } from "react";
import { useQueryParams } from "../../../utils/hooks/useQueryParams";
import { ICelebritiesMetrics, ICelebrity, ILineGraphData, IPieChartData } from "../../../interface/celebrities.interface";
import { tableOrderOptions, tablePeriodOptions } from "../../../utils/constant";


export default function CelebrityHome () {
  const navigate = useNavigate()
  const queryParam = useQueryParams()
  const [lineChartDataKeys, setLineChartDataKeys] = useState([
    {label: 'revenue', color: "#00BF00", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'sessions', color: "#CCAC00", isActive: true, handleChange: handleLineChartDataKeyChange},
  ]);
  const {data: celebMetrics} = useFetch<ICelebritiesMetrics>("/admin/celebrities-metrics")
  const {data: graphData} = useFetch<ILineGraphData>("/admin/celebrities-graph",{
    year: queryParam.get("year") || "2026",
  })
  const {data: chartData} = useFetch<IPieChartData>("/admin/celebrities-pie-chart",{
    date: queryParam.get("chartPeriod") || "",
  })
  const {data, loading} = useFetch<{data: ICelebrity[]}>("/admin/list-celebrities",{
    date: queryParam.get("period") || "",
    recent: queryParam.get("order") || "most-recent",
    search: queryParam.get("search") || "",
  })

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
            value: formatNumber(celebMetrics?.celebrity || 0),
            title: "Celebrity",
          },
          {
            icon: mic,
            bg: "bg-[#F6917F]",
            value: formatNumber(celebMetrics?.sessions || 0),
            title: "Sessions",
          },
          {
            icon: money,
            bg: "bg-[#181670]",
            value: formatNumber(celebMetrics?.revenue || 0),
            title: "Revenue",
          },
          {
            icon: bookmark,
            bg: "bg-[#702AC8]",
            value: formatNumber(celebMetrics?.bookings || 0),
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
                revenue: graphData?.series?.revenue?.[idx]||0,
                sessions: graphData?.series?.session?.[idx]||0,
              })) ?? []
            }
          />
        </div>
        <div className="bg-white rounded-[16px] p-5">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg mb-4">Offers</p>
            <Dropdown 
                triggerText={tablePeriodOptions.find(item => item.value === queryParam.get("chartPeriod"))?.label || "This Month"}
                options={
                  tablePeriodOptions.map(item => ({
                    label: item.label,
                    value: item.value,
                    action: () => queryParam.set("chartPeriod", item.value),
                  }))
                }
            />
          </div>
          <PieChartComponent 
            totalValue={chartData?.Accepted! + chartData?.Pending! + chartData?.Rejected! || 0}
            data={[
              { name: "Accepted", value: chartData?.Accepted || 0, color: "#00CC00" },
              { name: "Pending", value: chartData?.Pending || 0, color: "#FFD700" },
              { name: "Rejected", value: chartData?.Rejected || 0, color: "#FF0000" },
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
              view: (item) => <span>{item.location || "---"}</span>,
            },
            {
              header: "Phone Number",
              view: (item) => item.phone,
            },
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
