import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import EventInnerLayout from "./events/inner-layout";
import Button from "../../../components/shared/Button";
import StateContainer from "../../../components/shared/StateContainer";
import { useEventDraft } from "./events/event-draft-context";
import { createEvent, updateEvent } from "./events/data";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHelpers";
import EventViewLayout from "./events/event-view-layout";
import { combineDateTime } from "../../../utils/helpers";
import { useProfile } from "../../../context/ProfileContext";

const PreviewEvent = () => {
    const { draft } = useEventDraft();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { profile } = useProfile();

    const {
        title,
        description,
        venue,
        location,
        price,
        link,
        available_tickets,
        event_start_date,
        event_start_time,
        event_end_date,
        event_end_time,
        sale_start_date,
        sale_start_time,
        sale_end_date,
        sale_end_time,
        eventId,
        image,
        newImage,
        creator,
    } = useMemo(() => {
        return (
            draft?.data || {
                title: "",
                description: "",
                venue: "",
                location: "",
                price: "",
                link: "",
                available_tickets: "",
                event_start_date: "",
                event_start_time: "",
                event_end_date: "",
                event_end_time: "",
                sale_start_date: "",
                sale_start_time: "",
                sale_end_date: "",
                sale_end_time: "",
                image: "",
                newImage: [],
                eventId: undefined,
            }
        );
    }, [draft]);

    const handleContinueEditing = () => {
        navigate(-1);
    };

    const handlePrimaryAction = async () => {
        if (!draft) return;
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.set("title", title);
            formData.set("description", description);
            formData.set("venue", venue);
            formData.set("location", location);
            formData.set("price", price);
            if (link) formData.set("link", link);
            formData.set("available_tickets", available_tickets);
            formData.set(
                "event_start_date",
                combineDateTime(event_start_date, event_start_time)
            );
            formData.set(
                "event_end_date",
                combineDateTime(event_end_date, event_end_time)
            );
            if (sale_start_date && sale_start_time) {
                formData.set(
                    "sale_start_date",
                    combineDateTime(sale_start_date, sale_start_time)
                );
            }
            if (sale_end_date && sale_end_time) {
                formData.set(
                    "sale_end_date",
                    combineDateTime(sale_end_date, sale_end_time)
                );
            }

            if (newImage && newImage.length > 0) {
                formData.append("picture", newImage[0]);
            }
            if (draft.mode === "create") {
                await createEvent(formData);
                toast.success("Event created");
                // Invalidate the event list query to refetch updated data
                await queryClient.invalidateQueries({
                    queryKey: ["/admin/events/list"],
                });
                navigate("/rap-battle/livestream");
            } else {
                const targetEventId = eventId;
                if (targetEventId) {
                    formData.set("id", String(targetEventId));
                }
                await updateEvent(formData);
                toast.success("Event updated");
                // Invalidate both the list and details queries to refetch updated data
                await Promise.all([
                    queryClient.invalidateQueries({
                        queryKey: ["/admin/events/list"],
                    }),
                    queryClient.invalidateQueries({
                        queryKey: ["/admin/events/list", { id: targetEventId }],
                    }),
                ]);
                navigate(`/rap-battle/livestream/${eventId}`, {
                    replace: true,
                });
            }
        } catch (error: any) {
            toast.error(handleApiError(error, "Failed to save event"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <EventInnerLayout title="Preview">
            {!draft ? (
                <StateContainer>
                    <p className="text-gray-600">
                        No event data found to preview. Please go back and fill the form
                        first.
                    </p>
                </StateContainer>
            ) : (
                <>
                    <EventViewLayout
                        title={title}
                        description={description}
                        venue={venue}
                        location={location}
                        eventStartDate={event_start_date}
                        eventStartTime={event_start_time}
                        image={
                            newImage && newImage.length > 0
                                ? URL.createObjectURL(newImage[0])
                                : image || ""
                        }
                        creatorName={
                            draft.mode === "create"
                                ? `${profile?.first_name ?? ""} ${profile?.last_name ?? ""
                                    }`.trim() || "Admin"
                                : creator?.name
                        }
                        creatorAvatar={
                            draft.mode === "create"
                                ? profile?.profile_picture_url || profile?.profile_pic || ""
                                : creator?.profile_picture_url || creator?.profile_pic || ""
                        }
                    />

                    {/* Bottom action bar */}
                    <div className="mt-6 bg-white p-5 rounded-2xl flex items-center justify-end gap-4">
                        <Button
                            text="Continue Editing"
                            type="button"
                            extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold !bg-transparent !text-grey-normal border border-[#E9E9E9]"
                            onClick={handleContinueEditing}
                        />
                        <Button
                            text={draft.mode === "create" ? "Create Event" : "Save Changes"}
                            type="button"
                            extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
                            isLoading={isSubmitting}
                            onClick={handlePrimaryAction}
                        />
                    </div>
                </>
            )}
        </EventInnerLayout>
    );
};

export default PreviewEvent;
