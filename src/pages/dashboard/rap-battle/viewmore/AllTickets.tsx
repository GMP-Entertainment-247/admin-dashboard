// import Dropdown from "../../../../components/shared/Dropdown";
import Tabs from "../../../../components/shared/Tabs";
import Table from "../../../../components/Table";
import type { IAuditionStage } from "../../../../interface/rapbattle.interface";
import { formatDateMDY, formatEventDateTime, imageProp } from "../../../../utils/helpers";
import useFetch from "../../../../utils/hooks/useFetch";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import type { ITicket } from "../../../../interface/tickets.interface";

export default function AllRapBattleTickets() {
    const queryParams = useQueryParams();
    const { data: auditionStages } = useFetch<IAuditionStage[]>(
        "/admin/audition/list-stages"
    );
    const { data, loading } = useFetch<{ data: ITicket[]; last_page: number }>(
        "/admin/tickets",
        {
            stage: queryParams.get("tab") || "",
            filter: queryParams.get("search") || "",
            page: queryParams.get("page") ?? 1
        }
    );
    const tabOptions = auditionStages?.map((item) => ({
        label: item.name,
        key: item.id.toString(),
    }));
    return (
        <div>
            <h2 className="text-[24px] font-semibold mb-3">All Tickets</h2>
            <div>
                <div className="bg-white px-5 py-7 -mb-5 rounded-t-xl">
                    <Tabs
                        tabs={[{ label: "All Entries", key: "" }, ...(tabOptions || [])]}
                    />
                </div>
                <Table
                    noTitle={true}
                    searchPlaceHolder="Search..."
                    isLoading={loading}
                    data={data?.data ?? []}
                    totalPages={data?.last_page}
                    // slot={
                    //     <Dropdown
                    //         triggerText="Season 1"
                    //         options={[]}
                    //     />
                    // }
                    rows={[
                        {
                            header: "Event",
                            view: (item) => (
                                <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                                        <img
                                            {...imageProp(item.event.image_url)}
                                            alt=""
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <p>{item.event.title}</p>
                                </div>
                            ),
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
            </div>
        </div>
    )
}