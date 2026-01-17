// import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { imageProp, splitDateTime, formatDateMDY, formatTime12Hour } from "../../../utils/helpers";
import IndexWrapper from "./components/indexWrapper";
import Tabs from "../../../components/shared/Tabs";
import { Link } from "react-router-dom";
import { ReactComponent as EditIcon } from "../../../images/svg/edit.svg";
import useFetch from "../../../utils/hooks/useFetch";
import type { Event } from "../../../interface/events.interface";

export default function LivestreamHome() {
  const { data, loading } = useFetch<{
    data: Event[]
  }>("/admin/events/list");
  return (
    <IndexWrapper
      title="Livestream"
      buttonText="Create Event"
      buttonLink="create-event"
    >
      <div className="bg-white px-5 py-7 -mb-5 rounded-t-xl">
        <Tabs
          tabs={[
            { label: "All Entries", key: "all" },
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
        searchPlaceHolder="Search any event"
        isLoading={loading}
        data={data?.data?.slice(0, 6) ?? []}
        // slot={<Dropdown triggerText="Season 1" options={[]} />}
        rows={[
          {
            header: "Title",
            view: (item) => (
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                  <img {...imageProp(item.image_url)} alt="" className="w-full h-full" />
                </div>
                <p>{item.title}</p>
              </div>
            ),
          },
          {
            header: "Venue",
            view: (item) => item.venue || "---",
          },
          {
            header: "Location",
            view: (item) => item.location || "---",
          },
          {
            header: "Date",
            view: (item) => {
              const { date } = splitDateTime(item.event_start_date);
              return formatDateMDY(date);
            },
          },
          {
            header: "Time",
            view: (item) => {
              const { time } = splitDateTime(item.event_start_date);
              return <span className="lowercase">{formatTime12Hour(time)}</span>;
            },
          },
          {
            header: "Tickets Left",
            view: (item) => item.ticket_left || "0",
          },
          {
            header: "Action",
            view: (item) => (
              <Link to={`/rap-battle/livestream/${item.id}`} title="View">
                <EditIcon className="w-6 ml-4 text-gray-700" />
              </Link>
            ),
          },
        ]}
        isPreview
        seeMoreLink="/rap-battle/livestream/all"
      />
    </IndexWrapper>
  );
}
