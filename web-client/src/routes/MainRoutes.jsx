import { Routes, Route, Router } from "react-router-dom";
import { Home, Food, User, Buyer } from "../pages/";
import { NavBar } from "../components";
import SellerLogin from "../pages/seller-login";
import SellerDashboard from "../pages/seller-dashboard";
import SellerPrivateRoute from "./SellerPrivateRoute";
import Logout from "../components/Logout";


const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
            </>
          }
        />
        <Route
          path="/food"
          element={
            <>
              <NavBar />
              <Food />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <NavBar />
              <User />
            </>
          }
        />

        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/seller" element={<SellerPrivateRoute />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route
            path="/seller/dashboard/:tabValue"
            element={<SellerDashboard />}
          />
        </Route>
        <Route path="/buyer" element={<Buyer />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
