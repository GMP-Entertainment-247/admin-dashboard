import DashboardLayout from "../DashboardLayout";
import mic from "../../../images/svg/mic.svg";
import investors from "../../../images/svg/investors.svg";
import celeb from "../../../images/svg/celeb.svg";
import ranking from "../../../images/svg/ranking.svg";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../../utils/hooks/useFetch";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import Pagination from "../../../components/Table/Pagination";
import { formatTimestamp } from "../../../utils/formatTimestamp";
import type { NotificationData } from "../../../interface/notifications.interface";

type CategoryKey = "artist" | "investors" | "celebrities" | "contestants";

export default function NotificationsPage() {
  const [searchParams] = useSearchParams();

  const queryParams: Record<string, any> = {
    page: searchParams.get("page") || "1",
  };

  const {
    data: notificationData,
    loading,
    error,
  } = useFetch<NotificationData>("/admin/notifications", queryParams);

  const categories = [
    {
      key: "artist" as CategoryKey,
      icon: mic,
      color: "#C25589",
    },
    {
      key: "investors" as CategoryKey,
      icon: investors,
      color: "#3BDC54",
    },
    {
      key: "celebrities" as CategoryKey,
      icon: celeb,
      color: "#1A96F0",
    },
    {
      key: "contestants" as CategoryKey,
      icon: ranking,
      color: "#FFA61F",
    },
  ];

  // Map user_type from API to category key, fallback to "artist"
  const getUserTypeCategory = (userType?: string): CategoryKey => {
    const normalizedType = userType?.toLowerCase().trim();

    if (normalizedType === "artist") return "artist";
    if (normalizedType === "investor" || normalizedType === "investors")
      return "investors";
    if (normalizedType === "celebrity" || normalizedType === "celebrities")
      return "celebrities";
    if (normalizedType === "contestant" || normalizedType === "contestants")
      return "contestants";

    // Fallback to "artist" for unmapped types (like "fan")
    return "artist";
  };

  // Generate title based on user type and narration
  const generateTitle = (userType?: string): string => {
    const category = getUserTypeCategory(userType);

    const categoryNames: Record<CategoryKey, string> = {
      artist: "Artist",
      investors: "Investors",
      celebrities: "Celebrity",
      contestants: "Contestant",
    };

    return `${categoryNames[category]} - Activity`;
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner message="Loading notifications..." />;
    }

    if (error) {
      return (
        <StateContainer>
          <p className="text-red-600 mb-4">Error loading notifications</p>
          <p className="text-gray-600">
            {error.message || "Something went wrong"}
          </p>
        </StateContainer>
      );
    }

    if (!notificationData?.data || notificationData.data.length === 0) {
      return (
        <StateContainer>
          <p className="text-gray-600">No notifications found</p>
          <p className="text-sm text-gray-500 mt-2">
            No notifications available at the moment
          </p>
        </StateContainer>
      );
    }

    return (
      <>
        <div className="px-5 py-2.5">
          {notificationData.data.map((notif, idx) => {
            const category = getUserTypeCategory(notif.user?.user_type);
            const categoryConfig = categories.find(
              (cat) => cat.key === category
            );
            const title =
              notif.title ||
              generateTitle(notif.user?.user_type);
            const timeDisplay = notif.created_at
              ? formatTimestamp(notif.created_at)
              : "";

            return (
              <div
                key={`${notif.user_id}-${idx}`}
                className="flex gap-5 border-b border-b-[#E9E9E9] py-3"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: categoryConfig?.color,
                  }}
                >
                  <img
                    src={categoryConfig?.icon}
                    alt="icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center gap-2 justify-between">
                    <p className="text-base font-semibold">{title}</p>
                    {timeDisplay && (
                      <p className="text-sm text-[#999999]">{timeDisplay}</p>
                    )}
                  </div>
                  <div className="bg-[#E9E9E999] rounded-lg p-2.5 mt-2.5">
                    <p className="text-sm text-[#212121]">
                      {notif.admin_narration}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {notificationData.last_page > 1 && (
          <div className="flex justify-center py-5 border-t border-t-[#E9E9E9]">
            <Pagination totalPages={notificationData.last_page} />
          </div>
        )}
      </>
    );
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-[16px]">
        <h1 className="text-lg font-semibold p-5 border-b border-b-[#E9E9E9]">
          Notifications
        </h1>
        {renderContent()}
      </div>
    </DashboardLayout>
  );
}
