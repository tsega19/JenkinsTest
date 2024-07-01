import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();
  const token = isLoggedIn(); 

  return token ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/login"}
      replace={true}
      state={{ redirectUrl: location.pathname }}
    />
  );
};

export default PrivateRoute;
