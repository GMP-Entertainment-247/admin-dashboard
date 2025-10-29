import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import Table from "../../../components/Table";
import { imageProp } from "../../../utils/helpers";
import Dropdown from "../../../components/shared/Dropdown";
import Button from "../../../components/shared/Button";
import { useSingleState } from "../../../utils/hooks/useSingleState";
import InviteModal from "./component/InviteModal";
import useFetch from "../../../utils/hooks/useFetch";
import { ITeamMember } from "../../../interface/settings.interface";

export default function SettingsTeam () {
    const showInvite = useSingleState(false)
    const {data: team, loading} = useFetch<{data: ITeamMember[]}>("/admin/teams")
    const editDetails = useSingleState<ITeamMember | null>(null)

    return (
        <div className="-mt-6">
            <Table 
                noTitle={true}
                tableTitle=""
                searchPlaceHolder="Search any team member"
                isLoading={loading}
                data={team?.data || []}
                slot={
                    <Button
                        text={
                            <div className="flex gap-1">
                                <PlusIcon className="w-4 text-white" />
                                <span>Invite</span>
                            </div>
                        }
                        type="button"
                        onClick={()=>showInvite.set(true)}
                        extraClassName="rounded-[8px] font-semibold px-5 min-h-0"
                    />
                }
                rows={[
                    {
                        header: "Team Member",
                        view: (item) => (
                            <div className="flex gap-2 items-center">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                                    <img {...imageProp("")} alt="" className="w-full" />
                                </div>
                                <p>{item.first_name} {item.last_name}</p>
                            </div>
                        )
                    },
                    {
                        header: "Email Address",
                        view: (item) => <span className="lowercase">{item.email}</span>,
                    },
                    {
                        header: "Phone Number",
                        view: (item) => item.phone
                    },
                    {
                        header: "Admin Role",
                        view: (item) => "---",
                    },
                    {
                        header: "Action",
                        view: (item) => (
                            <Dropdown 
                                triggerComponent={<EllipsisHorizontalIcon className="w-6 ml-4" />}
                                options={[
                                    {
                                        label: "Resend Invite",
                                        value: ""
                                    },
                                    {
                                        label: "Edit Role",
                                        value: "",
                                        action: () => {
                                            editDetails.set(item)
                                            showInvite.set(true)
                                        }
                                    },
                                    {
                                        label: "Delete",
                                        value: ""
                                    }
                                ]}
                            />
                        )
                    },
                ]}
            />
            <InviteModal 
                show={showInvite.get}
                closeModal={()=>{
                    showInvite.set(false)
                    editDetails.set(null)
                }}
                edit={editDetails.get}
            />
        </div>
    )
}