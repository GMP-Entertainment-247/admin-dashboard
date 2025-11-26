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
import { IFan } from "../../../interface/fans.interface";
import { useState } from "react";
import BarChartComponent from "../../../components/Charts/BarChart";
// import dayjs from "dayjs";


export default function InvestorsHome () {
  const navigate = useNavigate()
  const {data, loading} = useFetch<{data: IFan[]}>("/admin/list-fans")
  const [lineChartDataKeys, setLineChartDataKeys] = useState([
    {label: 'investment', color: "#998100", isActive: true, handleChange: handleLineChartDataKeyChange},
    {label: 'revenue', color: "#D7C567", isActive: true, handleChange: handleLineChartDataKeyChange},
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
			<div className="grid gap-6 grid-cols-7">
				<div className="col-span-5">
					<div className="grid grid-cols-3 gap-6 max-[1200px]:grid-cols-3 max-[992px]:grid-cols-2 max-[560px]:grid-cols-1">
						{[
							{
								icon: investors_icon,
								bg: "bg-[#3BDC54]",
								value: formatNumber(10000),
								title: "Investors",
							},
							{
								icon: money,
								bg: "bg-[#F85A7E]",
								value: formatNumber(10000),
								title: "Revenue",
							},
							{
								icon: investments_icon,
								bg: "bg-[#FF0000]",
								value: formatNumber(10000),
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
								triggerText="This Month" 
								options={[]} 
							/>
						</div>
						<BarChartComponent 
							dataKeys={lineChartDataKeys}
							data={[
								{
									name: 'Jan',
									revenue: 40,
									investment: 24,
								},
								{
									name: 'Feb',
									revenue: 30,
									investment: 10,
								},
								{
									name: 'Mar',
									revenue: 20,
									investment: 20,
								},
								{
									name: 'Apr',
									revenue: 20,
									investment: 20,
								},
								{
									name: 'May',
									revenue: 10,
									investment: 21,
								},
								{
									name: 'Jun',
									revenue: 23,
									investment: 25,
								},
								{
									name: 'Jul',
									revenue: 34,
									investment: 21,
								},
								{
									name: 'Aug',
									revenue: 34,
									investment: 21,
								},
								{
									name: 'Sep',
									revenue: 34,
									investment: 21,
								},
								{
									name: 'Oct',
									revenue: 34,
									investment: 21,
								},
								{
									name: 'Nov',
									revenue: 34,
									investment: 21,
								},
								{
									name: 'Dec',
									revenue: 34,
									investment: 21,
								},
							]}
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
