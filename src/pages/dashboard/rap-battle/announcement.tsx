import { Link } from "react-router-dom";
import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { imageProp, formatDateTime } from "../../../utils/helpers";
import IndexWrapper from "./components/indexWrapper";
// import Tabs from "../../../components/shared/Tabs";
import edit from "../../../images/svg/edit.svg";
import useFetch from "../../../utils/hooks/useFetch";
import type { AnnouncementListData } from "../../../interface/announcement.interface";
import { useSearchParams } from "react-router-dom";

export default function AnnouncementHome() {
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || "1";
  const selectedDate = searchParams.get("date") || "";
  const search = searchParams.get("search") || "";

  const queryParams: Record<string, any> = {
    page: currentPage,
  };

  if (selectedDate && selectedDate !== "all") {
    queryParams.date = selectedDate;
  }

  if (search) {
    queryParams.filter = search;
  }

  const { data: announcementList, loading } = useFetch<AnnouncementListData>(
    "/admin/announcement",
    queryParams
  );

  const tableData = announcementList?.data ?? [];
  const totalPages = announcementList?.last_page ?? 1;

  return (
    <IndexWrapper
      title="Announcement"
      buttonText="Create Announcement"
      buttonLink="create-announcement"
    >
      <div>
        <div className="bg-white px-5 py-2 -mb-5 rounded-t-xl">
        </div>
        <Table
          noTitle={true}
          searchPlaceHolder="Search any announcement"
          isLoading={loading}
          data={tableData}
          totalPages={totalPages}
          slot={
            <div className="flex items-center gap-3">
              <Dropdown triggerText="Most recent" options={[]} />
              <Dropdown
                triggerText="Date"
                paramKey="date"
                options={[
                  { label: "All", value: "all" },
                  { label: "Today", value: "today" },
                  { label: "This week", value: "this-week" },
                  { label: "This month", value: "this-month" },
                  { label: "This year", value: "this-year" },
                ]}
              />
            </div>
          }
          rows={[
            {
              header: "Title",
              view: (item) => (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      {...imageProp(item.image || "")}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <p>{item.title}</p>
                </div>
              ),
            },
            {
              header: "Description",
              view: (item) => {
                return (
                  <span
                    className="line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                );
              },
            },
            {
              header: "Status",
              view: (item) => (item.status === "1" ? "Active" : "Inactive"),
            },
            {
              header: "Start",
              view: (item) => formatDateTime(item.start_date),
            },
            {
              header: "End",
              view: (item) => formatDateTime(item.end_date),
            },
            {
              header: "Action",
              view: (item) => (
                <Link to={String(item.id)} title="View">
                  <img src={edit} alt="edit" className="w-6 ml-4" />
                </Link>
              ),
            },
          ]}
          isPreview
          seeMoreLink="all"
        />
      </div>
    </IndexWrapper>
  );
}
