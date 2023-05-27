import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const staff = JSON.parse(localStorage.getItem("seller") || "{}");
  const accessToken = staff.accessToken;
  return accessToken ? <Outlet /> : <Navigate to="/seller/login" />;
};

export default PrivateRoute;
