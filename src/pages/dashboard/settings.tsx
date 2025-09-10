import Dropdown from "../../components/shared/Dropdown";
import Table from "../../components/Table";
import DashboardLayout from "./DashboardLayout";

export default function Settings () {
    return (
        <DashboardLayout>
            Settings
            <div className="m-5">
                {/* table use case for other pages */}
                <Table 
                    tableTitle="Fans"
                    searchPlaceHolder="Search any artist"
                    isLoading={false}
                    data={dataRows}
                    slot={
                        <Dropdown 
                            triggerText="This month"
                            options={[]} 
                        />
                    }
                    rows={[
                        {
                            header: "Name",
                            view: (item) => (
                                <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded-full bg-red-100" />
                                    <p>{item.name}</p>
                                </div>
                            )
                        },
                        {
                            header: "Email",
                            view: (item) => item.email
                        },
                        {
                            header: "Phone Number",
                            view: (item) => item.phone
                        },
                        {
                            header: "Date Joined",
                            view: (item) => item.date
                        },
                    ]}
                    isPreview
                />
            </div>
        </DashboardLayout>
    )
}

let dataRows = [
                {
                    name: "Tobiloba",  
                    email: "tobilobadddddd",
                    phone: "08123456789",
                    country: "Nigeria",
                    date: "12th Aug, 2023",
                },
                {
                    name: "Tobiloba",  
                    email: "tobilobadddddd",
                    phone: "08123456789",
                    country: "Nigeria",
                    date: "12th Aug, 2023",
                },
            ]