import {
  useLocation,
  useParams,
  useSearchParams,
  Link,
} from "react-router-dom";
import useFetch from "../../../utils/hooks/useFetch";
import UserDetails from "../../../shared_pages/UserDetails";
import type { IAudition } from "../../../interface/rapbattle.interface";
import type { IFan } from "../../../interface/fans.interface";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import PageTitle from "../../../components/shared/PageTitle";

export default function ContestantDetails() {
  const { auditionId } = useParams<{ auditionId: string }>();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("userId"); // from URL
  const stateAudition = (location.state as { audition?: IAudition })?.audition;

  // fetch user profile only when we have userId
  const { data: fan, loading: fanLoading } = useFetch<IFan>(
    "/admin/profile",
    { id: userId },
    { enabled: !!userId }
  );

  // If there is no userId, we can only show what we received via state
  // (refresh will lose state)
  if (!userId && !stateAudition) {
    return (
      <div className="bg-white p-6 rounded-lg">
        <p className="font-semibold text-[#212121]">Contestant details</p>
        <p className="text-sm text-[#595959] mt-1">
          This contestant has no user profile, and details can’t be loaded after
          refresh. Please go back to the contestants list and open the record
          again.
        </p>
        <Link className="underline mt-3 inline-block" to="/rap-battle">
          Back to Rap Battle
        </Link>
      </div>
    );
  }

  if (userId && fanLoading) return <LoadingSpinner />;

  return (
    <>
      <PageTitle as="h1" showBackButton className="my-3">
        Contestant's Profile
      </PageTitle>
      <UserDetails
        isContestant
        fan={fan} // will be defined only when userId exists
        audition={{ ...(stateAudition || {}), id: auditionId }} // will be defined only when no userId (or when you want video link)
      />
    </>
  );
}
