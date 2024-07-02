import { useAuth } from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom";

export const Anonymous = () => {

    const token = useAuth().getToken();


    return token ? (
        <Navigate to="" replace={true} />
    ):(
        <Outlet/>
    )
}