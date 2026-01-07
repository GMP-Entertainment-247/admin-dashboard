import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { imageProp } from "../../../utils/helpers";
import edit from "../../../images/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../utils/hooks/useFetch';
import BreadCrumbs from "../../../components/shared/Breadcrumbs";
import dayjs from "dayjs";
import { IBooking } from "../../../interface/bookings.interface";
import { useQueryParams } from "../../../utils/hooks/useQueryParams";
import { tableOrderOptions, tablePeriodOptions } from "../../../utils/constant";

export default function AllBookingsPage () {

  return (
    <div>
      <div className="my-2.5">
        <div className="mb-5">
            <BreadCrumbs 
                title="All Bookings"
                links={[
                    {label: "Home", path: "/bookings"}, 
                    {label: "All Bookings"}
                ]}
                backNavigation={`/bookings`}
            />
        </div>
        <BookingsTable />
      </div>
    </div>
  );
}

export const BookingsTable = ({isPreview}:{isPreview?: boolean}) => {
  const navigate = useNavigate()
  const queryParam = useQueryParams()
  const {data, loading} = useFetch<{bookings: {data: IBooking[], last_page: number}}>("/admin/list-bookings", {
    date: queryParam.get("booking-period") || "",
    recent: queryParam.get("booking-order") || "most-recent",
    search: queryParam.get("booking-search") || "",
  })

  return (
    
    <Table
        tableTitle={isPreview ? "Bookings":""}
        noTitle={!isPreview}
        searchPlaceHolder="Search any events, title, organizer"
        isLoading={loading}
        data={data?.bookings?.data ?? []}
        totalPages={data?.bookings?.last_page || 1}
        searchParamKey="booking-search"
        slot={
        <div className="flex gap-4 items-center">
            <Dropdown 
                triggerText={tableOrderOptions.find(item => item.value === queryParam.get("booking-order"))?.label || "Most Recent"}
                options={
                    tableOrderOptions.map(item => ({
                        label: item.label,
                        value: item.value,
                        action: () => queryParam.set("booking-order", item.value),
                    }))
                } 
            />
            <Dropdown 
                triggerText={tablePeriodOptions.find(item => item.value === queryParam.get("booking-period"))?.label || "This Month"}
                options={
                    tablePeriodOptions.map(item => ({
                        label: item.label,
                        value: item.value,
                        action: () => queryParam.set("booking-period", item.value),
                    }))
                } 
            />
        </div>
        }
        rows={[
        {
            header: "Event Title",
            view: (item) => (
            <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <img {...imageProp(item.images?.[0]?.image_url || "")} alt="" className="w-full" />
                </div>
                <p>{item.event}</p>
            </div>
            ),
        },
        {
            header: "Organizer",
            view: (item) => <span>{item.organizer}</span>,
        },
        {
            header: "Guest Artist",
            view: (item) => <span>{item.booked?.name}</span>,
        },
        {
            header: "Location",
            view: (item) => <span>{item.location || "---"}</span>,
        },
        {
            header: "Date",
            view: (item) => <span>{dayjs(item.created_at).format("DD/MM/YY")}</span>,
        },
        {
            header: "Time",
            view: (item) => <span>{dayjs(item.created_at).format("hh:mma")}</span>,
        },
        {
            header: "Action",
            view: (item) => (
            <img
                src={edit}
                alt="edit"
                className="w-6 ml-4"
                onClick={() => navigate(`/bookings/${item.id}`)}
            />
            ),
        },
        ]}
        isPreview={isPreview}
        seeMoreLink={`/bookings/all`}
    />
  )
}
