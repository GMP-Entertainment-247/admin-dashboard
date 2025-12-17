import DashboardLayout from "../DashboardLayout";
import mic from "../../../images/svg/mic.svg";
import investors from "../../../images/svg/investors.svg";
import celeb from "../../../images/svg/celeb.svg";
import ranking from "../../../images/svg/ranking.svg";

export default function NotificationsPage() {
    const categories = [
        {
            key: "artist",
            icon: mic,
            color: "#C25589"
        },
        {
            key: "investors",
            icon: investors,
            color: "#3BDC54"
        },
        {
            key: "celebrities",
            icon: celeb,
            color: "#1A96F0"
        },
        {
            key: "contestants",
            icon: ranking,
            color: "#FFA61F"
        }
    ]
    const notifs = [
        {
            title: "Artist - New Record Deal",
            description: "John Doe has been added as an artist",
            category: "artist",
            time: "20 secs ago",
        },
        {
            title: "Investors - Contract Agreement",
            description: "John Doe has been added as an investor",
            category: "investors",
            time: "20 secs ago",
        },
        {
            title: "Celebrity - New Contract",
            description: "John Doe has been added as a celebrity",
            category: "celebrities",
            time: "20 secs ago",
        },
        {
            title: "Contestant - New Contract",
            description: "John Doe has been added as a contestant",
            category: "contestants",
            time: "20 secs ago",
        },
        {
            title: "Artist - New Record Deal",
            description: "John Doe has been added as an artist",
            category: "artist",
            time: "20 secs ago",
        },
        {
            title: "Investors - Contract Agreement",
            description: "John Doe has been added as an investor",
            category: "investors",
            time: "20 secs ago",
        },
        {
            title: "Celebrity - New Contract",
            description: "John Doe has been added as a celebrity",
            category: "celebrities",
            time: "20 secs ago",
        }
    ]

    return (
        <DashboardLayout>
            <div className="bg-white rounded-[16px]">
                <h1 className="text-lg font-semibold p-5 border-b border-b-[#E9E9E9]">Notifications</h1>
                <div className="px-5 py-2.5 pb-5">
                    {
                        notifs.map((notif, idx) => (
                            <div key={idx} className="flex gap-5 border-b border-b-[#E9E9E9] py-3">
                                <div 
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: categories.find(category => category.key === notif.category)?.color }}
                                >
                                    <img src={categories.find(category => category.key === notif.category)?.icon} alt="icon" className="w-6 h-6" />
                                </div>
                                <div className="w-full">
                                    <div className="flex items-center gap-2 justify-between">
                                        <p className="text-base font-semibold">{notif.title}</p>
                                        <p className="text-sm text-[#999999]">{notif.time}</p>
                                    </div>
                                    <div className="bg-[#E9E9E999] rounded-lg p-2.5 mt-2.5">
                                        <p className="text-sm text-[#212121]">{notif.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </DashboardLayout>
    );
}