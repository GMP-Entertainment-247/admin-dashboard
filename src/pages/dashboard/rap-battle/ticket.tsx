// import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { formatEventDateTime, formatDateMDY, imageProp, } from "../../../utils/helpers";
import IndexWrapper from "./components/indexWrapper";
import Tabs from "../../../components/shared/Tabs";
import { useQueryParams } from "../../../utils/hooks/useQueryParams";
import useFetch from "../../../utils/hooks/useFetch";
import type { IAuditionStage } from "../../../interface/rapbattle.interface";
import { ITicket } from "../../../interface/tickets.interface";

export default function TicketHome() {
  const queryParams = useQueryParams();
  const { data: auditionStages } = useFetch<IAuditionStage[]>(
    "/admin/audition/list-stages"
  );
  const { data, loading } = useFetch<{ data: ITicket[] }>(
    "/admin/tickets",
    {
      stage: queryParams.get("tab") || "",
      filter: queryParams.get("search") || "",
    }
  );
  const tabOptions = auditionStages?.map((item) => ({
    label: item.name,
    key: item.id.toString(),
  }));
  return (
    <IndexWrapper title="Tickets">
      <div>
        <div className="bg-white px-5 py-7 -mb-5 rounded-t-xl">
          <Tabs
            tabs={[{ label: "All Entries", key: "" }, ...(tabOptions || [])]}
          />
        </div>
        <Table
          noTitle={true}
          searchPlaceHolder="Search..."
          isLoading={loading}
          data={data?.data ?? []}
          // slot={<Dropdown triggerText="Season 1" options={[]} />}
          rows={[
            {
              header: "Event",
              view: (item) => (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      {...imageProp(item.event.image_url)}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <p>{item.event.title}</p>
                </div>
              ),
            },
            {
              header: "No of Tickets",
              view: (item) => 1,
            },
            {
              header: "Event Date",
              view: (item) =>
                `${formatEventDateTime(
                  item.event?.event_start_date
                )} - ${formatEventDateTime(item.event?.event_end_date)}`,
            },
            {
              header: "Order ID",
              view: (item) => item.unique,
            },
            {
              header: "Order Date",
              view: (item) => formatDateMDY(item.created_at),
            },
          ]}
          isPreview
          seeMoreLink="/rap-battle/tickets/all"
        />
      </div>
    </IndexWrapper>
  );
}
