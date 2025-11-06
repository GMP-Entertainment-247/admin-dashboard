import { FormikProvider, useFormik } from "formik";
import { Modal } from "../../../../components/Modal"
// import { inviteAdminSchema } from "../../../../utils/validationSchema";
import { formProps } from "../../../../utils/helpers";
import { TextField } from "../../../../components/Form/TextField";
import Select from "../../../../components/Form/Select";
import Label from "../../../../components/Form/Label";
import { ErrorWrapper } from "../../../../components/Form/ErrorWrapper";


type TAddRoleModalProps = {
    show: boolean;
    closeModal: () => void
}

export default function AddRoleModal ({
    show, closeModal
}:TAddRoleModalProps) {
    const form = useFormik({
        initialValues: {
            title: "",
            description: "",
            permissions: [] as string[],
        },
        // validateOnMount: true,
        // validationSchema: inviteAdminSchema,
        onSubmit: (values) => {
        },
    });

    const handlePermission = (item: string) => {
        if(form.values.permissions.includes(item)){
            const rem = form.values.permissions.filter(x => x!==item)
            form.setFieldValue(
                "permissions",
                rem
            )
        } else {
            form.setFieldValue(
                "permissions",
                [...form.values.permissions, item]
            )
        }
    }

    return (
        <Modal
            show={show}
            onClose={closeModal}
            submitText="Confirm"
            submitClick={()=>console.log("submit")}
            submitLoading={false}
            extraClassname="min-w-[500px]"
        >
            <p className="text-base font-semibold -mt-5 mb-6">Add Role</p>
            <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit} className="w-full mb-6 max-h-[350px] overflow-y-auto">
                    <div className="grid grid-cols-1 gap-x-5">
                        <TextField
                            label="Role Title"
                            labelColor="text-[#212121] !text-sm"
                            type="text"
                            placeholder="Enter role title"
                            {...formProps("title", form)}
                            extraClassName="!text-[#999999] !bg-[#F5F5F5] !border-transparent !w-full"
                        />
                        <ErrorWrapper show={true} name="description">
                            {({ hasError }: { hasError: boolean; }) => (
                                <div className="w-full mt-2">
                                    <Label id="desc">Description</Label>
                                    <textarea
                                        id="description"
                                        placeholder="Enter role description"
                                        rows={4}
                                        {...formProps("description", form)}
                                        className="w-full outline-none !bg-[#F5F5F5] !border-transparent !text-[#999999] mt-1.5 rounded-[8px] p-2.5 text-sm"
                                    />
                                </div>
                            )}
                        </ErrorWrapper>
                        <Label id="roles">Available Permissions </Label>
                        <Select 
                            id="roles" 
                            className="!-mt-1"
                            inputClassName="!bg-[#F5F5F5] !border-transparent !text-[#999999] !h-[52px]"
                            placeholder="Select permissions"
                            options={[
                                {value: "can_create_blog", label: "Can create blog"},
                                {value: "can_view_booking_request", label: "Can view booking request"},
                            ]}
                            onChange={(value)=> handlePermission(value as string)}
                        />
                    </div>
                </form>
            </FormikProvider>
        </Modal>
    )
}