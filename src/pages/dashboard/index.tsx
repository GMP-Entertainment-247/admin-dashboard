import { useAuth } from "../../context/AuthContext"

export default function DashboardHome () {
    const { logout } =useAuth()
    return (
        <div onClick={logout}>
            DashboardHome
        </div>
    )
}