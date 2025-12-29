import Dropdown from "../../../../components/shared/Dropdown";
import Table from "../../../../components/Table";
import { imageProp } from "../../../../utils/helpers";
import edit from "../../../../images/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../../utils/hooks/useFetch';
import BreadCrumbs from "../../../../components/shared/Breadcrumbs";
import { IArtist } from "../../../../interface/artists.interface";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import { tableOrderOptions, tablePeriodOptions } from "../../../../utils/constant";


export default function AllArtists () {
  const navigate = useNavigate()
  const queryParam = useQueryParams()
  const {data, loading} = useFetch<{data: IArtist[], last_page: number;}>("/admin/list-artists",{
    date: queryParam.get("period") || "",
    recent: queryParam.get("order") || "most-recent",
    search: queryParam.get("search") || "",
    page: queryParam.get("page") || 1,
  })

  return (
    <div>
      <div className="my-2.5">
				<div className="mb-5">
					<BreadCrumbs 
						title="All Artists"
						links={[
							{label: "Home", path: "/artists"}, 
							{label: "All Artists"}]
            }
            backNavigation="/artists"
					/>
				</div>
        <Table
          noTitle
          searchPlaceHolder="Search any artist"
          isLoading={loading}
          data={data?.data ?? []}
          totalPages={data?.last_page || 1}
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
              header: "Email",
              view: (item) => <span className="lowercase">{item.email}</span>,
            },
            {
              header: "Location",
              view: (item) => <span className="lowercase">{item.location}</span>,
            },
            {
              header: "Phone Number",
              view: (item) => item.phone,
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
        />
      </div>
    </div>
  );
}
