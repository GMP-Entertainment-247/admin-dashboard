import clsx from "clsx";
import { Modal } from "../components/Modal";
import Button from "../components/shared/Button";
import Table from "../components/Table";
import { formatNumber, imageProp } from "../utils/helpers";
import { useSingleState } from "../utils/hooks/useSingleState";
import useMutation from "../utils/hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import type { IFan } from "../interface/fans.interface";
import type { IAudition } from "../interface/rapbattle.interface";
import useFetch from "../utils/hooks/useFetch";
import type { TicketHistoryItem } from "../interface/tickets.interface";
import type { VoteHistoryItem } from "../interface/votes.interface";
import { formatEventDateTime, formatDateMDY } from "../utils/helpers";
import { ReactComponent as WarningIcon } from "../images/svg/warning.svg";
import FixedFooter from "../components/shared/FixedFooter";

export default function UserDetails({
  isContestant,
  fan,
  audition,
}: {
  isContestant?: boolean;
  fan?: IFan;
  audition?: Partial<IAudition>;
}) {
  const showModal = useSingleState(false);
  const nextStageModal = useSingleState(false);
  const queryClient = useQueryClient();

  const hasUser = !!fan?.id;
  // console.log(hasUser);

  const nextStageApi = useMutation(
    "/admin/audition/move-to-next-stage",
    "post"
  );

  const suspendApi = useMutation("/admin/suspend-user", "post");
  const unsuspendApi = useMutation("/admin/unsuspend-user", "post");

  const isSuspended = fan?.suspend === 1 || fan?.suspend === "1" ? true : false;

  const handleNextStage = () => {
    const auditionId = audition?.id;
    if (!auditionId) return;
    nextStageApi
      .mutate({
        id: auditionId,
      })
      .then((resp) => {
        if (resp?.status) {
          nextStageModal.set(false);
          queryClient.invalidateQueries({
            queryKey: ["/admin/audition/fetch-by-stage"],
          });
        }
      });
  };

  const invalidateFanProfile = () => {
    if (!fan?.id) return;
    queryClient.refetchQueries({
      queryKey: ["/admin/profile", { id: String(fan.id) }],
    });
  };

  const handleSuspendToggle = () => {
    if (!fan?.id) return;

    const api = isSuspended ? unsuspendApi : suspendApi;

    api
      .mutate({
        id: fan.id,
      })
      .then((resp) => {
        if (resp?.status) {
          showModal.set(false);
          invalidateFanProfile();
        }
      });
  };

  const displayName = fan?.name || audition?.name || "";
  const displayEmail = fan?.email || audition?.email || "---";
  const displayPhone = fan?.phone || audition?.phone || "---";
  //   const displayVideoLink = audition?.link || "---";
  const rawImage = fan?.profile_picture_url;

  const displayImageUrl = rawImage
    ? rawImage.startsWith("/avatars")
      ? `https://api.gmpentertainment247.com${rawImage}`
      : rawImage
    : "/images/profile-default.png";

  const { data: voteHistory, loading: voteLoading } = useFetch<{
    current_page: number;
    last_page: number;
    data: VoteHistoryItem[];
  }>("/admin/vote-history", { id: fan?.id }, { enabled: hasUser });

  const { data: ticketHistory, loading: ticketLoading } = useFetch<{
    current_page: number;
    last_page: number;
    data: TicketHistoryItem[];
  }>("/admin/ticket-history", { id: fan?.id }, { enabled: hasUser });

  // console.log(voteHistory);

  return (
    <div className="pb-[95px]">
      <div className="bg-white rounded-lg flex gap-5 p-6 max-[1200px]:block">
        <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden">
          <img
            {...imageProp(displayImageUrl)}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full">
          <div className="flex gap-2 flex-wrap">
            <p className="text-[24px] font-semibold">{displayName}</p>
            <div
              className={clsx(
                "w-fit rounded-full py-0.5 px-2.5 flex items-center",
                isSuspended ? "bg-[#FCE7C5]" : "bg-[#01BA4C1A]"
              )}
            >
              <span
                className={clsx(
                  "font-medium text-sm",
                  isSuspended ? "text-[#A35B0A]" : "text-[#01BA4C]"
                )}
              >
                {isSuspended ? "Suspended" : "Active"}
              </span>
            </div>
          </div>
          <div className="text-base grid grid-cols-4 gap-5 mt-6 max-[1400px]:grid-cols-3 max-[992px]:grid-cols-2 max-[560px]:grid-cols-1">
            {[
              { title: "Email", value: displayEmail },
              { title: "Phone Number", value: displayPhone },
              {
                title: "Location",
                value: "---",
              },
              {
                title: "Fan Since",
                value: "---",
              },
              {
                title: "Favorite Artists",
                value: "---",
              },
              {
                title: "Votes Cast",
                value: "---",
              },
              {
                title: "Tickets Bought",
                value: "---",
              },
              {
                title: "Video Link",
                value: "---",
                hide: !isContestant,
              },
            ].map((item, i) => (
              <div key={i} className={clsx(item.hide && "hidden")}>
                <p className="text-[#737373]">{item.title}</p>
                <p className="text-[#212121] font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {hasUser && (
        <div className="grid grid-cols-2 gap-7 mt-10 max-[1200px]:grid-cols-1">
          <Table
            tableTitle="Vote History"
            isLoading={voteLoading}
            data={voteHistory?.data ?? []}
            hideSearch={true}
            rows={[
              {
                header: "Atrist",
                view: (item) => item.contestant?.name || "---",
              },
              {
                header: "Votes",
                view: (item) => item.vote || "---",
              },
              {
                header: "Amount",
                view: (item) => formatNumber(Number(item.amount)),
              },
              {
                header: "Date",
                view: (item) =>
                  item.created_at ? formatDateMDY(item.created_at) : "---",
              },
            ]}
            isPreview
            seeMoreLink={`/fans/${fan.id}/votes`}
          />
          <Table
            tableTitle="Ticket History"
            isLoading={ticketLoading}
            data={ticketHistory?.data ?? []}
            hideSearch={true}
            rows={[
              {
                header: "Event",
                view: (item) => item.event?.title || "---",
              },
              {
                header: "No of Tickets",
                view: (item) => 1,
              },
              {
                header: "Event Date",
                view: (item) =>
                  `${formatEventDateTime(
                    item.event?.event_start_date
                  )} - ${formatEventDateTime(item.event?.event_end_date)}`,
              },
              {
                header: "Order ID",
                view: (item) => item.unique,
              },
              {
                header: "Order Date",
                view: (item) => formatDateMDY(item.created_at),
              },
            ]}
            isPreview
            seeMoreLink={`/fans/${fan.id}/tickets`}
          />
        </div>
      )}
      <FixedFooter>
        {hasUser && (
          <Button
            text={isSuspended ? "Unsuspend" : "Suspend"}
            extraClassName={clsx(
              "rounded-[8px] !font-bold !w-[100px] !min-h-10",
              isContestant && "!text-[#EB2904] !bg-[#FFE5E5]"
            )}
            onClick={() => showModal.set(true)}
          />
        )}
        {isContestant && (
          <Button
            text="Move to next stage"
            extraClassName="rounded-[8px] !font-bold !w-fit px-5 !min-h-10"
            onClick={() => nextStageModal.set(true)}
          />
        )}
      </FixedFooter>
      <Modal
        show={showModal.get}
        onClose={() => {
          showModal.set(false);
        }}
        submitClick={handleSuspendToggle}
        submitLoading={suspendApi.loading || unsuspendApi.loading}
      >
        <div className="flex items-center flex-col">
          <WarningIcon />
          <p className="text-base font-semibold text-[#212121] mt-4">
            {isSuspended ? "Unsuspend" : "Suspend"}
          </p>
          <p className="text-sm text-[#595959]">
            {isSuspended
              ? "Are you sure you want to unsuspend this user?"
              : "Are you sure you want to suspend this user?"}
          </p>
        </div>
      </Modal>
      <Modal
        show={nextStageModal.get}
        onClose={() => {
          nextStageModal.set(false);
        }}
        submitClick={() => handleNextStage()}
        submitLoading={nextStageApi.loading}
      >
        <div className="flex items-center flex-col max-w-[360px] text-center">
          <p className="text-base font-semibold text-[#212121] mt-4">
            Next Stage
          </p>
          <p className="text-sm text-[#595959]">
            Are you sure you want to move this contestant to the next stage?
          </p>
        </div>
      </Modal>
    </div>
  );
}
