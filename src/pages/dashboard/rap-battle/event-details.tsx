import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import EventInnerLayout from "./events/inner-layout";
import Button from "../../../components/shared/Button";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import EventViewLayout from "./events/event-view-layout";
import useFetch from "../../../utils/hooks/useFetch";
import type { Event } from "../../../interface/events.interface";
import {
  flattenErrorMessage,
  handleApiError,
} from "../../../utils/errorHelpers";
import { deleteEvent } from "./events/data";
import { splitDateTime } from "../../../utils/helpers";
import FixedFooter from "../../../components/shared/FixedFooter";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: eventData,
    loading,
    error,
    refetch,
  } = useFetch<Event | null>("/admin/events/details", {
    id: eventId,
  });

  const handleEdit = () => {
    if (!eventId) return;
    navigate("edit");
  };

  const handleDelete = async () => {
    if (!eventId) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmed) return;
    try {
      const res = await deleteEvent(eventId);
      if (!res.status) {
        toast.error(flattenErrorMessage(res.message, "Failed to delete event"));
        return;
      }
      // Invalidate the event list and details query to refetch updated data
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["/admin/events/list"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["/admin/events/details", { id: eventId }],
        }),
      ]);
      toast.success("Event deleted successfully");
      navigate("/rap-battle/livestream");
    } catch (error) {
      toast.error(handleApiError(error, "Failed to delete event"));
    }
  };
  useEffect(() => {
    refetch();
  }, [eventId, refetch]);
  return (
    <EventInnerLayout title="Details">
      {loading ? (
        <LoadingSpinner message="Loading event..." />
      ) : error ? (
        <StateContainer>
          <p className="text-red-600 mb-4">Error loading event</p>
          <p className="text-gray-600">{error.message}</p>
        </StateContainer>
      ) : (
        <div className="pb-[95px]">
          <EventViewLayout
            title={eventData?.title || ""}
            description={eventData?.description || ""}
            venue={eventData?.venue || ""}
            location={eventData?.location || ""}
            price={eventData?.price || ""}
            availableTickets={eventData?.available_tickets || ""}
            link={eventData?.link || ""}
            eventStartDate={
              splitDateTime(eventData?.event_start_date ?? null).date
            }
            eventStartTime={
              splitDateTime(eventData?.event_start_date ?? null).time
            }
            eventEndDate={splitDateTime(eventData?.event_end_date ?? null).date}
            eventEndTime={splitDateTime(eventData?.event_end_date ?? null).time}
            saleStartDate={
              splitDateTime(eventData?.sale_start_date ?? null).date
            }
            saleStartTime={
              splitDateTime(eventData?.sale_start_date ?? null).time
            }
            saleEndDate={splitDateTime(eventData?.sale_end_date ?? null).date}
            saleEndTime={splitDateTime(eventData?.sale_end_date ?? null).time}
            image={eventData?.image_url || ""}
            creatorName={eventData?.user?.name}
            creatorAvatar={
              eventData?.user?.profile_picture_url ||
              eventData?.user?.profile_pic ||
              ""
            }
            creatorEmail={eventData?.user?.email}
            creatorPhone={eventData?.user?.phone}
          />

          {/* Bottom action bar */}
          <FixedFooter>
            <Button
              text="Delete Event"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={handleDelete}
              variant="cancel"
            />
            <Button
              text="Edit Event"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={handleEdit}
            />
          </FixedFooter>
        </div>
      )}
    </EventInnerLayout>
  );
};

export default EventDetails;
