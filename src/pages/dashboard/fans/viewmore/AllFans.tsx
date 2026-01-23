import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Dropdown from "../../../../components/shared/Dropdown";
import Table from "../../../../components/Table";
import { ReactComponent as EditIcon } from "../../../../images/svg/edit.svg";
import { IFan } from "../../../../interface/fans.interface";
import { imageProp } from "../../../../utils/helpers";
import useFetch from "../../../../utils/hooks/useFetch";
import { useQueryParams } from "../../../../utils/hooks/useQueryParams";
import { tablePeriodOptions } from "../../../../utils/constant";
import PageTitle from "../../../../components/shared/PageTitle";

export default function AllFans() {
  const queryParams = useQueryParams();
  const { data, loading } = useFetch<{ data: IFan[]; last_page: number }>(
    "/admin/list-fans",
    {
      page: queryParams.get("page") || 1,
      filter: queryParams.get("search") || "",
      // date: queryParams.get("period") || "",
    }
  );

  return (
    <>
      <PageTitle as="h1" showBackButton className="my-3">
        All Fans
      </PageTitle>
      <Table
        noTitle
        searchPlaceHolder="Search any fan"
        isLoading={loading}
        data={data?.data ?? []}
        totalPages={data?.last_page || 1}
        slot={
          <Dropdown
            triggerText={
              tablePeriodOptions.find(
                (item) => item.value === queryParams.get("period")
              )?.label || "All"
            }
            options={[
              { label: "All", value: "all" },
              ...tablePeriodOptions,
            ].map((item) => ({
              label: item.label,
              value: item.value,
              action: () => queryParams.set("period", item.value),
            }))}
          />
        }
        rows={[
          {
            header: "Names",
            view: (item) => {
              const rawImage = item.profile_picture_url;
              const displayImageUrl = rawImage
                ? rawImage.startsWith("/avatars")
                  ? `https://api.gmpentertainment247.com${rawImage}`
                  : rawImage
                : "/images/profile-default.png";
              return (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      {...imageProp(displayImageUrl)}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <p>{item.name}</p>
                </div>
              );
            },
          },
          {
            header: "Email",
            view: (item) => <span className="lowercase">{item.email}</span>,
          },
          {
            header: "Phone Number",
            view: (item) => item.phone,
          },
          {
            header: "Date Joined",
            view: (item) => (
              <span>{dayjs(item.created_at).format("DD MMM, YYYY")}</span>
            ),
          },
          {
            header: "Action",
            view: (item) => (
              <Link to={`/fans/${item.id}`} title="View">
                <EditIcon className="w-6 ml-4 text-gray-700" />
              </Link>
            ),
          },
        ]}
      />
    </>
  );
}
