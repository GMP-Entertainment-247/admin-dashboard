import Dropdown from "../../../../components/shared/Dropdown";
import Table from "../../../../components/Table";
import { imageProp } from "../../../../utils/helpers";
import edit from "../../../../images/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../../utils/hooks/useFetch';
import { IFan } from "../../../../interface/fans.interface";
import BreadCrumbs from "../../../../components/shared/Breadcrumbs";


export default function AllCelebrities () {
  const navigate = useNavigate()
  const {data, loading} = useFetch<{data: IFan[]}>("/admin/list-fans")

  return (
    <div>
      <div className="my-2.5">
				<div className="mb-5">
					<BreadCrumbs 
						title="All Celebrities"
						links={[
							{label: "Home", path: "/Celebrities"}, 
							{label: "All Celebrities"}]}
					/>
				</div>
        <Table
          // tableTitle="Artist"
          noTitle
          searchPlaceHolder="Search any artist"
          isLoading={loading}
          data={data?.data ?? []}
          slot={
            <div className="flex gap-4 items-center">
              <Dropdown 
                triggerText="Most Recent" 
                options={[
                  {label: "Most Recent", value: "recent"},
                  {label: "Newest First", value: "newest"},
                  {label: "Oldest First", value: "oldest"},
                  {label: "A-Z", value: "desc"},
                  {label: "Z-A", value: "asc"},
                ]} 
              />
              <Dropdown 
                triggerText="This Month" 
                options={[
                  {label: "Today", value: "today"},
                  {label: "This Week", value: "week"},
                  {label: "This Month", value: "month"},
                  {label: "This Year", value: "year"},
                ]} 
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
              view: (item) => <span className="lowercase">{item.email}</span>,
            },
            {
              header: "Phone Number",
              view: (item) => item.phone,
            },
            // {
            //   header: "Date Joined",
            //   view: (item) => <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>,
            // },
            {
              header: "Action",
              view: (item) => (
                <img
                  src={edit}
                  alt="edit"
                  className="w-6 ml-4"
                  onClick={() => navigate(`/celebrities/${item.id}`)}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
