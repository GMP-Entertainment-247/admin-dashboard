import Dropdown from "../../../../components/shared/Dropdown";
import Tabs from "../../../../components/shared/Tabs";
import Table from "../../../../components/Table";
import { ReactComponent as EditIcon } from "../../../../images/svg/edit.svg";
import { imageProp } from "../../../../utils/helpers";
import useFetch from "../../../../utils/hooks/useFetch";
import {
  IAudition,
  IAuditionStage,
} from "../../../../interface/rapbattle.interface";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import {
  tablePeriodOptions,
  tableOrderOptions,
} from "../../../../utils/constant";
import { Link } from "react-router-dom";
import PageTitle from "../../../../components/shared/PageTitle";

export default function AllContestants() {
  const queryParams = useQueryParams();
  const { data: auditionStages } = useFetch<IAuditionStage[]>(
    "/admin/audition/list-stages"
  );
  const { data, loading } = useFetch<{ data: IAudition[]; last_page: number }>(
    "/admin/audition/fetch-by-stage",
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
    <>
      <PageTitle as="h1" showBackButton className="my-3">
        All Rap Battles
      </PageTitle>
      <div>
        <div className="bg-white px-5 py-7 -mb-5 rounded-t-xl">
          <Tabs
            tabs={[{ label: "All Entries", key: "" }, ...(tabOptions || [])]}
            // useAsLink
          />
        </div>
        <Table
          noTitle={true}
          totalPages={data?.last_page}
          searchPlaceHolder="Search any contestant"
          isLoading={loading}
          data={data?.data ?? []}
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
              header: "Names",
              view: (item) => (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img {...imageProp("")} alt="" className="w-full" />
                  </div>
                  <p>{item.name}</p>
                </div>
              ),
            },
            {
              header: "Email",
              view: (item) => <span className="lowercase">{item.email}</span>,
            },
            {
              header: "Phone Number",
              view: (item) => item.phone,
            },
            {
              header: "Video Link",
              view: (item) => (
                <div className="max-w-[150px] truncate lowercase">
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.link}
                  </a>
                </div>
              ),
            },
            {
              header: "Action",
              view: (item) => {
                const to = item.user_id
                  ? `/rap-battle/${item.id}?userId=${encodeURIComponent(
                      item.user_id
                    )}`
                  : `/rap-battle/${item.id}`;
                return (
                  <Link
                    to={to}
                    state={!item.user_id ? { audition: item } : undefined}
                    title="View"
                  >
                    <EditIcon className="w-6 ml-4 text-gray-700" />
                  </Link>
                );
              },
            },
          ]}
        />
      </div>
    </>
  );
}
