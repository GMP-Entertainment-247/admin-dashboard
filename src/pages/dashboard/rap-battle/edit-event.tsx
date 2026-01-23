import { useEffect } from "react";
import EventForm from "../../../components/EventForm";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { useEventDraft } from "./events/event-draft-context";
import useFetch from "../../../utils/hooks/useFetch";
import type { Event } from "../../../interface/events.interface";
import { splitDateTime } from "../../../utils/helpers";

const EditEvent = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const { draft, setDraft } = useEventDraft();

    const shouldUseDraft =
        draft?.mode === "edit" &&
        draft.data.eventId?.toString() === (eventId ?? "").toString();

    const {
        data: fetchedData,
        loading,
        error,
    } = useFetch<Event | null>(
        "/admin/events/list",
        {
            id: eventId,
        },
        { enabled: !shouldUseDraft }
    );

    // Seed draft from API when needed
    useEffect(() => {
        if (shouldUseDraft || !fetchedData) return;
        const eventStart = splitDateTime(fetchedData.event_start_date);
        const eventEnd = splitDateTime(fetchedData.event_end_date);
        const saleStart = splitDateTime(fetchedData.sale_start_date);
        const saleEnd = splitDateTime(fetchedData.sale_end_date);
        setDraft({
            mode: "edit",
            data: {
                eventId: fetchedData.id,
                title: fetchedData.title || "",
                description: fetchedData.description || "",
                venue: fetchedData.venue || "",
                location: fetchedData.location || "",
                price: fetchedData.price || "",
                link: fetchedData.link || "",
                available_tickets: fetchedData.available_tickets || "",
                event_start_date: eventStart.date,
                event_start_time: eventStart.time,
                event_end_date: eventEnd.date,
                event_end_time: eventEnd.time,
                sale_start_date: saleStart.date,
                sale_start_time: saleStart.time,
                sale_end_date: saleEnd.date,
                sale_end_time: saleEnd.time,
                image: fetchedData.image_url || "",
                newImage: [],
                creator: fetchedData.user,
            },
        });
    }, [fetchedData, shouldUseDraft, setDraft]);

    if (loading) {
        return <LoadingSpinner message="Loading event..." />;
    }

    if (error) {
        return (
            <StateContainer>
                <p className="text-red-600 mb-4">Error loading event details</p>
                <p className="text-gray-600">
                    {error.message || "Something went wrong"}
                </p>
            </StateContainer>
        );
    }
    if (!fetchedData && !draft) {
        return (
            <StateContainer>
                <p className="text-gray-600">Event not found</p>
            </StateContainer>
        );
    }

    return <EventForm />;
};

export default EditEvent;
