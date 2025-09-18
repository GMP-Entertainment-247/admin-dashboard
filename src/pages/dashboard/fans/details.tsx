import { Modal } from "../../../components/Modal";
import Button from "../../../components/shared/Button";
import Table from "../../../components/Table";
import { dataRows } from "../../../utils/constant";
import { imageProp } from "../../../utils/helpers";
import { useSingleState } from "../../../utils/hooks/useSingleState";


export default function FanDetails () {
    const showModal = useSingleState(false)

    return (
        <div>
            <div className="bg-white rounded-lg flex gap-5 p-6">
                <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden">
                    <img {...imageProp("/images/profile-default.png")} alt="" className="w-full" />
                </div>
                <div className="w-full">
                    <div className="flex gap-2">
                        <p className="text-[24px] font-semibold">John Doe</p>
                        <div className="bg-[#01BA4C1A] w-fit rounded-full py-0.5 px-2.5">
                            <span className="text-[#01BA4C] font-medium text-sm">Active</span>
                        </div>
                    </div>
                    <div className="text-base grid grid-cols-4 gap-5 mt-6">
                        {
                            [
                                {
                                    title: "Email",
                                    value: "johndoe007@gmail.com",
                                },
                                {
                                    title: "Phone Number",
                                    value: "08101234567",
                                },
                                {
                                    title: "Location",
                                    value: "Lagos, Nigeria",
                                },
                                {
                                    title: "Fan Since",
                                    value: "Dec 10, 2020",
                                },
                                {
                                    title: "Favorite Artists",
                                    value: "OG Mazii",
                                },
                                {
                                    title: "Votes Cast",
                                    value: "1,021",
                                },
                                {
                                    title: "Tickets Bought",
                                    value: "1,021",
                                },
                            ].map((item, i)=>(
                                <div key={i}>
                                    <p className="text-[#737373]">{item.title}</p>
                                    <p className="text-[#212121] font-medium">{item.value}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-7 mt-10">
                <Table 
                    tableTitle="Vote History"
                    searchPlaceHolder="Search any artist"
                    isLoading={false}
                    data={dataRows}
                    hideSearch={true}
                    rows={[
                        {
                            header: "Artist",
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
                    isPreview
                    seeMoreLink="/fans/votes"
                />
                <Table 
                    tableTitle="Ticket History"
                    searchPlaceHolder="Search any artist"
                    isLoading={false}
                    data={dataRows}
                    hideSearch={true}
                    rows={[
                        {
                            header: "Event",
                            view: (item) => (
                                <div className="flex gap-2 items-center">
                                    <p>{item.name}</p>
                                </div>
                            )
                        },
                        {
                            header: "No of tickets",
                            view: (item) => <span>2,210</span>
                        },
                        {
                            header: "Date",
                            view: (item) => item.date
                        },
                    ]}
                    isPreview
                    seeMoreLink="/fans/tickets"
                />
            </div>
            <div className="flex justify-end bg-white p-5 rounded-lg mt-5">
                <Button 
                    text="Suspend"
                    extraClassName="rounded-[8px] !font-bold !w-[100px] !min-h-10"
                    onClick={()=>showModal.set(true)}
                />
            </div>
            <Modal
                show={showModal.get}
                onClose={() => {
                    showModal.set(false)
                }}
                submitClick={()=>console.log("submit")}
                submitLoading={false}
            >
                <div className="flex items-center flex-col">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="64" height="64" rx="32" fill="#EB2904"/>
                        <mask id="mask0_1852_36415" maskUnits="userSpaceOnUse" x="15" y="17" width="34" height="30">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32 19.3333L17.3334 44.6666H46.6667L32 19.3333Z" fill="white" stroke="white" stroke-width="4" stroke-linejoin="round"/>
                            <path d="M32 39.3332V39.9998M32 28.6665L32.0053 35.3332" stroke="black" stroke-width="4" stroke-linecap="round"/>
                        </mask>
                        <g mask="url(#mask0_1852_36415)">
                            <path d="M16 16H48V48H16V16Z" fill="#FEFEFE"/>
                        </g>
                    </svg>
                    <p className="text-base font-semibold text-[#212121] mt-4">Suspend</p>
                    <p className="text-sm text-[#595959]">Are you sure you want to suspend this user?</p>
                </div>
            </Modal>
        </div>
    )
}