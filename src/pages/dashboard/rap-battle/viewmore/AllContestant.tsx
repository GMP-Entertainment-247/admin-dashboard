import Dropdown from "../../../../components/shared/Dropdown";
import Tabs from "../../../../components/shared/Tabs";
import Table from "../../../../components/Table";
import edit from "../../../../images/svg/edit.svg";
import { imageProp } from "../../../../utils/helpers";
import useFetch from "../../../../utils/hooks/useFetch";
import { IAudition, IAuditionStage } from "../../../../interface/rapbattle.interface";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import { useNavigate } from "react-router-dom";

export default function AllContestants() {
  // const {data, loading} = useFetch<{data: IAudition[]}>("/admin/audition/list")
  const queryParam = useQueryParams()
  const {data: auditionStages} = useFetch<IAuditionStage[]>("/admin/audition/list-stages")
  const {data, loading} = useFetch<{data: IAudition[], last_page: number;}>(
      "/admin/audition/fetch-by-stage",{
          stage: queryParam.get("tab") || ""
      }
  )
  const tabOptions = auditionStages?.map(item => ({
      label: item.name,
      key: item.id.toString(),
  }))
  const navigate = useNavigate()

  return (
    <div>
      <h2 className="page-title mb-3">All Rap Battles</h2>
      <div>
        <div className="bg-white px-5 py-7 -mb-5 rounded-t-xl">
          <Tabs
            tabs={[
                { label: "All Entries", key: "" },
                ...(tabOptions || []),
            ]}
            // useAsLink
          />
        </div>
        <Table
          noTitle={true}
          searchPlaceHolder="Search any contestant"
          isLoading={loading}
          data={data?.data ?? []}
          slot={<Dropdown triggerText="Season 1" options={[]} />}
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
              view: (item) => item.phone
            },
            {
              header: "Video Link",
              view: (item) => (
                <div className="max-w-[150px] truncate lowercase">
                  <a href={item.link} target="_blank" rel="noreferrer">{item.link}</a>
                </div>
              )
            },
            {
              header: "Action",
              view: (item) => (
                <img
                  src={edit}
                  alt="edit"
                  className="w-6 ml-4"
                  onClick={() => navigate(`/rap-battle/user/${item.id}`)}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
