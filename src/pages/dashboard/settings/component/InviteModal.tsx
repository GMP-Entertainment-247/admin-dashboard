import { FormikProvider, useFormik } from "formik";
import { Modal } from "../../../../components/Modal"
import { inviteAdminSchema } from "../../../../utils/validationSchema";
import { formProps } from "../../../../utils/helpers";
import { TextField } from "../../../../components/Form/TextField";
import ReactSwitch from "react-switch";
import useFetch from "../../../../utils/hooks/useFetch";
import useMutation from "../../../../utils/hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorWrapper } from "../../../../components/Form/ErrorWrapper";
import { ITeamMember } from "../../../../interface/settings.interface";


type TInviteModalProps = {
    show: boolean;
    closeModal: () => void;
    edit?: ITeamMember | null;
}

export default function InviteModal ({
    show, closeModal, edit
}:TInviteModalProps) {
    const {data: roles} = useFetch<ITeamMember[]>("/admin/roles")
    const createApi = useMutation("/admin/teams/create", "post")
    const updateApi = useMutation("/admin/teams/update", "post")
    const queryClient = useQueryClient();
    

    const form = useFormik({
        initialValues: {
            firstName: edit?.first_name ?? "",
            lastName: edit?.last_name ?? "",
            email: edit?.email ?? "",
            phone: edit?.phone ?? "",
            roles: [] as string[],
        },
        validateOnMount: true,
        validationSchema: inviteAdminSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            !!edit ?
            updateApi.mutate({
                user_id: edit.id,
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                role: values.roles,
                phone: values.phone,
            })
                .then(resp => {
                    if(resp?.status) {
                        closeModal()
                        queryClient.invalidateQueries({queryKey: [
                            "/admin/teams"
                        ]})
                    }
                })
            :
            createApi.mutate({
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                role: values.roles,
                phone: values.phone,
            })
                .then(resp => {
                    if(resp?.status) {
                        closeModal()
                        queryClient.invalidateQueries({queryKey: [
                            "/admin/teams"
                        ]})
                    }
                })
        },
    });

    const handleRole = (id: string) => {
        form.setFieldValue(
            "roles",
            id
        )
        // if(form.values.roles.includes(id)){
        //     const rem = form.values.roles.filter(item => item!==id)
        //     form.setFieldValue(
        //         "roles",
        //         rem
        //     )
        // } else {
        //     form.setFieldValue(
        //         "roles",
        //         [...form.values.roles, id]
        //     )
        // }
    }

    return (
        <Modal
            show={show}
            onClose={closeModal}
            submitText={!!edit ? "Update":"Invite"}
            submitClick={()=>form.submitForm()}
            submitLoading={createApi.loading}
            extraClassname="min-w-[500px]"
        >
            <p className="text-base font-semibold -mt-5 mb-6">{!!edit ? "Update":"Invite"} Team Member</p>
            <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit} className="w-full">
                    <div className="grid grid-cols-2 gap-x-5">
                        <TextField
                            label="First Name"
                            labelColor="text-[#212121]"
                            type="text"
                            {...formProps("firstName", form)}
                            extraClassName="!bg-[#F5F5F5] !text-[#999999] !border-[#F5F5F5] !w-full"
                        />
                        <TextField
                            label="Last Name"
                            labelColor="text-[#212121]"
                            type="text"
                            {...formProps("lastName", form)}
                            extraClassName="!text-[#999999] !bg-[#F5F5F5] !border-[#F5F5F5] !w-full"
                        />
                        <TextField
                            label="Email address"
                            labelColor="text-[#212121]"
                            type="email"
                            {...formProps("email", form)}
                            extraClassName="!text-[#999999] !bg-[#F5F5F5] !border-[#F5F5F5] !w-full"
                        />
                        <TextField
                            label="Phone Number"
                            labelColor="text-[#212121]"
                            type="text"
                            {...formProps("phone", form)}
                            extraClassName="!text-[#999999] !bg-[#F5F5F5] !border-[#F5F5F5] !w-full"
                        />
                    </div>
                    <div className="my-6">
                        <p className="text-base font-semibold mb-3">Assign Roles</p>
                        <ErrorWrapper show={true} name={"roles"}>
                            {() => (
                                <div className="w-full grid grid-cols-2 gap-5">
                                    {
                                        roles?.map((item, idx)=>(
                                            <div key={idx} className="flex justify-between items-center gap-5">
                                                <div>
                                                    <p className="text-sm mb-1">{item.name}</p>
                                                    <p className="text-xs">Has the ability to reply incoming chats</p>
                                                </div>
                                                <ReactSwitch
                                                    onChange={() => {handleRole(item.name)}}
                                                    checked={form.values.roles.includes(item.name)}
                                                    width={46}
                                                    height={26}
                                                    checkedIcon={false}
                                                    uncheckedIcon={false}
                                                    handleDiameter={24}
                                                    onColor="#BFA100"
                                                    offColor="#C1C2C3"
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </ErrorWrapper>
                    </div>
                </form>
            </FormikProvider>
        </Modal>
    )
}