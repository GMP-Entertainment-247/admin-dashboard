import Card from "../../../components/shared/Card";
import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { formatNumber, imageProp } from "../../../utils/helpers";
import investors_icon from "../../../images/svg/investors.svg";
import money from "../../../images/svg/money.svg";
import investments_icon from "../../../images/svg/investments.svg";
import edit from "../../../images/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../utils/hooks/useFetch';
import { useState } from "react";
import BarChartComponent from "../../../components/Charts/BarChart";
import { IInvestorsChart, IInvestorsMetrics } from "../../../interface/investors.interface";
import { useQueryParams } from "../../../utils/hooks/useQueryParams";
// import dayjs from "dayjs";


export default function InvestorsHome () {
  const navigate = useNavigate()
  const queryParam = useQueryParams()
  const [lineChartDataKeys, setLineChartDataKeys] = useState([
    {label: 'investment', color: "#998100", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'revenue', color: "#D7C567", isActive: true, handleChange: handleLineChartDataKeyChange},
  ]);
  const {data: invMetrics} = useFetch<IInvestorsMetrics>("/admin/investors-metrics")
  const {data: graphData} = useFetch<IInvestorsChart>("/admin/investors-chart",{
    year: queryParam.get("year") || "2026",
  })
  const {data, loading} = useFetch<{data: any[]}>("/admin/list-investors",{
    date: queryParam.get("period") || "",
    recent: queryParam.get("order") || "most-recent",
    search: queryParam.get("search") || "",
  })

  console.log(data)

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
			<div className="grid gap-6 grid-cols-7">
				<div className="col-span-5">
					<div className="grid grid-cols-3 gap-6 max-[1200px]:grid-cols-3 max-[992px]:grid-cols-2 max-[560px]:grid-cols-1">
						{[
							{
								icon: investors_icon,
								bg: "bg-[#3BDC54]",
								value: formatNumber(invMetrics?.investors || 0),
								title: "Investors",
							},
							{
								icon: money,
								bg: "bg-[#F85A7E]",
								value: formatNumber(invMetrics?.revenue || 0),
								title: "Revenue",
							},
							{
								icon: investments_icon,
								bg: "bg-[#FF0000]",
								value: formatNumber(invMetrics?.investment || 0),
								title: "Investment",
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
					<div className="bg-white rounded-[16px] p-5 mt-6">
						<div className="flex justify-between items-center mb-6">
							<p className="font-semibold text-lg mb-4">Investments</p>
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
								revenue: graphData?.series.revenue[idx]||0,
								investment: graphData?.series.investment[idx]||0,
							  })) ?? []
							}
						/>
					</div>
				</div>
				<div className="col-span-2">
					<Table
						tableTitle="Ranking"
						hideSearch
						isLoading={loading}
						data={data?.data ?? []}
						rows={[
							{
								header: "S/N",
								view: (item) => <p className="w-8 text-center">1</p>,
							},
							{
								header: "Investor",
								view: (item) => (
									<div className="flex gap-2 items-center my-[3px]">
										{/* <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
											<img {...imageProp("")} alt="" className="w-full" />
										</div> */}
										<p>{item.name}</p>
									</div>
								),
							},
							{
								header: "Revenue",
								view: (item) => <span>N60,000</span>,
							},
						]}
					/>
				</div>
			</div>
      <div className="my-10">
        <Table
          tableTitle="Investors"
          searchPlaceHolder="Search any investor"
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
              header: "Investor Name",
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
                  onClick={() => navigate(`/investors/${item.id}`)}
                />
              ),
            },
          ]}
          isPreview
          seeMoreLink="/investors/investments"
        />
      </div>
    </div>
  );
}
