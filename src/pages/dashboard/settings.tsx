import Card from "../../components/shared/Card";
import Dropdown from "../../components/shared/Dropdown";
import Tabs from "../../components/shared/Tabs";
import Table from "../../components/Table";
import { dataRows } from "../../utils/constant";
import DashboardLayout from "./DashboardLayout";

export default function Settings () {
    return (
        <DashboardLayout>
            Settings
            <div className="w-[25%]">
                <Card 
                    icon="/icon"
                    iconBgColor="bg-[#000]"
                    value="10000"
                    title="Flex"
                />
            </div>
            <div className="bg-white p-10">
                <Tabs
                    tabs={[
                        { label: "Profile", key: "profile" },
                        { label: "Management", key: `management` },
                        { label: "Team", key: "team" },
                    ]}
                    // useAsLink
                />
            </div>
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