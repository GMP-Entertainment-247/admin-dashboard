import { FormikProvider, useFormik } from "formik";
import { Modal } from "../../../../components/Modal"
import { inviteAdminSchema } from "../../../../utils/validationSchema";
import { formProps } from "../../../../utils/helpers";
import { TextField } from "../../../../components/Form/TextField";
import ReactSwitch from "react-switch";


type TInviteModalProps = {
    show: boolean;
    closeModal: () => void
}

export default function InviteModal ({
    show, closeModal
}:TInviteModalProps) {
    const form = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            roles: [] as string[],
        },
        validateOnMount: true,
        validationSchema: inviteAdminSchema,
        onSubmit: (values) => {
        },
    });

    const handleRole = (id: string) => {
        if(form.values.roles.includes(id)){
            const rem = form.values.roles.filter(item => item!==id)
            form.setFieldValue(
                "roles",
                rem
            )
        } else {
            form.setFieldValue(
                "roles",
                [...form.values.roles, id]
            )
        }
    }

    return (
        <Modal
            show={show}
            onClose={closeModal}
            submitText="Invite"
            submitClick={()=>console.log("submit")}
            submitLoading={false}
            extraClassname="min-w-[500px]"
        >
            <p className="text-base font-semibold -mt-5 mb-6">Invite Team Member</p>
            <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit} className="w-full">
                    <div className="grid grid-cols-2 gap-x-5">
                        <TextField
                            label="First Name"
                            labelColor="text-[#212121]"
                            type="text"
                            {...formProps("firstName", form)}
                            extraClassName="!text-[#999999] !bg-[#F5F5F5] !border-transparent !w-full"
                        />
                        <TextField
                            label="Last Name"
                            labelColor="text-[#212121]"
                            type="text"
                            {...formProps("lastName", form)}
                            extraClassName="!text-[#999999] !bg-[#F5F5F5] !border-transparent !w-full"
                        />
                        <TextField
                            label="Email address"
                            labelColor="text-[#212121]"
                            type="email"
                            {...formProps("email", form)}
                            extraClassName="!text-[#999999] !bg-[#F5F5F5] !border-transparent !w-full"
                        />
                        <TextField
                            label="Phone Number"
                            labelColor="text-[#212121]"
                            type="text"
                            {...formProps("phone", form)}
                            extraClassName="!text-[#999999] !bg-[#F5F5F5] !border-transparent !w-full"
                        />
                    </div>
                    <div className="my-6">
                        <p className="text-base font-semibold mb-3">Assign Roles</p>
                        <div className="w-full grid grid-cols-2 gap-5">
                            {
                                [
                                    {
                                        id: "1",
                                    },
                                    {
                                        id: "2",
                                    },
                                    {
                                        id: "3",
                                    },
                                    {
                                        id: "4",
                                    },
                                ].map((item, idx)=>(
                                    <div key={idx} className="flex justify-between items-center gap-5">
                                        <div>
                                            <p className="text-sm mb-1">Admin Role 1</p>
                                            <p className="text-xs">Has the ability to reply incoming chats</p>
                                        </div>
                                        <ReactSwitch
                                            onChange={() => {handleRole(item.id)}}
                                            checked={form.values.roles.includes(item.id)}
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
                    </div>
                </form>
            </FormikProvider>
        </Modal>
    )
}