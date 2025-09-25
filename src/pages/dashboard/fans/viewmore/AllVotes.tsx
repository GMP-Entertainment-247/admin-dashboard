import Dropdown from "../../../../components/shared/Dropdown";
import Table from "../../../../components/Table";
import { dataRows } from "../../../../utils/constant";

export default function AllVotes () {
    return (
        <div>
            <h2 className="text-[24px] font-semibold mb-3">All Votes History</h2>
            <Table 
                tableTitle="Votes History"
                searchPlaceHolder="Search any artist"
                isLoading={false}
                data={dataRows}
                slot={
                    <div className="flex gap-5">
                        <Dropdown 
                            triggerText="Most Recent"
                            options={[]} 
                        />
                        <Dropdown 
                            triggerText="This month"
                            options={[]} 
                        />
                    </div>
                }
                rows={[
                    {
                        header: "Names",
                        view: (item) => (
                            <div className="flex gap-2 items-center">
                                <p>{item.name}</p>
                            </div>
                        )
                    },
                    {
                        header: "No of votes",
                        view: (item) => <span>2,210</span>
                    },
                    {
                        header: "Date",
                        view: (item) => item.date
                    },
                ]}
            />
        </div>
    )
}