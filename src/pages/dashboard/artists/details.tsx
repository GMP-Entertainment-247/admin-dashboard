import clsx from "clsx";
import { Modal } from "../../../components/Modal";
import Button from "../../../components/shared/Button";
import { imageProp } from "../../../utils/helpers";
import { useSingleState } from "../../../utils/hooks/useSingleState";
import { useParams } from "react-router-dom";
import useFetch from "../../../utils/hooks/useFetch";
import { OffersTable } from "./tables/allOffers";
import { BookingsTable } from "./tables/allBookings";
import { UploadsTable } from "./tables/allUploads";
import { IArtistDetails } from "../../../interface/artists.interface";
import dayjs from "dayjs";


export default function ArtistDetails () {
    const showModal = useSingleState(false)
    const params = useParams()

    const {data} = useFetch<IArtistDetails>(
        "/admin/artist-details",{
            id: params.id || ""
        }
    )
    const {data: bookingsData} = useFetch<any>(
        "/admin/artist-bookings",{
            id: params.id || ""
        }
    )
    const {data: offersData} = useFetch<any>(
        "/admin/artist-offers",{
            id: params.id || ""
        }
    )
    const {data: uploadsData} = useFetch<any>(
        "/admin/artist-uploads",{
            id: params.id || ""
        }
    )
    console.log(bookingsData, offersData, uploadsData)

    return (
        <div>
            <div className="bg-white rounded-lg flex gap-5 p-6 max-[1200px]:block">
                <div className="w-[100px] h-[100px] border border-[#E6E6E6] shrink-0 rounded-full flex items-center justify-center overflow-hidden">
                    <img {...imageProp(data?.profile_picture_url || "/images/profile-default.png")} alt="" className="w-full" />
                </div>
                <div className="w-full">
                    <div className="flex gap-2 flex-wrap">
                        <p className="text-[24px] font-semibold capitalize">{data?.name || ""}</p>
                        <div 
                            className={clsx(
                                "w-fit rounded-full py-0.5 px-2.5",
                                data?.is_online==="1" ? "bg-[#01BA4C1A]" : "bg-[#0000001A]"
                            )}
                        >
                            <span 
                                className={clsx(
                                    "font-medium text-sm",
                                    data?.is_online==="1" ? "text-[#01BA4C]" : "text-[#000]"
                                )}
                            >
                                {data?.is_online==="1" ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>
                    <div className="text-base grid grid-cols-4 gap-5 mt-6 max-[1400px]:grid-cols-3 max-[992px]:grid-cols-2 max-[560px]:grid-cols-1">
                        {
                            [
                                {
                                    title: "Email",
                                    value: data?.email || "---",
                                },
                                {
                                    title: "Phone Number",
                                    value: data?.phone || "---",
                                },
                                {
                                    title: "Location",
                                    value: data?.location || "---",
                                },
                                {
                                    title: "Member Since",
                                    value: dayjs(data?.created_at).format("MMM DD, YYYY") || "---",
                                },
                                {
                                    title: "Hourly Rate",
                                    value: data?.hourly_rate || "---",
                                },
                                {
                                    title: "Status",
                                    value: !!data?.email_verified_at ? "Verified" : "Unverified",
                                },
                            ].map((item, i)=>(
                                <div 
                                    key={i}
                                >
                                    <p className="text-[#737373]">{item.title}</p>
                                    <p className="text-[#212121] font-medium">{item.value}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-7 mt-10">
                <OffersTable isPreview={true} />
                <BookingsTable isPreview={true} />
                <UploadsTable isPreview={true} />
            </div>
            <div className="flex justify-end gap-3 bg-white p-5 rounded-lg mt-5">
                <Button 
                    text="Suspend"
                    extraClassName={clsx(
                        "rounded-[8px] !font-bold !w-[100px] !min-h-10 !text-[#EB2904] !bg-[#FFE5E5]"
                    )}
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