import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    SetStateAction,
    Dispatch,
} from "react";
import type { EventCreator } from "../../../../interface/events.interface";

export type EventDraftMode = "create" | "edit";

export interface EventDraftData {
    eventId?: number;
    title: string;
    description: string;
    venue: string;
    location: string;
    price: string;
    link: string;
    available_tickets: string;
    event_start_date: string;
    event_start_time: string;
    event_end_date: string;
    event_end_time: string;
    sale_start_date: string;
    sale_start_time: string;
    sale_end_date: string;
    sale_end_time: string;
    image: string;
    newImage: File[];
    creator?: EventCreator;
}

export interface EventDraft {
    mode: EventDraftMode;
    data: EventDraftData;
}

interface EventDraftContextType {
    draft: EventDraft | null;
    setDraft: Dispatch<SetStateAction<EventDraft | null>>;
    clearDraft: () => void;
}

const EventDraftContext = createContext<EventDraftContextType | undefined>(
    undefined
);

export const EventDraftProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [draft, setDraft] = useState<EventDraft | null>(null);

    const clearDraft = () => setDraft(null);

    return (
        <EventDraftContext.Provider value={{ draft, setDraft, clearDraft }}>
            {children}
        </EventDraftContext.Provider>
    );
};

export const useEventDraft = () => {
    const context = useContext(EventDraftContext);
    if (!context) {
        throw new Error("useEventDraft must be used within EventDraftProvider");
    }
    return context;
};
