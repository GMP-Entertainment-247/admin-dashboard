import { useParams } from "react-router-dom";
import useFetch from "../../../utils/hooks/useFetch";
import UserDetails from "../../../shared_pages/UserDetails";
import type { IFan } from "../../../interface/fans.interface";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import PageTitle from "../../../components/shared/PageTitle";

export default function FanDetails() {
  const { fanId } = useParams();

  const { data: fan, loading } = useFetch<IFan>("/admin/profile", {
    id: fanId,
  });

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <PageTitle as="h1" showBackButton className="my-3">
        Fan's Profile
      </PageTitle>
      <UserDetails fan={fan} />;
    </>
  );
}
