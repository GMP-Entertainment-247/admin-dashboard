import { Link } from "react-router-dom";
import PageTitle from "../../../components/shared/PageTitle";
import Button from "../../../components/shared/Button";
import Card from "../../../components/shared/Card";
import { FileUp, SkipForward, FileDown, Bookmark } from "lucide-react";
import { formatNumber } from "../../../utils/helpers";
import Table from "../../../components/Table";
import useFetch from "../../../utils/hooks/useFetch";
import StateContainer from "../../../components/shared/StateContainer";
import type { IBeat, BeatMetrics } from "../../../interface/beats.interface";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { useQueryParams } from "../../../utils/hooks/useQueryParams";
import edit from "../../../images/svg/edit.svg";

const BeatsHome = () => {
  const queryParams = useQueryParams();
  const { data, loading, error } = useFetch<{
    data: IBeat[];
    total: number;
    last_page: number;
  }>("/admin/beats", {
    page: queryParams.get("page") || "1",
    search: queryParams.get("search") || "",
  });
  const { data: beatMetrics } = useFetch<BeatMetrics>("/admin/beats/metrics");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <PageTitle as="h1">Beats</PageTitle>
        <Button
          text="Upload Beat"
          href="upload"
          extraClassName="rounded-[8px] font-bold !w-fit px-5 !min-h-[unset]"
        />
      </div>

      <div className="grid grid-cols-4 gap-6 max-[1200px]:grid-cols-3 max-[992px]:grid-cols-2 max-[560px]:grid-cols-1">
        {[
          {
            icon: <FileUp color="#fff" />,
            bg: "bg-[#F85A7E]",
            value: formatNumber(beatMetrics?.uploads || 0),
            title: "Uploads",
          },
          {
            icon: <SkipForward color="#fff" />,
            bg: "bg-[#181670]",
            value: formatNumber(beatMetrics?.streams || 0),
            title: "Streams",
          },
          {
            icon: <FileDown color="#fff" />,
            bg: "bg-[#00BF00]",
            value: formatNumber(beatMetrics?.downloads || 0),
            title: "Downloads",
          },
          {
            icon: <Bookmark color="#fff" />,
            bg: "bg-[#3B81DC]",
            value: formatNumber(beatMetrics?.saves || 0),
            title: "Saves",
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
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <StateContainer>
          <p className="text-red-600 mb-4">Error loading Beats</p>
          <p className="text-gray-600">
            {error.message || "Something went wrong"}
          </p>
        </StateContainer>
      ) : (
        <Table
          tableTitle="Beats"
          searchPlaceHolder="Search any beat"
          isLoading={loading}
          data={data?.data ?? []}
          rows={[
            {
              header: "Title",
              view: (item) => (
                <div className="flex items-center gap-3">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
              ),
            },
            {
              header: "Description",
              view: (item) => (
                <span className="text-sm text-[#6B6B6B] line-clamp-1">
                  {item.description}
                </span>
              ),
            },
            {
              header: "Genre",
              view: (item) => item.genre || "---",
            },
            {
              header: "Year",
              view: (item) => new Date(item.created_at).getFullYear(),
            },
            {
              header: "Action",
              view: (item) => (
                <Link to={`/beats/${item.id}`} title="View">
                  <img src={edit} alt="edit" className="w-6 ml-4" />
                </Link>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default BeatsHome;
