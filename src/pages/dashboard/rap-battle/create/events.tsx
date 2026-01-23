import { useEffect } from "react";
import EventForm from "../../../../components/EventForm";
import { useEventDraft } from "../events/event-draft-context";

export default function CreateEvent() {
  const { draft, setDraft } = useEventDraft();

  useEffect(() => {
    if (draft?.mode === "create" && draft.data) return;
    setDraft({
      mode: "create",
      data: {
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
      },
    });
  }, [draft, setDraft]);

  return <EventForm />;
}
