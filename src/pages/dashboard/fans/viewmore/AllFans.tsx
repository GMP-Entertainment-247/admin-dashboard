import dayjs from "dayjs";
import Dropdown from "../../../../components/shared/Dropdown";
import Table from "../../../../components/Table";
import edit from "../../../../images/svg/edit.svg";
import { IFan } from "../../../../interface/fans.interface";
import { imageProp } from "../../../../utils/helpers";
import useFetch from "../../../../utils/hooks/useFetch";

export default function AllFans () {
    const {data, loading} = useFetch<{data: IFan[]}>("/admin/list-fans")

    return (
        <div>
            <h2 className="text-[24px] font-semibold mb-3">All Fans</h2>
            <Table 
                tableTitle="Fans"
                searchPlaceHolder="Search any artist"
                isLoading={loading}
                data={data?.data ?? []}
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
                                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                                    <img {...imageProp("")} alt="" className="w-full" />
                                </div>
                                <p>{item.name}</p>
                            </div>
                        )
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
                        header: "Date Joined",
                        view: (item) => <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>,
                    },
                    {
                        header: "Action",
                        view: (item) => <img src={edit} alt="edit" className="w-6 ml-4" />
                    },
                ]}
            />
        </div>
    )
}