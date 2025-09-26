import Dropdown from "../../../../components/shared/Dropdown";
import Tabs from "../../../../components/shared/Tabs";
import Table from "../../../../components/Table";
import { imageProp } from "../../../../utils/helpers";

export default function AllRapBattleVotes () {
    return (
        <div>
            <h2 className="text-[24px] font-semibold mb-3">All Votes</h2>
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
                    data={[1,2,3,4,5,6]}
                    slot={
                        <Dropdown 
                            triggerText="Season 1"
                            options={[]} 
                        />
                    }
                    rows={[
                        {
                            header: "Voter’s Name",
                            view: (item) => (
                                <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                                        <img {...imageProp("")} alt="" className="w-full" />
                                    </div>
                                    <p>John Doe</p>
                                </div>
                            )
                        },
                        {
                            header: "Contestant’s Name",
                            view: (item) => "Tobilola Tunde"
                        },
                        {
                            header: "No. of Votes",
                            view: (item) => "500"
                        },
                        {
                            header: "Amount",
                            view: (item) => "₦100,000"
                        },
                    ]}
                />
            </div>
        </div>
    )
}