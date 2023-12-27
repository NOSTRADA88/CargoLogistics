import { Navigate, Outlet, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

export const PrivateRoute = () => {

    const {isAuthenticated} = UseAuth()

    const location = useLocation()

    return (
        isAuthenticated ?
            <Outlet/>
            :
            <Navigate to="/auth" state={{from: location}} replace/>
    )
}