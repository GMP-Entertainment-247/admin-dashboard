import Dropdown from "../../../../components/shared/Dropdown";
import Tabs from "../../../../components/shared/Tabs";
import Table from "../../../../components/Table";
import edit from "../../../../images/svg/edit.svg";
import { imageProp } from "../../../../utils/helpers";

export default function AllContestants() {
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
          isLoading={false}
          data={[1, 2, 3, 4, 5, 6]}
          slot={<Dropdown triggerText="Season 1" options={[]} />}
          rows={[
            {
              header: "Names",
              view: (item) => (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img {...imageProp("")} alt="" className="w-full" />
                  </div>
                  <p>John Doe</p>
                </div>
              ),
            },
            {
              header: "Email",
              view: (item) => "johndoe007@gmail.com",
            },
            {
              header: "Phone Number",
              view: (item) => "08101234567",
            },
            {
              header: "Video Link",
              view: (item) => "www.abcgejdgjkded...",
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
