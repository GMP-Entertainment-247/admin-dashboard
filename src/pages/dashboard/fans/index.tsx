import Card from "../../../components/shared/Card";
import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { formatNumber, imageProp } from "../../../utils/helpers";
import user from "../../../images/svg/user.svg";
import money from "../../../images/svg/money.svg";
import ticket from "../../../images/svg/ticket.svg";
import { Link } from "react-router-dom";
import useFetch from "../../../utils/hooks/useFetch";
import { IFan } from "../../../interface/fans.interface";
import dayjs from "dayjs";
import { tablePeriodOptions } from "../../../utils/constant";
import { useQueryParams } from "../../../utils/hooks/useQueryParams";
import { ReactComponent as EditIcon } from "../../../images/svg/edit.svg";

export default function FansHome() {
  const queryParams = useQueryParams();
  const { data, loading } = useFetch<{ data: IFan[] }>("/admin/list-fans", {
    filter: queryParams.get("search") || "",
    // date: queryParams.get("period") || "",
  });
  const { data: fansMetrics } = useFetch<{
    votes: number;
    revenue: string;
    fans: number;
    tickets: number;
  }>("/admin/fans-metrics");

  return (
    <>
      <div className="grid grid-cols-4 gap-6 max-[1200px]:grid-cols-3 max-[992px]:grid-cols-2 max-[560px]:grid-cols-1">
        {[
          {
            icon: user,
            bg: "bg-[#F6917F]",
            value: formatNumber(fansMetrics?.fans ?? 0),
            title: "Fans",
          },
          {
            icon: money,
            bg: "bg-[#181670]",
            value: formatNumber(Number(fansMetrics?.revenue ?? 0)),
            title: "Revenue",
          },
          {
            icon: ticket,
            bg: "bg-[#3BDC54]",
            value: formatNumber(fansMetrics?.tickets ?? 0),
            title: "Tickets",
          },
          {
            icon: money,
            bg: "bg-[#702AC8]",
            value: formatNumber(fansMetrics?.votes ?? 0),
            title: "Votes",
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
      <div className="my-10">
        <Table
          tableTitle="Fans"
          searchPlaceHolder="Search any fan"
          isLoading={loading}
          data={data?.data ?? []}
          slot={
            <Dropdown
              triggerText={
                tablePeriodOptions.find(
                  (item) => item.value === queryParams.get("period")
                )?.label || "All"
              }
              options={[
                { label: "All", value: "all" },
                ...tablePeriodOptions,
              ].map((item) => ({
                label: item.label,
                value: item.value,
                action: () => queryParams.set("period", item.value),
              }))}
            />
          }
          rows={[
            {
              header: "Names",
              view: (item) => {
                const rawImage = item.profile_picture_url;
                const displayImageUrl = rawImage
                  ? rawImage.startsWith("/avatars")
                    ? `https://api.gmpentertainment247.com${rawImage}`
                    : rawImage
                  : "/images/profile-default.png";
                return (
                  <div className="flex gap-2 items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        {...imageProp(displayImageUrl)}
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                    <p>{item.name}</p>
                  </div>
                );
              },
            },
            {
              header: "Email",
              view: (item) => <span className="lowercase">{item.email}</span>,
            },
            {
              header: "Phone Number",
              view: (item) => item.phone,
            },
            {
              header: "Date Joined",
              view: (item) => (
                <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>
              ),
            },
            {
              header: "Action",
              view: (item) => (
                <Link to={`/fans/${item.id}`} title="View">
                  <EditIcon className="w-6 ml-4 text-gray-700" />
                </Link>
              ),
            },
          ]}
          isPreview
          seeMoreLink="/fans/all"
        />
      </div>
    </>
  );
}
