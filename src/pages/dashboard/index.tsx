import { useAuth } from "../../context/AuthContext"
import Navbar from "../../components/shared/Navbar"

export default function DashboardHome () {
    const { logout } =useAuth()
    return (
        <div onClick={logout}>
            <Navbar />
        </div>
    )
}