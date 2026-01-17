import { Outlet } from "react-router-dom";
import { EventDraftProvider } from "./event-draft-context";

export default function EventLayout() {
    return (
        <EventDraftProvider>
            <Outlet />
        </EventDraftProvider>
    );
}
