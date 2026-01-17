import { Link } from "react-router-dom";
import Dropdown from "../../../../components/shared/Dropdown";
import Tabs from "../../../../components/shared/Tabs";
import Table from "../../../../components/Table";
import { imageProp } from "../../../../utils/helpers";
import type { IAuditionStage } from "../../../../interface/rapbattle.interface";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import {
  tableOrderOptions,
  tablePeriodOptions,
} from "../../../../utils/constant";
import useFetch from "../../../../utils/hooks/useFetch";
import type { IVote } from "../../../../interface/votes.interface";
import { ReactComponent as EditIcon } from "../../../../images/svg/edit.svg";

export default function AllRapBattleVotes() {
  const queryParams = useQueryParams();
  const { data: auditionStages } = useFetch<IAuditionStage[]>(
    "/admin/audition/list-stages"
  );
  const { data, loading } = useFetch<{ data: IVote[]; last_page: number }>(
    "/admin/votes",
    {
      stage: queryParams.get("tab") || "",
      page: queryParams.get("page") || 1,
      filter: queryParams.get("search") || "",
    }
  );
  const tabOptions = auditionStages?.map((item) => ({
    label: item.name,
    key: item.id.toString(),
  }));
  return (
    <div>
      <h2 className="text-[24px] font-semibold mb-3">All Votes</h2>
      <div>
        <div className="bg-white px-5 py-7 -mb-5 rounded-t-xl">
          <Tabs
            tabs={[{ label: "All Entries", key: "" }, ...(tabOptions || [])]}
          />
        </div>
        <Table
          noTitle={true}
          searchPlaceHolder="Search any contestant"
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
              header: "Voter’s Name",
              view: (item) => (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      {...imageProp(item.voter.profile_picture_url)}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <p>{item.voter.name}</p>
                </div>
              ),
            },
            {
              header: "Contestant’s Name",
              view: (item) => item.contestant.name,
            },
            {
              header: "No. of Votes",
              view: (item) => item.vote,
            },
            {
              header: "Amount",
              view: (item) => item.amount,
            },
            {
              header: "Action",
              view: (item) => (
                <Link to={`/fans/${item.voter_id}`} title="View">
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
