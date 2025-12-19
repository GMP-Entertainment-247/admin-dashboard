import Dropdown from "../../../../components/shared/Dropdown";
import { Link } from "react-router-dom";
import Tabs from "../../../../components/shared/Tabs";
import Table from "../../../../components/Table";
import { imageProp } from "../../../../utils/helpers";
import edit from "../../../../images/svg/edit.svg";
import { mockAnnouncements } from "../announcements/data";

export default function AllAnnouncements() {
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
          searchPlaceHolder="Search any contestant"
          isLoading={false}
          data={mockAnnouncements}
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
              <Dropdown triggerText="Season 1" options={[]} />
            </div>
          }
          rows={[
            {
              header: "Title",
              view: (item) => (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img {...imageProp("")} alt="" className="w-full" />
                  </div>
                  <p>{item.title}</p>
                </div>
              ),
            },
            {
              header: "Description",
              view: (item) => (
                <span className="line-clamp-1">{item.description}</span>
              ),
            },
            {
              header: "Status",
              view: (item) => item.status,
            },
            {
              header: "Start",
              view: (item) => `${item.startTime} ${item.startDate}`,
            },
            {
              header: "End",
              view: (item) => `${item.endTime} ${item.endDate}`,
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
