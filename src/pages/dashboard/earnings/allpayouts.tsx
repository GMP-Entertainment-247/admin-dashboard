import Dropdown from "../../../components/shared/Dropdown";
import Table from "../../../components/Table";
import { imageProp } from "../../../utils/helpers";
import edit from "../../../images/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../utils/hooks/useFetch';
import BreadCrumbs from "../../../components/shared/Breadcrumbs";
import dayjs from "dayjs";
import { tableOrderOptions, tablePeriodOptions } from "../../../utils/constant";
import { useQueryParams } from "../../../utils/hooks/useQueryParams";


export default function AllPayouts () {
  const navigate = useNavigate()
  const queryParam = useQueryParams()
  const {data: payouts, loading} = useFetch<{data: any[]}>("/admin/list-earnings",{
    date: queryParam.get("period") || "",
    recent: queryParam.get("order") || "most-recent",
    search: queryParam.get("search") || "",
  })

  return (
    <div>
      <div className="my-2.5">
        <div className="mb-5">
            <BreadCrumbs 
                title="All Payouts"
                links={[
                    {label: "Home", path: "/earnings"}, 
                    {label: "All Payouts"}]}
            />
        </div>
        <Table
            noTitle
            searchPlaceHolder="Search"
            isLoading={loading}
            data={payouts?.data ?? []}
            slot={
                <div className="flex gap-4 items-center">
                  <Dropdown 
                    triggerText={tableOrderOptions.find(item => item.value === queryParam.get("order"))?.label || "Most Recent"}
                    options={
                      tableOrderOptions.map(item => ({
                        label: item.label,
                        value: item.value,
                        action: () => queryParam.set("order", item.value),
                      }))
                    } 
                  />
                  <Dropdown 
                    triggerText={tablePeriodOptions.find(item => item.value === queryParam.get("period"))?.label || "This Month"}
                    options={
                      tablePeriodOptions.map(item => ({
                        label: item.label,
                        value: item.value,
                        action: () => queryParam.set("period", item.value),
                      }))
                    } 
                  />
                </div>
            }
            rows={[
                {
                    header: "Name",
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
                    header: "Description",
                    view: (item) => <span className="lowercase">{item.email}</span>,
                },
                {
                    header: "Amount",
                    view: (item) => <span className="lowercase">{item.email}</span>,
                },
                {
                    header: "Type",
                    view: (item) => item.phone,
                },
                {
                    header: "Status",
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
                            onClick={() => navigate(`/investors/${item.id}`)}
                        />
                    ),
                },
            ]}
        />
      </div>
    </div>
  );
}
