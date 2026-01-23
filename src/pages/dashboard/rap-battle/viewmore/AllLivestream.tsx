// import Dropdown from "../../../../components/shared/Dropdown";
import Tabs from "../../../../components/shared/Tabs";
import Table from "../../../../components/Table";
import {
  imageProp,
  splitDateTime,
  formatDateMDY,
  formatTime12Hour,
} from "../../../../utils/helpers";
import { Link } from "react-router-dom";
import { ReactComponent as EditIcon } from "../../../../images/svg/edit.svg";
import useFetch from "../../../../utils/hooks/useFetch";
import type { Event } from "../../../../interface/events.interface";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import type { IAuditionStage } from "../../../../interface/rapbattle.interface";
import PageTitle from "../../../../components/shared/PageTitle";

export default function AllLivestreams() {
  const queryParams = useQueryParams();
  const { data: auditionStages } = useFetch<IAuditionStage[]>(
    "/admin/audition/list-stages"
  );
  const { data, loading } = useFetch<{
    data: Event[];
    current_page: number;
    last_page: number;
  }>("/admin/events/list", {
    stage: queryParams.get("tab") !== "all" ? queryParams.get("tab") : "",
    filter: queryParams.get("search") || "",
    page: queryParams.get("page") ?? 1,
  });
  const tabOptions = auditionStages?.map((item) => ({
    label: item.name,
    key: item.id.toString(),
  }));
  return (
    <div>
      <PageTitle as="h1" showBackButton className="my-3">
        All Livestreams
      </PageTitle>
      <div>
        <div className="bg-white px-5 py-7 -mb-5 rounded-t-xl">
          <Tabs
            tabs={[{ label: "All Entries", key: "" }, ...(tabOptions || [])]}
          />
        </div>
        <Table
          noTitle={true}
          searchPlaceHolder="Search any event"
          isLoading={loading}
          data={data?.data ?? []}
          totalPages={data?.last_page}
          // slot={<Dropdown triggerText="Season 1" options={[]} />}
          rows={[
            {
              header: "Title",
              view: (item: Event) => (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      {...imageProp(item.image_url)}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <p>{item.title}</p>
                </div>
              ),
            },
            {
              header: "Venue",
              view: (item: Event) => item.venue || "---",
            },
            {
              header: "Location",
              view: (item: Event) => item.location || "---",
            },
            {
              header: "Date",
              view: (item: Event) => {
                const { date } = splitDateTime(item.event_start_date);
                return formatDateMDY(date);
              },
            },
            {
              header: "Time",
              view: (item: Event) => {
                const { time } = splitDateTime(item.event_start_date);
                return formatTime12Hour(time);
              },
            },
            {
              header: "Tickets Left",
              view: (item: Event) => item.ticket_left || "0",
            },
            {
              header: "Action",
              view: (item: Event) => (
                <Link to={`/rap-battle/livestream/${item.id}`} title="View">
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
