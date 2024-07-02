import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RequireAuth = ({ allowedRol }) => {
  const token = useAuth().getToken();
  const rol = useAuth().getRol();
  const location = useLocation();

  return token ? (
    allowedRol!=="" ? (
      allowedRol === rol ? (
        <Outlet />
      ) : (
        <Navigate to="/denegado" state={{ from: location }} replace />
      )
    ):(
      <Outlet/>
    )  
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
