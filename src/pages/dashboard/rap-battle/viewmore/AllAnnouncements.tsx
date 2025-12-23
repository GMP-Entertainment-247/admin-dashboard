import { useSearchParams } from "react-router-dom";
import Dropdown from "../../../../components/shared/Dropdown";
import { Link } from "react-router-dom";
import Tabs from "../../../../components/shared/Tabs";
import Table from "../../../../components/Table";
import { imageProp, splitDateTime } from "../../../../utils/helpers";
import edit from "../../../../images/svg/edit.svg";
import useFetch from "../../../../utils/hooks/useFetch";
import type { AnnouncementListData } from "../../../../interface/announcement.interface";

export default function AllAnnouncements() {
   const [searchParams] = useSearchParams();

   const currentPage = searchParams.get("page") || "1";
   const selectedTab = searchParams.get("tab") || "all";
   const selectedDate = searchParams.get("date") || "";
   const selectedSeason = searchParams.get("season") || "";
   const search = searchParams.get("search") || "";

   const queryParams: Record<string, any> = {
     page: currentPage,
   };

   if (selectedTab && selectedTab !== "all") {
     queryParams.status = selectedTab;
   }

   if (selectedDate && selectedDate !== "all") {
     queryParams.date = selectedDate;
   }

   if (selectedSeason && selectedSeason !== "all") {
     queryParams.season = selectedSeason;
   }

   if (search) {
     queryParams.search = search;
   }

   const { data: announcementList, loading } = useFetch<AnnouncementListData>(
     "/admin/announcement",
     queryParams
   );

   const tableData = announcementList?.data ?? [];
   const totalPages = announcementList?.last_page ?? 1;
  return (
    <div>
      <h2 className="text-[24px] font-semibold mb-3">All Announcements</h2>
      <div>
        <div className="bg-white px-5 py-7 -mb-5 rounded-t-xl">
          <Tabs
            tabs={[
              { label: "All Events", key: "all" },
              { label: "Audition", key: `audition` },
              { label: "Stage 1", key: "stage-1" },
              { label: "Stage 2", key: "stage-2" },
              { label: "Stage 3", key: "stage-3" },
              { label: "Finale", key: "finale" },
            ]}
            // useAsLink
          />
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
                options={[
                  { label: "All", value: "all" },
                  { label: "Today", value: "today" },
                  { label: "This week", value: "this-week" },
                  { label: "This month", value: "this-month" },
                  { label: "This year", value: "this-year" },
                ]}
              />
              <Dropdown
                triggerText="Season 1"
                paramKey="season"
                options={[
                  { label: "All", value: "all" },
                  { label: "Season 1", value: "1" },
                  { label: "Season 2", value: "2" },
                  { label: "Season 3", value: "3" },
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
              view: (item) => {
                const { date, time } = splitDateTime(item.start_date);
                return `${date} ${time}`.trim();
              },
            },
            {
              header: "End",
              view: (item) => {
                const { date, time } = splitDateTime(item.end_date);
                return `${date} ${time}`.trim();
              },
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
        />
      </div>
    </div>
  );
}
