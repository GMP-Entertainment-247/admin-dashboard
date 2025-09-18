import Card from "../../../components/shared/Card";
import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { formatNumber, imageProp } from "../../../utils/helpers";
import user from "../../../images/svg/user.svg";
import money from "../../../images/svg/money.svg";
import ticket from "../../../images/svg/ticket.svg";
import edit from "../../../images/svg/edit.svg";
import { dataRows } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";

export default function FansHome () {
    const navigate = useNavigate()

    return (
        <div>
            <div className="grid grid-cols-4 gap-6">
                {
                    [
                        {
                            icon: user,
                            bg: "bg-[#F6917F]",
                            value: formatNumber(10000),
                            title: "Fans",
                        },
                        {
                            icon: money,
                            bg: "bg-[#181670]",
                            value: formatNumber(10000),
                            title: "Revenue",
                        },
                        {
                            icon: ticket,
                            bg: "bg-[#3BDC54]",
                            value: formatNumber(10000),
                            title: "Tickets",
                        },
                        {
                            icon: money,
                            bg: "bg-[#702AC8]",
                            value: formatNumber(10000),
                            title: "Votes",
                        },
                    ].map((item, idx)=>(
                        <Card 
                            key={idx}
                            icon={item.icon}
                            iconBgColor={item.bg}
                            value={item.value}
                            title={item.title}
                        />
                    ))
                }
            </div>
            <div className="my-10">
                <Table 
                    tableTitle="Fans"
                    searchPlaceHolder="Search any artist"
                    isLoading={false}
                    data={dataRows}
                    slot={
                        <Dropdown 
                            triggerText="This month"
                            options={[]} 
                        />
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
                            view: (item) => item.email
                        },
                        {
                            header: "Phone Number",
                            view: (item) => item.phone
                        },
                        {
                            header: "Date Joined",
                            view: (item) => item.date
                        },
                        {
                            header: "Action",
                            view: (item) => <img src={edit} alt="edit" className="w-6 ml-4" onClick={()=>navigate("/fans/userId")} />
                        },
                    ]}
                    isPreview
                    seeMoreLink="/fans/all"
                />
            </div>
        </div>
    )
}