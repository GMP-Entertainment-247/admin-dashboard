import Dropdown from "../../../../components/shared/Dropdown";
import Table from "../../../../components/Table";
import useFetch from "../../../../utils/hooks/useFetch";
import { useParams } from "react-router-dom";
import type { TicketHistoryItem } from "../../../../interface/tickets.interface";
import {
  tableOrderOptions,
  tablePeriodOptions,
} from "../../../../utils/constant";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import { formatDateMDY, formatEventDateTime } from "../../../../utils/helpers";

export default function AllFanTickets() {
  const { fanId } = useParams<{ fanId: string }>();
  const queryParams = useQueryParams();
  const { data, loading } = useFetch<{
    current_page: number;
    last_page: number;
    data: TicketHistoryItem[];
  }>("/admin/ticket-history", {
    id: fanId,
    page: queryParams.get("page") || 1,
    filter: queryParams.get("search") || "",
  });
  return (
    <>
      {/* <h2 className="text-[24px] font-semibold mb-3">
        All Fan's Tickets History
      </h2> */}
      <Table
        tableTitle="All Fan's Tickets History"
        searchPlaceHolder="Search..."
        isLoading={loading}
        data={data?.data ?? []}
        totalPages={data?.last_page}
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
            header: "Event",
            view: (item) => item.event?.title || "---",
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
      />
    </>
  );
}
