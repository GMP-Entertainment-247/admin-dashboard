import { useAuth } from "../../context/AuthContext"
import Navbar from "../../components/shared/Navbar"
import Card from "../../components/shared/Cards"
import Details from "../dashboard/user/details"

export default function DashboardHome () {
    const { logout } =useAuth()
    return (
        <div onClick={logout} className="bg-[#F5F5F5] h-100% w-100%">
            <Navbar />
            <Card />
            <Details />
        </div>
    )
}