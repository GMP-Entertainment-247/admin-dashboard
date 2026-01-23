import { useNavigate } from "react-router-dom";
import { CalendarDays, Megaphone, Plus } from "lucide-react";
import { Modal } from ".";
import Button from "../shared/Button";

function CreateEventModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <Modal show={show} onClose={onClose} hideButtons>
      <h2 className="text-lg font-semibold text-black-1">Create</h2>

      <div className="grid grid-cols-2 gap-10 mt-10 max-[560px]:grid-cols-1">
        {/* Event */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#FFE8E5] flex items-center justify-center">
            <CalendarDays className="w-9 h-9 text-red-normal" />
          </div>

          <h3 className="mt-5 text-base font-medium text-grey-normal">Event</h3>
          <p className="mt-2 text-xs text-[#484848]">
            Create and schedule new events for the GMP community.
          </p>

          <div className="mt-6 w-full max-w-[120px]">
            <Button
              text={
                <>
                  <Plus className="w-5 h-5" />
                  Create
                </>
              }
              onClick={() => go("/rap-battle/livestream/create-event")}
              extraClassName="rounded-[10px] font-semibold !w-full inline-flex items-center gap-2 justify-center"
            />
          </div>
        </div>

        {/* Announcement */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#F7E8EF] flex items-center justify-center">
            <Megaphone className="w-9 h-9 text-[#C25589]" />
          </div>

          <h3 className="mt-5 text-base font-medium text-grey-normal">
            Announcement
          </h3>
          <p className="mt-2 text-xs text-[#484848]">
            Create and share important updates, news, or notices with the GMP
            community.
          </p>

          <div className="mt-6 w-full max-w-[120px]">
            <Button
              text={
                <>
                  <Plus className="w-5 h-5" />
                  Create
                </>
              }
              onClick={() => go("announcement/create-announcement")}
              extraClassName="rounded-[10px] font-semibold !w-full inline-flex items-center gap-2 justify-center"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateEventModal;
