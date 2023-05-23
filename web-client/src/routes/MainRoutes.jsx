import { Routes, Route } from "react-router-dom";
import {Home,Food, User, Buyer} from "../pages/";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/food"  element={<Food />} />
      <Route path="/user"  element={<User />} />
      <Route path="/buyer"  element={<Buyer />} />
    </Routes>
  );
};

export default MainRoutes;
