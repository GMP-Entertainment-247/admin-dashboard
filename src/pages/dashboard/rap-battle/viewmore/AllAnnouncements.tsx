import Dropdown from "../../../../components/shared/Dropdown";
import { Link } from "react-router-dom";
import Table from "../../../../components/Table";
import { imageProp, formatEventDateTime } from "../../../../utils/helpers";
import { ReactComponent as EditIcon } from "../../../../images/svg/edit.svg";
import useFetch from "../../../../utils/hooks/useFetch";
import type { AnnouncementListData } from "../../../../interface/announcement.interface";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import {
  tablePeriodOptions,
  tableOrderOptions,
} from "../../../../utils/constant";
import PageTitle from "../../../../components/shared/PageTitle";

export default function AllAnnouncements() {
  const queryParams = useQueryParams();

  const { data: announcementList, loading } = useFetch<AnnouncementListData>(
    "/admin/announcement",
    {
      page: queryParams.get("page") || "1",
      filter: queryParams.get("search") || "",
      date: queryParams.get("period") || "this-month",
      recent: queryParams.get("order") || "most-recent",
    }
  );
  return (
    <div>
      <PageTitle as="h1" showBackButton className="my-3">
        All Announcements
      </PageTitle>
      <div>
        <div className="bg-white px-5 py-2 -mb-5 rounded-t-xl" />
        <Table
          noTitle={true}
          searchPlaceHolder="Search any announcement"
          isLoading={loading}
          data={announcementList?.data ?? []}
          totalPages={announcementList?.last_page ?? 1}
          slot={
            <div className="flex items-center gap-3">
              <Dropdown
                triggerText={
                  tableOrderOptions.find(
                    (item) => item.value === queryParams.get("order")
                  )?.label || "Most Recent"
                }
                options={tableOrderOptions.map((item) => ({
                  label: item.label,
                  value: item.value,
                  action: () => queryParams.set("order", item.value),
                }))}
              />
              <Dropdown
                triggerText={
                  tablePeriodOptions.find(
                    (item) => item.value === queryParams.get("period")
                  )?.label || "This Month"
                }
                options={tablePeriodOptions.map((item) => ({
                  label: item.label,
                  value: item.value,
                  action: () => queryParams.set("period", item.value),
                }))}
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
              view: (item) => formatEventDateTime(item.start_date),
            },
            {
              header: "End",
              view: (item) => formatEventDateTime(item.end_date),
            },
            {
              header: "Action",
              view: (item) => (
                <Link to={`/rap-battle/announcement/${item.id}`} title="View">
                  <EditIcon className="w-6 ml-4 text-gray-700" />
                </Link>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
