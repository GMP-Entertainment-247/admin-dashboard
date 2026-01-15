import clsx from "clsx";
import { Modal } from "../components/Modal";
import Button from "../components/shared/Button";
import Table from "../components/Table";
import { dataRows } from "../utils/constant";
import { imageProp } from "../utils/helpers";
import { useSingleState } from "../utils/hooks/useSingleState";
import useMutation from "../utils/hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import type { IFan } from "../interface/fans.interface";
import type { IAudition } from "../interface/rapbattle.interface";

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

  const nextStageApi = useMutation(
    "/admin/audition/move-to-next-stage",
    "post"
  );

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

  const displayName = fan?.name || audition?.name || "";
  const displayEmail = fan?.email || audition?.email || "---";
  const displayPhone = fan?.phone || audition?.phone || "---";

//   const displayVideoLink = audition?.link || "---";

//   const displayImageUrl = fan?.profile_picture_url;

  return (
    <div>
      <div className="bg-white rounded-lg flex gap-5 p-6 max-[1200px]:block">
        <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden">
          <img
            {...imageProp("/images/profile-default.png")}
            alt=""
            className="w-full"
          />
        </div>
        <div className="w-full">
          <div className="flex gap-2 flex-wrap">
            <p className="text-[24px] font-semibold">{displayName}</p>
            <div className="bg-[#01BA4C1A] w-fit rounded-full py-0.5 px-2.5">
              <span className="text-[#01BA4C] font-medium text-sm">Active</span>
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
      <div className="grid grid-cols-2 gap-7 mt-10 max-[1200px]:grid-cols-1">
        <Table
          tableTitle="Vote History"
          searchPlaceHolder="Search any artist"
          isLoading={false}
          data={dataRows}
          hideSearch={true}
          rows={[
            {
              header: "Artist",
              view: (item) => (
                <div className="flex gap-2 items-center">
                  <p>{item.name}</p>
                </div>
              ),
            },
            {
              header: "No of votes",
              view: (item) => <span>2,210</span>,
            },
            {
              header: "Date",
              view: (item) => item.date,
            },
          ]}
          isPreview
          seeMoreLink="/fans/votes"
        />
        <Table
          tableTitle="Ticket History"
          searchPlaceHolder="Search any artist"
          isLoading={false}
          data={dataRows}
          hideSearch={true}
          rows={[
            {
              header: "Event",
              view: (item) => (
                <div className="flex gap-2 items-center">
                  <p>{item.name}</p>
                </div>
              ),
            },
            {
              header: "No of tickets",
              view: (item) => <span>2,210</span>,
            },
            {
              header: "Date",
              view: (item) => item.date,
            },
          ]}
          isPreview
          seeMoreLink="/fans/tickets"
        />
      </div>
      <div className="flex justify-end gap-3 bg-white p-5 rounded-lg mt-5">
        <Button
          text="Suspend"
          extraClassName={clsx(
            "rounded-[8px] !font-bold !w-[100px] !min-h-10",
            isContestant && "!text-[#EB2904] !bg-[#FFE5E5]"
          )}
          onClick={() => showModal.set(true)}
        />
        {isContestant && (
          <Button
            text="Move to next stage"
            extraClassName="rounded-[8px] !font-bold !w-fit px-5 !min-h-10"
            onClick={() => nextStageModal.set(true)}
          />
        )}
      </div>
      <Modal
        show={showModal.get}
        onClose={() => {
          showModal.set(false);
        }}
        // submitClick={() => console.log("submit")}
        // submitLoading={false}
      >
        <div className="flex items-center flex-col">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="64" height="64" rx="32" fill="#EB2904" />
            <mask
              id="mask0_1852_36415"
              maskUnits="userSpaceOnUse"
              x="15"
              y="17"
              width="34"
              height="30"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M32 19.3333L17.3334 44.6666H46.6667L32 19.3333Z"
                fill="white"
                stroke="white"
                stroke-width="4"
                stroke-linejoin="round"
              />
              <path
                d="M32 39.3332V39.9998M32 28.6665L32.0053 35.3332"
                stroke="black"
                stroke-width="4"
                stroke-linecap="round"
              />
            </mask>
            <g mask="url(#mask0_1852_36415)">
              <path d="M16 16H48V48H16V16Z" fill="#FEFEFE" />
            </g>
          </svg>
          <p className="text-base font-semibold text-[#212121] mt-4">Suspend</p>
          <p className="text-sm text-[#595959]">
            Are you sure you want to suspend this user?
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
