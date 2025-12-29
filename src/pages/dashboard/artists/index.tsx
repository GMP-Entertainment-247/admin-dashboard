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
import { IArtist, IArtistMetrics, ILineGraphData } from "../../../interface/artists.interface";
import { useQueryParams } from "../../../utils/hooks/useQueryParams";
import { tableOrderOptions, tablePeriodOptions } from "../../../utils/constant";


export default function ArtistsHome () {
  const navigate = useNavigate()
  const queryParam = useQueryParams()
  const {data: artistMetrics} = useFetch<IArtistMetrics>("/admin/artists-metrics")
  const {data: graphData} = useFetch<ILineGraphData>("/admin/artists-line-graph",{
    year: queryParam.get("year") || "2026",
  })
  const {data, loading} = useFetch<{data: IArtist[]}>("/admin/list-artists",{
    date: queryParam.get("period") || "",
    recent: queryParam.get("order") || "most-recent",
    search: queryParam.get("search") || "",
  })
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
            value: formatNumber(artistMetrics?.upolads || 0),
            title: "Uploads",
          },
          {
            icon: money,
            bg: "bg-[#181670]",
            value: formatNumber(Number(artistMetrics?.revenue || 0)),
            title: "Revenue",
          },
          {
            icon: mic,
            bg: "bg-[#3BDC54]",
            value: formatNumber(artistMetrics?.artist || 0),
            title: "Artists",
          },
          {
            icon: money,
            bg: "bg-[#702AC8]",
            value: formatNumber(artistMetrics?.offers || 0),
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
                revenue: graphData?.series.revenue[idx]||0,
                uploads: graphData?.series.uploads[idx]||0,
                bookings: graphData?.series.bookings[idx]||0,
              })) ?? []
            }
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
              header: "Artist Name",
              view: (item) => (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img {...imageProp(item.profile_picture_url??"")} alt="" className="w-full" />
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
