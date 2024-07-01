import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export const RedirectAuthUsers = () => {
  const { isLoggedIn } = useAuth();

  const token = isLoggedIn();

  return token ? <Navigate to={"/"} replace={true} /> : <Outlet />;
};
