import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../components/shared/Breadcrumbs";
import useFetch from "../../../utils/hooks/useFetch";
import { IBooking } from "../../../interface/bookings.interface";
import location from "../../../images/svg/booking/location.svg";
import calendar from "../../../images/svg/booking/calendar.svg";
import message from "../../../images/svg/booking/message.svg";
import call from "../../../images/svg/booking/call.svg";

export default function BookingDetails () {
    const params = useParams()

    const {data} = useFetch<{bookings: IBooking}>(
        "/admin/booking-details",{
            booking_id: params.bookingId || ""
        }
    )

    console.log(data)

    return (
        <div>
            <div className="my-2.5">
                <div className="mb-5">
                    <BreadCrumbs 
                        title="Booking Details"
                        links={[
                            {label: "Home", path: "/bookings"}, 
                            {label: "Booking Details"}
                        ]}
                    />
                </div>
                <div className="mt-6 bg-white rounded-lg p-10 flex gap-10">
                    <div className="w-full">
                        <p className="text-2xl font-semibold">{data?.bookings?.event}</p>
                        <p className="mt-6">{data?.bookings?.description}</p>
                    </div>
                    <div className="w-[450px] flex flex-col gap-6">
                        <img src={data?.bookings?.images?.[0]?.image_url} alt="booking" />
                        <div className="flex items-center gap-2">
                            <img src={location} alt="booking" className="w-12 h-12" />
                            <div>
                                <p className="text-sm font-medium">The Palms Mall</p>
                                <p className="text-xs text-[#484848]">Ikeja Lagos State, Nigeria</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={calendar} alt="booking" className="w-12 h-12" />
                            <div>
                                <p className="text-sm font-medium">9PM</p>
                                <p className="text-xs text-[#484848]">July 25, 2025</p>
                            </div>
                        </div>
                        <hr className="bg-[#E9E9E9]"/>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-[#F6F1D5]" />
                                <div>
                                    <p className="text-sm font-medium">{data?.bookings?.organizer}</p>
                                    <p className="text-xs text-[#484848]">Event Admin</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={message} alt="message" className="w-8 h-8" />
                                <img src={call} alt="call" className="w-8 h-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}