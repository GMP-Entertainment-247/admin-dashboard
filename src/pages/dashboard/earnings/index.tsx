import Card from "../../../components/shared/Card";
import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { formatNumber, imageProp } from "../../../utils/helpers";
import money_change from "../../../images/svg/money_change.svg";
import money from "../../../images/svg/money.svg";
import note from "../../../images/svg/note.svg";
import investments_icon from "../../../images/svg/investments.svg";
import edit from "../../../images/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../utils/hooks/useFetch';
import { useState } from "react";
import BarChartComponent from "../../../components/Charts/BarChart";
import PieChartComponent from "../../../components/Charts/PieChart";
import dayjs from "dayjs";
import { IEarningsMetrics, ILineGraphData, IPieChartData } from "../../../interface/earnings.interface";
import { useQueryParams } from "../../../utils/hooks/useQueryParams";
import { tableOrderOptions, tablePeriodOptions } from "../../../utils/constant";
// import dayjs from "dayjs";


export default function EarningsHome () {
  const navigate = useNavigate()
  const queryParam = useQueryParams()
  const [lineChartDataKeys, setLineChartDataKeys] = useState([
    {label: 'Total Earnings', color: "#998100", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'Revenue', color: "#D7C567", isActive: true, handleChange: handleLineChartDataKeyChange},
  ]);
  const {data: earningsMetrics} = useFetch<IEarningsMetrics>("/admin/earnings-metrics")
  const {data: graphData} = useFetch<ILineGraphData>("/admin/earnings-chart",{
    year: queryParam.get("year") || "2026",
  })
  const {data: chartData} = useFetch<IPieChartData>("/admin/earnings-pie-chart",{
    date: queryParam.get("chartPeriod") || "",
  })
  const {data: payouts, loading} = useFetch<{data: any[]}>("/admin/list-earnings",{
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
                    icon: investments_icon,
                    bg: "bg-[#CE2A53]",
                    value: formatNumber(earningsMetrics?.earnings || 0),
                    title: "Total Earnings",
                },
                {
                    icon: money,
                    bg: "bg-[#181670]",
                    value: formatNumber(earningsMetrics?.revenue || 0),
                    title: "Revenue",
                },
                {
                    icon: money_change,
                    bg: "bg-[#24CC3E]",
                    value: formatNumber(earningsMetrics?.transactions || 0),
                    title: "Transactions",
                },
                {
                    icon: note,
                    bg: "bg-[#702AC8]",
                    value: formatNumber(earningsMetrics?.offers || 0),
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
        <div className="grid grid-cols-2 gap-6 mt-6">
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
                <BarChartComponent 
                    dataKeys={lineChartDataKeys}
                    data={
                        graphData?.labels.map((item: string, idx: number)=>({
                            name: item||"--",
                            Revenue: graphData?.series.revenue[idx]||0,
                            'Total Earnings': graphData?.series.earning[idx]||0,
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
                tableTitle="Payouts"
                searchPlaceHolder="Search"
                isLoading={loading}
                data={payouts?.data ?? []}
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
                        header: "Name",
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
                        view: (item) => <span className="lowercase">{item.email}</span>,
                    },
                    {
                        header: "Amount",
                        view: (item) => <span className="lowercase">{item.email}</span>,
                    },
                    {
                        header: "Type",
                        view: (item) => item.phone,
                    },
                    {
                        header: "Status",
                        view: (item) => item.phone,
                    },
                    {
                        header: "Date",
                        view: (item) => <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>,
                    },
                    {
                        header: "Time",
                        view: (item) => <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>,
                    },
                    {
                        header: "Action",
                        view: (item) => (
                            <img
                                src={edit}
                                alt="edit"
                                className="w-6 ml-4"
                                onClick={() => navigate(`/investors/${item.id}`)}
                            />
                        ),
                    },
                ]}
                isPreview
                seeMoreLink="/earnings/payouts"
            />
        </div>
    </div>
  );
}
