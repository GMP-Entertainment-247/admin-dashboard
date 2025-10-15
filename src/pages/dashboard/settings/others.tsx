import { Field, FormikProvider, useFormik } from "formik";
import ReactSwitch from "react-switch";
import Button from "../../../components/shared/Button";


export default function SettingsOthers () {
    const form = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            roles: [] as string[],
        },
        onSubmit: (values) => {
        },
    });
    
    return (
        <div className="px-6 relative">
            <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit} className="w-full">
                    <div className="text-sm flex flex-col gap-5">
                        <p className="text-base font-semibold">Notifications</p>
                        <div className="flex gap-2.5 items-center ml-5">
                            <Field type="radio" checked={true} className="accent-[#998100] scale-[1.7] cursor-pointer" />
                            <p>Account creation</p>
                        </div>
                        <div className="flex gap-2.5 items-center ml-5">
                            <Field type="radio" checked={false} className="accent-[#998100] scale-[1.7] cursor-pointer" />
                            <p>New role added</p>
                        </div>
                        <div className="flex gap-2.5 items-center ml-5">
                            <Field type="radio" checked={false} className="accent-[#998100] scale-[1.7] cursor-pointer" />
                            <p>Approval request</p>
                        </div>
                        <div className="flex gap-2.5 items-center ml-5">
                            <Field type="radio" checked={false} className="accent-[#998100] scale-[1.7] cursor-pointer" />
                            <p>Booking request</p>
                        </div>
                        <div className="flex gap-2.5 items-center ml-5">
                            <Field type="radio" checked={false} className="accent-[#998100] scale-[1.7] cursor-pointer" />
                            <p>Contract agreement</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-5 my-8">
                        <div>
                            <p className="text-base font-semibold mb-1">General Notification</p>
                            <p className="text-xs">Receive priority notifications for general events or whenever there is a new event of notification.</p>
                        </div>
                        <ReactSwitch
                            onChange={() => {}}
                            checked={true}
                            width={46}
                            height={26}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            handleDiameter={24}
                            onColor="#BFA100"
                            offColor="#C1C2C3"
                        />
                    </div>
                    <div className="flex justify-between items-center gap-5 w-full">
                        <div>
                            <p className="text-base font-semibold mb-1">Email Notification</p>
                            <p className="text-xs max-w-[800px]">Receive Receive email notifications for every notification and reminder, as well as whenever I make any transaction in my wallet and other payment transactions.</p>
                        </div>
                        <ReactSwitch
                            onChange={() => {}}
                            checked={false}
                            width={46}
                            height={26}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            handleDiameter={24}
                            onColor="#BFA100"
                            offColor="#C1C2C3"
                        />
                    </div>
                    <p className="text-base font-semibold mt-10 mb-5 pb-2.5 border-b">Reset</p>
                    <div className="flex justify-between items-center gap-5 w-full">
                        <div>
                            <p className="text-base font-semibold mb-1">Management</p>
                            <p className="text-xs max-w-[800px]">This option allows you to revert any changes made within the management settings.</p>
                        </div>
                        <Field type="radio" checked={true} className="accent-[#998100] scale-[1.7] cursor-pointer" />
                    </div>
                    <div className="flex justify-between items-center gap-5 w-full my-5">
                        <div>
                            <p className="text-base font-semibold mb-1">Notifications</p>
                            <p className="text-xs max-w-[800px]">This Your notification settings can be reverted to default mode if you've made any modifications that you want to undo. This allows you to reset your notifications to their original settings in case you've made changes that you'd like to revert.</p>
                        </div>
                        <Field type="radio" checked={true} className="accent-[#998100] scale-[1.7] cursor-pointer" />
                    </div>
                    <div className="flex justify-between items-center gap-5 w-full">
                        <div>
                            <p className="text-base font-semibold mb-1">Restore All</p>
                            <p className="text-xs max-w-[800px]">Restoring all to default may result in loss of all customizations made across various modules and sections of the settings. Undoing this action is not possible, unless you manually reset each setting individually.</p>
                        </div>
                        <Field type="radio" checked={true} className="accent-[#998100] scale-[1.7] cursor-pointer" />
                    </div>
                    <div className="w-full absolute -left-0 -bottom-[130px]">
                        <div className="flex justify-end gap-3 bg-white p-5 rounded-lg mt-5">
                            <Button 
                                text="Discard Changes"
                                extraClassName="rounded-[8px] !font-bold !w-fit px-5 !min-h-10 !text-[#EB2904] !bg-[#FFE5E5]"
                            />
                            <Button 
                                text="Save Changes"
                                extraClassName="rounded-[8px] !font-bold !w-fit px-5 !min-h-10"
                            />
                        </div>
                    </div>
                </form>
            </FormikProvider>
        </div>
    )
}