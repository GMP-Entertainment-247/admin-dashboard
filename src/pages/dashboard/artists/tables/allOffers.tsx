import Dropdown from "../../../../components/shared/Dropdown";
import Table from "../../../../components/Table";
import { imageProp } from "../../../../utils/helpers";
import edit from "../../../../images/svg/edit.svg";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from '../../../../utils/hooks/useFetch';
import BreadCrumbs from "../../../../components/shared/Breadcrumbs";
import dayjs from "dayjs";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import { tableOrderOptions, tablePeriodOptions } from "../../../../utils/constant";

export default function AllOffers () {
  const params = useParams()

  return (
    <div>
      <div className="my-2.5">
        <div className="mb-5">
            <BreadCrumbs 
                title="All Offers"
                links={[
                    {label: "Home", path: "/artists"}, 
                    {label: "All Offers"}
                ]}
                backNavigation={`/artists/${params.id}`}
            />
        </div>
        <OffersTable />
      </div>
    </div>
  );
}

export const OffersTable = ({isPreview}:{isPreview?: boolean}) => {
  const navigate = useNavigate()
  const queryParam = useQueryParams()
  const params = useParams()
  const {data, loading} = useFetch<{offers: {data: any[], last_page: number}}>("/admin/artist-offers", {
    id: params.id || "",
    date: queryParam.get("offer-period") || "",
    recent: queryParam.get("offer-order") || "most-recent",
    search: queryParam.get("offer-search") || "",
  })
  
  return (
    <Table
        tableTitle={isPreview ? "Offers":""}
        noTitle={!isPreview}
        searchPlaceHolder="Search any offers"
        isLoading={loading}
        data={data?.offers?.data ?? []}
        totalPages={data?.offers?.last_page || 1}
        searchParamKey="offer-search"
        slot={
            <div className="flex gap-4 items-center">
                <Dropdown 
                    triggerText={tableOrderOptions.find(item => item.value === queryParam.get("offer-order"))?.label || "Most Recent"}
                    options={
                        tableOrderOptions.map(item => ({
                            label: item.label,
                            value: item.value,
                            action: () => queryParam.set("offer-order", item.value),
                        }))
                    } 
                />
                <Dropdown 
                    triggerText={tablePeriodOptions.find(item => item.value === queryParam.get("offer-period"))?.label || "This Month"}
                    options={
                        tablePeriodOptions.map(item => ({
                            label: item.label,
                            value: item.value,
                            action: () => queryParam.set("offer-period", item.value),
                        }))
                    } 
                />
            </div>
        }
        rows={[
        {
            header: "Artist Name",
            view: (item) => (
            <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <img {...imageProp("")} alt="" className="w-full" />
                </div>
                <p>{item.name}</p>
            </div>
            ),
        },
        {
            header: "Music Type",
            view: (item) => <span className="lowercase">{item.email}</span>,
        },
        {
            header: "Amount",
            view: (item) => <span className="lowercase">{item.email}</span>,
        },
        {
            header: "Contract Span",
            view: (item) => item.phone,
        },
        {
            header: "Date",
            view: (item) => <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>,
        },
        {
            header: "Time",
            view: (item) => <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>,
        },
        {
            header: "Action",
            view: (item) => (
            <img
                src={edit}
                alt="edit"
                className="w-6 ml-4"
                onClick={() => navigate(`/artists/${item.id}`)}
            />
            ),
        },
        ]}
        isPreview={isPreview}
        seeMoreLink={`/artists/offers/${params.id}`}
    />
  )
}
