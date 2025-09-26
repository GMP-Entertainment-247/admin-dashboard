import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { imageProp } from "../../../utils/helpers";
import IndexWrapper from "./components/indexWrapper";
import Tabs from "../../../components/shared/Tabs";

export default function TicketHome () {

    return (
        <IndexWrapper
            title="Tickets"
            buttonText="Create Ticket"
            buttonLink="/rap-battle/create-ticket"
        >
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
                            header: "Title",
                            view: (item) => (
                                <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                                        <img {...imageProp("")} alt="" className="w-full" />
                                    </div>
                                    <p>Grand Finale</p>
                                </div>
                            )
                        },
                        {
                            header: "No. of Tickets",
                            view: (item) => "500"
                        },
                        {
                            header: "Ticket Type",
                            view: (item) => "Regular"
                        },
                        {
                            header: "Amount",
                            view: (item) => "Regular"
                        },
                        {
                            header: "Date",
                            view: (item) => "16/04/25"
                        },
                        {
                            header: "Time",
                            view: (item) => "11:25am"
                        },
                    ]}
                    isPreview
                    seeMoreLink="/rap-battle/tickets/all"
                />
            </div>
        </IndexWrapper>
    )
}