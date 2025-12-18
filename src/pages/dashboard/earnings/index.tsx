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
import { IFan } from "../../../interface/fans.interface";
import { useState } from "react";
import BarChartComponent from "../../../components/Charts/BarChart";
import PieChartComponent from "../../../components/Charts/PieChart";
import dayjs from "dayjs";
// import dayjs from "dayjs";


export default function EarningsHome () {
  const navigate = useNavigate()
  const {data, loading} = useFetch<{data: IFan[]}>("/admin/list-fans")
  const [lineChartDataKeys, setLineChartDataKeys] = useState([
    {label: 'Total Earnings', color: "#998100", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'Revenue', color: "#D7C567", isActive: true, handleChange: handleLineChartDataKeyChange},
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
                    icon: investments_icon,
                    bg: "bg-[#CE2A53]",
                    value: formatNumber(10000),
                    title: "Total Earnings",
                },
                {
                    icon: money,
                    bg: "bg-[#181670]",
                    value: formatNumber(10000),
                    title: "Revenue",
                },
                {
                    icon: money_change,
                    bg: "bg-[#24CC3E]",
                    value: formatNumber(10000),
                    title: "Transactions",
                },
                {
                    icon: note,
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
        <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-[16px] p-5">
                <div className="flex justify-between items-center mb-6">
                    <p className="font-semibold text-lg mb-4">Earnings</p>
                    <Dropdown 
                        triggerText="This Month" 
                        options={[]} 
                    />
                </div>
                <BarChartComponent 
                    dataKeys={lineChartDataKeys}
                    data={[
                        {
                            name: 'Jan',
                            Revenue: 40,
                            'Total Earnings': 24,
                        },
                        {
                            name: 'Feb',
                            Revenue: 30,
                            'Total Earnings': 10,
                        },
                        {
                            name: 'Mar',
                            Revenue: 20,
                            'Total Earnings': 20,
                        },
                        {
                            name: 'Apr',
                            Revenue: 20,
                            'Total Earnings': 20,
                        },
                        {
                            name: 'May',
                            Revenue: 10,
                            'Total Earnings': 21,
                        },
                        {
                            name: 'Jun',
                            Revenue: 23,
                            'Total Earnings': 25,
                        },
                        {
                            name: 'Jul',
                            Revenue: 34,
                            'Total Earnings': 21,
                        },
                        {
                            name: 'Aug',
                            Revenue: 34,
                            'Total Earnings': 21,
                        },
                        {
                            name: 'Sep',
                            Revenue: 34,
                            'Total Earnings': 21,
                        },
                        {
                            name: 'Oct',
                            Revenue: 34,
                            'Total Earnings': 21,
                        },
                        {
                            name: 'Nov',
                            Revenue: 34,
                            'Total Earnings': 21,
                        },
                        {
                            name: 'Dec',
                            Revenue: 34,
                            'Total Earnings': 21,
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
                tableTitle="Payouts"
                searchPlaceHolder="Search"
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
