import Dropdown from "../../../../components/shared/Dropdown";
import Table from "../../../../components/Table";
import useFetch from "../../../../utils/hooks/useFetch";
import type { VoteHistoryItem } from "../../../../interface/votes.interface";
import { useParams } from "react-router-dom";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import {
  tableOrderOptions,
  tablePeriodOptions,
} from "../../../../utils/constant";
import { formatDateMDY, formatNumber } from "../../../../utils/helpers";

export default function AllFanVotes() {
  const { fanId } = useParams<{ fanId: string }>();
  const queryParams = useQueryParams();
  const { data, loading } = useFetch<{
    current_page: number;
    last_page: number;
    data: VoteHistoryItem[];
  }>("/admin/vote-history", {
    id: fanId,
    page: queryParams.get("page") || 1,
    filter: queryParams.get("search") || "",
  });
  return (
    <>
      {/* <h2 className="text-[24px] font-semibold mb-3">All Votes History</h2> */}
      <Table
        tableTitle="All Fan's Votes History"
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
            header: "Atrist",
            view: (item) => item.contestant?.name || "---",
          },
          {
            header: "Votes",
            view: (item) => item.vote || "---",
          },
          {
            header: "Amount",
            view: (item) => formatNumber(Number(item.amount)),
          },
          {
            header: "Date",
            view: (item) =>
              item.created_at ? formatDateMDY(item.created_at) : "---",
          },
        ]}
      />
    </>
  );
}
