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

export default function AllUploads () {
  const params = useParams()
  
  return (
    <div>
      <div className="my-2.5">
        <div className="mb-5">
            <BreadCrumbs 
                title="All Uploads"
                links={[
                    {label: "Home", path: "/artists"}, 
                    {label: "All Uploads"}
                ]}
                backNavigation={`/artists/${params.id}`}
            />
        </div>
        <UploadsTable />
      </div>
    </div>
  );
}


export const UploadsTable = ({isPreview}:{isPreview?: boolean}) => {
  const navigate = useNavigate()
  const queryParam = useQueryParams()
  const params = useParams()
  const {data, loading} = useFetch<{uploads: {data: any[], last_page: number}}>("/admin/artist-uploads", {
    id: params.id || "",
    date: queryParam.get("upload-period") || "",
    recent: queryParam.get("upload-order") || "most-recent",
    search: queryParam.get("upload-search") || "",
  })

  return (
        <Table
          tableTitle={isPreview ? "Uploads":""}
          noTitle={!isPreview}
          searchPlaceHolder="Search uploads"
          isLoading={loading}
          data={data?.uploads?.data ?? []}
          totalPages={data?.uploads?.last_page || 1}
          searchParamKey="upload-search"
          slot={
            <div className="flex gap-4 items-center">
                <Dropdown 
                    triggerText={tableOrderOptions.find(item => item.value === queryParam.get("upload-order"))?.label || "Most Recent"}
                    options={
                        tableOrderOptions.map(item => ({
                            label: item.label,
                            value: item.value,
                            action: () => queryParam.set("upload-order", item.value),
                        }))
                    } 
                />
                <Dropdown 
                    triggerText={tablePeriodOptions.find(item => item.value === queryParam.get("upload-period"))?.label || "This Month"}
                    options={
                        tablePeriodOptions.map(item => ({
                            label: item.label,
                            value: item.value,
                            action: () => queryParam.set("upload-period", item.value),
                        }))
                    } 
                />
            </div>
          }
          rows={[
            {
              header: "Title",
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
              header: "Genre",
              view: (item) => <span className="lowercase">{item.email}</span>,
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
                  onClick={() => navigate(`/beats/${item.id}`)}
                />
              ),
            },
          ]}
            isPreview={isPreview}
            seeMoreLink="/artists/uploads"
        />
  )
}