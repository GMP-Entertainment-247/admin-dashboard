import Dropdown from "../../../../components/shared/Dropdown";
import Tabs from "../../../../components/shared/Tabs";
import Table from "../../../../components/Table";
import edit from "../../../../images/svg/edit.svg";
import { imageProp } from "../../../../utils/helpers";
import useFetch from "../../../../utils/hooks/useFetch";
import { IAudition } from "../../../../interface/rapbattle.interface";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";

export default function AllContestants() {
  const {data, loading} = useFetch<{data: IAudition[]}>("/admin/audition/list")
  const queryParam = useQueryParams()

  return (
    <div>
      <h2 className="page-title mb-3">All Rap Battles</h2>
      <div>
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
          searchPlaceHolder="Search any contestant"
          isLoading={loading}
          data={
              queryParam.get("tab")==="all" ? data?.data ?? []
              : []
          }
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
                  onClick={() => {}}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
